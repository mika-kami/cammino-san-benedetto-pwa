import { writeFileSync } from 'node:fs';
import { accommodations as manualAccommodations, type Accommodation } from '../src/data/accommodations.ts';

const BASE_URL = 'https://www.camminodibenedetto.it';
const STAGE_NUMBERS = Array.from({ length: 16 }, (_, index) => index + 1);
const OUTPUT_JSON = new URL('../src/data/accommodations-official.json', import.meta.url);
const USER_AGENT = 'CamminoSanBenedettoPWA/1.0 (local development)';
const REQUEST_DELAY_MS = 250;
const GEOCODE_DELAY_MS = 1100;

type StageRow = {
  stage: number;
  location: string;
  name: string;
  typeLabel: string;
  rating: number | null;
  ratingCount: number;
  detailUrl: string;
};

const geocodeCache = new Map<string, { lat: number; lng: number }>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&euro;/g, 'EUR')
    .replace(/&raquo;/g, '>>')
    .replace(/&laquo;/g, '<<')
    .replace(/&hellip;/g, '...')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(value: string): string {
  return decodeHtml(value)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeName(value: string): string {
  return slugify(value.replace(/\.\.\.|>>/g, '').trim());
}

function parseName(rawCell: string): string {
  return stripTags(rawCell)
    .replace(/(?:\.\.\.|>>)+\s*$/g, '')
    .trim();
}

function parseRating(rawCell: string): { rating: number | null; ratingCount: number } {
  const ratingMatch = rawCell.match(/media:\s*<strong>([\d,]+)<\/strong>/i);
  const countMatch = rawCell.match(/<strong>(\d+)<\/strong>\s*voti/i);
  return {
    rating: ratingMatch ? Number.parseFloat(ratingMatch[1].replace(',', '.')) : null,
    ratingCount: countMatch ? Number.parseInt(countMatch[1], 10) : 0,
  };
}

function mapType(typeLabel: string, name: string): Accommodation['type'] {
  const value = `${typeLabel} ${name}`.toLowerCase();
  if (value.includes('donativo')) return 'donativo';
  if (value.includes('ostello')) return 'ostello';
  if (value.includes('bed&breakfast') || value.includes('b&b')) return 'bb';
  if (value.includes('agriturismo')) return 'agriturismo';
  if (value.includes('hotel') || value.includes('albergo')) return 'hotel';
  if (
    value.includes('foresteria') ||
    value.includes('santuario') ||
    value.includes('convento') ||
    value.includes('abbazia') ||
    value.includes('monaster') ||
    value.includes('parrocchia') ||
    value.includes('religios')
  ) {
    return 'religious';
  }
  return 'affittacamere';
}

function mapPriceRange(typeLabel: string, description: string): Accommodation['price_range'] {
  const text = `${typeLabel} ${description}`.toLowerCase();
  if (text.includes('donativo')) return 'donativo';

  const euroMatches = [...description.matchAll(/(\d+)\s*EUR/g)].map((match) => Number.parseInt(match[1], 10));
  const maxPrice = euroMatches.length > 0 ? Math.max(...euroMatches) : null;
  if (maxPrice !== null) {
    if (maxPrice <= 35) return '€';
    if (maxPrice <= 70) return '€€';
    return '€€€';
  }

  if (text.includes('hotel') || text.includes('albergo')) return '€€';
  return '€';
}

function buildKey(stage: number, location: string, name: string): string {
  return `${stage}:${slugify(location)}:${normalizeName(name)}`;
}

function extractStageRows(html: string, stage: number): StageRow[] {
  const tableMatch = html.match(/<tbody class="accoglienze">([\s\S]*?)<\/tbody>/i);
  if (!tableMatch) return [];

  const rows: StageRow[] = [];
  for (const rowMatch of tableMatch[1].matchAll(/<tr>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
    if (cells.length < 5) continue;

    const detailUrl = cells[1].match(/href="([^"]+)"/i)?.[1] ?? cells[4].match(/href="([^"]+)"/i)?.[1];
    if (!detailUrl) continue;

    const { rating, ratingCount } = parseRating(cells[3]);
    rows.push({
      stage,
      location: stripTags(cells[0]),
      name: parseName(cells[1]),
      typeLabel: stripTags(cells[2]),
      rating,
      ratingCount,
      detailUrl,
    });
  }

  return rows;
}

function extractHeaderBlock(html: string): string {
  const articleMatch = html.match(/<article[\s\S]*?<header class="entry-header">([\s\S]*?)<div class="entry-meta">/i);
  return articleMatch?.[1] ?? '';
}

function extractDescriptionBlock(html: string): string {
  const blockMatch = html.match(/<div style=" background: #F1F1F1;[\s\S]*?<div style=text-align:left;><\/div>([\s\S]*?)<div class="back">/i);
  return blockMatch?.[1] ?? '';
}

function deriveLocationAndAddress(headerBlock: string, fallbackLocation: string): {
  location: string;
  address: string;
  mapQuery: string;
} {
  const addressMatch = headerBlock.match(
    /<h3 class="line-bottom">[\s\S]*?<a class="normal" href="http:\/\/maps\.google\.com\/maps\?q=([^"]+)"[^>]*>([\s\S]*?)\(Guarda sulla mappa/i,
  );

  if (!addressMatch) {
    return { location: fallbackLocation, address: '', mapQuery: fallbackLocation };
  }

  const mapQuery = decodeURIComponent(addressMatch[1]);
  const addressText = stripTags(addressMatch[2]);
  const [locationPart, ...addressParts] = addressText.split(' - ');
  const hasExplicitLocation = addressParts.length > 0;
  return {
    location: hasExplicitLocation ? locationPart.trim() : fallbackLocation,
    address: hasExplicitLocation ? addressParts.join(' - ').trim() : addressText.trim(),
    mapQuery,
  };
}

function deriveTitle(headerBlock: string, fallbackName: string): string {
  return stripTags(headerBlock.match(/<h1 class="entry-title">([\s\S]*?)<\/h1>/i)?.[1] ?? fallbackName).trim();
}

function derivePhones(headerBlock: string): string {
  const phonesBlock = headerBlock.match(/<h3 class="line-bottom normal">([\s\S]*?)<\/h3>/i)?.[1] ?? '';
  return stripTags(phonesBlock).trim();
}

function deriveWebsite(headerBlock: string): string {
  return decodeHtml(headerBlock.match(/href="(https?:\/\/[^"]+)"[^>]*><i class="icon fa fa-link/i)?.[1] ?? '').trim();
}

