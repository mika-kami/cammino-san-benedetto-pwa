import { accommodations as manualAccommodations, type Accommodation } from './accommodations';
import officialAccommodations from './accommodations-official.json';

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildKey(item: Pick<Accommodation, 'stage' | 'location' | 'name'>): string {
  return `${item.stage}:${slugify(item.location)}:${slugify(item.name)}`;
}

function hasGps(item: Accommodation): boolean {
  return Number.isFinite(item.gps.lat) && Number.isFinite(item.gps.lng) && item.gps.lat !== 0 && item.gps.lng !== 0;
}

function mergeAccommodation(existing: Accommodation, incoming: Accommodation): Accommodation {
  return {
    ...existing,
    ...incoming,
    gps: hasGps(incoming) ? incoming.gps : existing.gps,
    phone: incoming.phone || existing.phone,
    website: incoming.website || existing.website,
    email: incoming.email || existing.email,
    notes: incoming.notes || existing.notes,
    source_url: incoming.source_url || existing.source_url,
  };
}

const merged = new Map<string, Accommodation>();

for (const item of manualAccommodations) {
  merged.set(buildKey(item), item);
}

for (const item of officialAccommodations as Accommodation[]) {
  const key = buildKey(item);
  const existing = merged.get(key);
  merged.set(key, existing ? mergeAccommodation(existing, item) : item);
}

export type { Accommodation };
export const accommodations = [...merged.values()].sort(
  (a, b) => a.stage - b.stage || a.location.localeCompare(b.location) || a.name.localeCompare(b.name),
);
