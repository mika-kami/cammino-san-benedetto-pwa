export interface RouteAlert {
  id: string;
  stage: number;
  severity: 'info' | 'warning' | 'closed';
  title: string;
  description: string;
  since: string;
  source_url: string;
  last_scraped: string;
}

export const alerts: RouteAlert[] = [
  {
    id: 'alert-stage7-landslide-2026',
    stage: 7,
    severity: 'closed',
    title: 'Landslide closure – Stage 7',
    description: 'Landslide between dam and Castel di Tora (guidebook point 7.5). Passage prohibited by municipal order. Check camminodibenedetto.it/aggiornamenti/ for detour.',
    since: '2026-01-01',
    source_url: 'https://www.camminodibenedetto.it/aggiornamenti/',
    last_scraped: '2026-03-26T00:00:00Z'
  }
];