function deriveEmail(headerBlock: string): string {
  return decodeHtml(headerBlock.match(/href="mailto:([^"]+)"/i)?.[1] ?? '').trim();
}

function deriveCin(headerBlock: string): { cinCompliant: boolean; cin: string } {
  const cin = stripTags(headerBlock.match(/CIN:\s*([^<\n]+)/i)?.[1] ?? '').trim();
  return { cinCompliant: cin.length > 0, cin };
}

function deriveLastUpdated(headerBlock: string, fallback: string): string {
  const raw = stripTags(headerBlock.match(/Ultimo aggiornamento:<\/b>\s*([^<]+)/i)?.[1] ?? '').trim();
  const parts = raw.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!parts) return fallback;

  const [, dd, mm, yyyy, hh, min, ss] = parts;
  return new Date(`${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}+01:00`).toISOString();
}

function deriveNotes(descriptionBlock: string, cin: string): string {
  const text = stripTags(descriptionBlock).replace(/Legenda:[\s\S]*$/i, '').trim();
  return cin ? `${text}${text ? ' ' : ''}CIN: ${cin}`.trim() : text;
}

function deriveMetaDescription(html: string): string {
  return decodeHtml(html.match(/<meta property="og:description" content="([^"]*)"/i)?.[1] ?? '').trim();
}

function chooseString(...values: Array<string | undefined>): string {
  for (const value of values) {
    if (value && value.trim()) return value.trim();
  }
  return '';
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Request failed for ${url}: HTTP ${response.status}`);
  }

  const text = await response.text();
  await sleep(REQUEST_DELAY_MS);
  return text;
}

async function geocode(query: string): Promise<{ lat: number; lng: number }> {
  const cached = geocodeCache.get(query);
  if (cached) return cached;

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', '1');
  url.searchParams.set('q', query);

  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Geocoding failed for ${query}: HTTP ${response.status}`);
  }

  const results = (await response.json()) as Array<{ lat: string; lon: string }>;
  await sleep(GEOCODE_DELAY_MS);

  const point = results[0]
    ? { lat: Number.parseFloat(results[0].lat), lng: Number.parseFloat(results[0].lon) }
    : { lat: 0, lng: 0 };

  geocodeCache.set(query, point);
  return point;
}

