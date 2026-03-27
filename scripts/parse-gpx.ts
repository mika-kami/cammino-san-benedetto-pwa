import { readFileSync, writeFileSync, readdirSync, copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const GPX_DIR = join(import.meta.dirname, '..', 'src', 'gpx');
const OUTPUT_JSON = join(import.meta.dirname, '..', 'src', 'data', 'routes-generated.json');
const PUBLIC_GPX_DIR = join(import.meta.dirname, '..', 'public', 'gpx');

// Map GPX filenames to stage keys in the app
// Note: GPX file "14" is "Via San Domenico" which is stage 14b in the app
// GPX file "14bis" is "Variante diretta" which is the main stage 14 in the app
const FILENAME_TO_KEY: Record<string, string> = {
  '01': '1', '02': '2', '03': '3', '04': '4', '05': '5',
  '06': '6', '07': '7', '08': '8', '09': '9', '10': '10',
  '11': '11', '12': '12', '13': '13',
  '14': '14b',    // GPX "14 Via San Domenico" = app stage 14b
  '14bis': '14',  // GPX "14bis Variante diretta" = app stage 14 (main)
  '15': '15', '15bis': '15b',
  '16': '16', '16bis': '16b',
};

// Clean filename for public/gpx/
function toCleanFilename(original: string): string {
  return original
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
}

function parseGpxFile(filepath: string): [number, number, number][] {
  const xml = readFileSync(filepath, 'utf-8');
  const points: [number, number, number][] = [];

  // Match each <trkpt> with its <ele> child
  const trkptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"[^>]*>[\s\S]*?<ele>([^<]+)<\/ele>[\s\S]*?<\/trkpt>/g;
  let match;
  while ((match = trkptRegex.exec(xml)) !== null) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    const ele = parseFloat(match[3]);
    points.push([
      Math.round(lat * 1e6) / 1e6,
      Math.round(lon * 1e6) / 1e6,
      Math.round(ele * 100) / 100,
    ]);
  }

  return points;
}

function main() {
  const files = readdirSync(GPX_DIR).filter(f => f.endsWith('.gpx')).sort();
  const routes: Record<string, [number, number, number][]> = {};

  // Ensure public/gpx directory exists
  if (!existsSync(PUBLIC_GPX_DIR)) {
    mkdirSync(PUBLIC_GPX_DIR, { recursive: true });
  }

  for (const file of files) {
    // Extract the stage prefix (e.g., "01", "14bis")
    const prefixMatch = file.match(/^(\d+(?:bis)?)\s/);
    if (!prefixMatch) {
      console.warn(`Skipping unrecognized file: ${file}`);
      continue;
    }
    const prefix = prefixMatch[1];
    const key = FILENAME_TO_KEY[prefix];
    if (!key) {
      console.warn(`No mapping for prefix: ${prefix} (file: ${file})`);
      continue;
    }

    const filepath = join(GPX_DIR, file);
    const points = parseGpxFile(filepath);
    routes[key] = points;

    // Copy to public/gpx/ with clean filename
    const cleanName = toCleanFilename(file);
    copyFileSync(filepath, join(PUBLIC_GPX_DIR, cleanName));

    console.log(`  ${key}: ${points.length} points → public/gpx/${cleanName}`);
  }

  // Write the generated JSON
  writeFileSync(OUTPUT_JSON, JSON.stringify(routes));

  const totalPoints = Object.values(routes).reduce((sum, pts) => sum + pts.length, 0);
  const sizeKB = Math.round(readFileSync(OUTPUT_JSON).length / 1024);
  console.log(`\nGenerated ${OUTPUT_JSON}`);
  console.log(`  ${Object.keys(routes).length} routes, ${totalPoints} total points, ${sizeKB} KB`);
}

main();
