import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ScrapedAlert {
  id: string;
  stage: number;
  severity: 'info' | 'warning' | 'closed';
  title: string;
  description: string;
  since: string;
  source_url: string;
  last_scraped: string;
}

interface RefreshResponse {
  last_updated: string | null;
  alerts: ScrapedAlert[];
  accommodations_last_checked: string | null;
  source: string;
  error?: string;
}

// In-memory cache
let cachedResponse: RefreshResponse | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

const ALERT_KEYWORDS = /chiuso|frana|allerta|sospeso|closed|landslide/i;
const STAGE_PATTERN = /tappa\s*(\d+)|stage\s*(\d+)/i;
const SOURCE_URL = 'https://www.camminodibenedetto.it/aggiornamenti/';

function inferSeverity(text: string): 'info' | 'warning' | 'closed' {
  if (/chiuso|closed|sospeso/i.test(text)) return 'closed';
  if (/frana|landslide|allerta/i.test(text)) return 'warning';
  return 'info';
}

function extractAlerts(html: string, now: string): ScrapedAlert[] {
  const alerts: ScrapedAlert[] = [];

  // 1. Try to isolate the main content area first
  const contentMatch = html.match(/<(?:div|article)[^>]*class="[^"]*(?:entry-content|post-content|content)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|article)>/i);
  const body = contentMatch ? contentMatch[1] : html;

  // 2. Extract all text-bearing blocks: p, li, h2, h3, div
  const blockRe = /<(?:p|li|h[23]|div)[^>]*>([\s\S]*?)<\/(?:p|li|h[23]|div)>/gi;
  const blocks: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(body)) !== null) {
    blocks.push(m[1]);
  }

  // 3. Also extract <strong> and <em> inline for short closures
  const inlineRe = /<(?:strong|em|b)[^>]*>([\s\S]*?)<\/(?:strong|em|b)>/gi;
  while ((m = inlineRe.exec(body)) !== null) {
    blocks.push(m[1]);
  }

  const seen = new Set<string>();

  for (const block of blocks) {
    // Preserve links as "text [url]", then strip remaining tags
    const text = block
      .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 [$1]')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();

    if (!ALERT_KEYWORDS.test(text)) continue;
    if (text.length < 20) continue;
    if (seen.has(text)) continue;
    seen.add(text);

    // Extract raw URL from the block for source_url
    const urlMatch = block.match(/href="(https?:\/\/[^"]+)"/i);
    const sourceUrl = urlMatch ? urlMatch[1] : SOURCE_URL;

    const stageMatch = text.match(STAGE_PATTERN);
    const stageNum = stageMatch ? parseInt(stageMatch[1] || stageMatch[2], 10) : 0;
    const severity = inferSeverity(text);
    const id = `live-alert-${stageNum}-${severity}-${Buffer.from(text.slice(0, 40)).toString('hex')}`;

    alerts.push({
      id,
      stage: stageNum,
      severity,
      title: severity === 'closed'
        ? `Closure${stageNum ? ` – Stage ${stageNum}` : ''}`
        : `Alert${stageNum ? ` – Stage ${stageNum}` : ''}`,
      description: text.slice(0, 600),
      since: now,
      source_url: sourceUrl,
      last_scraped: now,
    });
  }

  return alerts;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Return cached response if within TTL
    const now = Date.now();
    if (cachedResponse && now - cacheTimestamp < CACHE_TTL_MS) {
      return res.status(200).json(cachedResponse);
    }

    const timestamp = new Date().toISOString();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(SOURCE_URL, {
      headers: { 'User-Agent': 'CamminoDiSanBenedetto-PWA/1.0' },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    console.log('[refresh] html length:', html.length);
    console.log('[refresh] html snippet:', html.slice(0, 500));

    const alerts = extractAlerts(html, timestamp);

    console.log('[refresh] alerts found:', alerts.length);

    const result: RefreshResponse = {
      last_updated: timestamp,
      alerts,
      accommodations_last_checked: timestamp,
      source: 'camminodibenedetto.it',
    };

    cachedResponse = result;
    cacheTimestamp = now;

    return res.status(200).json(result);
  } catch (err) {
    console.error('[refresh] unhandled error:', err);
    return res.status(200).json({
      last_updated: null,
      alerts: [],
      accommodations_last_checked: null,
      source: 'camminodibenedetto.it',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}