async function geocodeWithFallbacks(queries: string[], manual?: Accommodation): Promise<{ lat: number; lng: number }> {
  for (const query of queries) {
    const clean = query.replace(/\s+/g, ' ').trim();
    if (!clean) continue;

    const point = await geocode(clean);
    if (point.lat !== 0 && point.lng !== 0) return point;
  }

  if (manual?.gps && manual.gps.lat !== 0 && manual.gps.lng !== 0) {
    return manual.gps;
  }

  return { lat: 0, lng: 0 };
}

async function scrapeDetail(row: StageRow, manualIndex: Map<string, Accommodation>): Promise<Accommodation> {
  const html = await fetchText(row.detailUrl);
  const headerBlock = extractHeaderBlock(html);
  const descriptionBlock = extractDescriptionBlock(html);
  const metaDescription = deriveMetaDescription(html);
  const name = deriveTitle(headerBlock, row.name);
  const { location, address, mapQuery } = deriveLocationAndAddress(headerBlock, row.location);
  const { cinCompliant, cin } = deriveCin(headerBlock);
  const notes = chooseString(deriveNotes(descriptionBlock, cin), cin ? `${metaDescription} CIN: ${cin}` : metaDescription);
  const normalizedAddress = chooseString(address, mapQuery !== location ? mapQuery : '');
  const manual = manualIndex.get(buildKey(row.stage, location || row.location, name));
  const resolvedLocation = chooseString(location, row.location, manual?.location);
  const resolvedAddress = chooseString(normalizedAddress, manual?.address);
  const gps = await geocodeWithFallbacks(
    [
      mapQuery,
      `${resolvedAddress}, ${resolvedLocation}, Italia`,
      `${name}, ${resolvedLocation}, Italia`,
      `${resolvedAddress}, ${resolvedLocation}, Lazio, Italia`,
      `${resolvedAddress}, ${resolvedLocation}, Umbria, Italia`,
    ],
    manual,
  );

  return {
    id: `official-s${String(row.stage).padStart(2, '0')}-${slugify(resolvedLocation)}-${normalizeName(name)}`,
    stage: row.stage,
    location: resolvedLocation,
    name,
    type: mapType(row.typeLabel, name),
    address: resolvedAddress,
    gps,
    phone: chooseString(derivePhones(headerBlock), manual?.phone),
    website: chooseString(deriveWebsite(headerBlock), manual?.website),
    email: chooseString(deriveEmail(headerBlock), manual?.email),
    price_range: mapPriceRange(row.typeLabel, stripTags(descriptionBlock)),
    credential_required: row.typeLabel.toLowerCase().includes('donativo') || mapType(row.typeLabel, name) === 'religious',
    cin_compliant: cinCompliant,
    pilgrim_stamp: /timbro|credenziale/i.test(notes),
    rating: row.rating ?? manual?.rating ?? null,
    rating_count: row.ratingCount || manual?.rating_count || 0,
    notes: chooseString(notes, manual?.notes),
    source_url: row.detailUrl,
    source: 'camminodibenedetto',
    last_scraped: deriveLastUpdated(headerBlock, new Date().toISOString()),
  };
}

async function main() {
  const manualIndex = new Map<string, Accommodation>();
  for (const item of manualAccommodations) {
    manualIndex.set(buildKey(item.stage, item.location, item.name), item);
  }

  const stageRows: StageRow[] = [];
  for (const stage of STAGE_NUMBERS) {
    const html = await fetchText(`${BASE_URL}/tappe/tappa-${stage}/`);
    const rows = extractStageRows(html, stage);
    console.log(`Stage ${stage}: found ${rows.length} visible accommodations`);
    stageRows.push(...rows);
  }

  const official: Accommodation[] = [];
  for (const row of stageRows) {
    console.log(`Scraping stage ${row.stage}: ${row.name}`);
    official.push(await scrapeDetail(row, manualIndex));
  }

  official.sort((a, b) => a.stage - b.stage || a.location.localeCompare(b.location) || a.name.localeCompare(b.name));
  writeFileSync(OUTPUT_JSON, `${JSON.stringify(official, null, 2)}\n`);
  console.log(`Saved ${official.length} official accommodations to ${OUTPUT_JSON.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
