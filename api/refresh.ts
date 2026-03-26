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

  // Extract text content from paragraph-like blocks
  const paragraphs = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const divBlocks = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  const allBlocks = [...paragraphs, ...divBlocks];

  for (const block of allBlocks) {
    // Strip HTML tags to get plain text
    const text = block.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    if (!ALERT_KEYWORDS.test(text)) continue;
    if (text.length < 10) continue;

    const stageMatch = text.match(STAGE_PATTERN);
    const stageNum = stageMatch ? parseInt(stageMatch[1] || stageMatch[2], 10) : 0;

    const severity = inferSeverity(text);
    const id = `live-alert-${stageNum}-${severity}-${Date.now()}`;

    alerts.push({
      id,
      stage: stageNum,
      severity,
      title: `${severity === 'closed' ? 'Closure' : 'Alert'}${stageNum ? ` – Stage ${stageNum}` : ''}`,
      description: text.slice(0, 500),
      since: now,
      source_url: SOURCE_URL,
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

  // Return cached response if within TTL
  const now = Date.now();
  if (cachedResponse && now - cacheTimestamp < CACHE_TTL_MS) {
    return res.status(200).json(cachedResponse);
  }

  const timestamp = new Date().toISOString();

  try {
    const response = await fetch(SOURCE_URL, {
      headers: { 'User-Agent': 'CamminoDiSanBenedetto-PWA/1.0' },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const alerts = extractAlerts(html, timestamp);

    const result: RefreshResponse = {
      last_updated: timestamp,
      alerts,
      accommodations_last_checked: timestamp,
      source: 'camminodibenedetto.it',
    };

    cachedResponse = result;
    cacheTimestamp = now;

    return res.status(200).json(result);
  } catch {
    const errorResult: RefreshResponse = {
      last_updated: null,
      alerts: [],
      accommodations_last_checked: null,
      source: 'camminodibenedetto.it',
      error: 'Could not reach source',
    };

    return res.status(200).json(errorResult);
  }
}
