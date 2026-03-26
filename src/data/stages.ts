export interface StageData {
  stage_number: number | string;
  name: string;
  start: { name: string; gps: { lat: number; lng: number }; elevation_m: number };
  end: { name: string; gps: { lat: number; lng: number }; elevation_m: number };
  distance_km: number;
  ascent_m: number;
  descent_m: number;
  min_elevation_m: number;
  max_elevation_m: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'strenuous';
  estimated_hours_walking: number;
  terrain: string[];
  gpx_filename: string;
  variant_of: number | null;
  description_key: string;
}

export const stages: StageData[] = [
  {
    stage_number: 1, name: 'Norcia – Cascia',
    start: { name: 'Norcia', gps: { lat: 42.7936, lng: 13.0938 }, elevation_m: 604 },
    end: { name: 'Cascia', gps: { lat: 42.7190, lng: 13.0141 }, elevation_m: 653 },
    distance_km: 17.25, ascent_m: 535, descent_m: 473,
    min_elevation_m: 550, max_elevation_m: 1050,
    difficulty: 'medium', estimated_hours_walking: 5.5,
    terrain: ['sentiero', 'carrareccia', 'asphalt_minor'],
    gpx_filename: 'cammino-san-benedetto-stage-01-norcia-cascia.gpx',
    variant_of: null, description_key: 'stage.desc.1'
  },
  {
    stage_number: 2, name: 'Cascia – Monteleone di Spoleto',
    start: { name: 'Cascia', gps: { lat: 42.7190, lng: 13.0141 }, elevation_m: 653 },
    end: { name: 'Monteleone di Spoleto', gps: { lat: 42.6844, lng: 12.9522 }, elevation_m: 978 },
    distance_km: 17.52, ascent_m: 526, descent_m: 250,
    min_elevation_m: 640, max_elevation_m: 1050,
    difficulty: 'medium', estimated_hours_walking: 5.5,
    terrain: ['sentiero', 'sterrato', 'asphalt_minor'],
    gpx_filename: 'cammino-san-benedetto-stage-02-cascia-monteleone.gpx',
    variant_of: null, description_key: 'stage.desc.2'
  },
  {
    stage_number: 3, name: 'Monteleone di Spoleto – Leonessa',
    start: { name: 'Monteleone di Spoleto', gps: { lat: 42.6844, lng: 12.9522 }, elevation_m: 978 },
    end: { name: 'Leonessa', gps: { lat: 42.5691, lng: 12.9617 }, elevation_m: 969 },
    distance_km: 12.58, ascent_m: 235, descent_m: 212,
    min_elevation_m: 900, max_elevation_m: 1100,
    difficulty: 'easy', estimated_hours_walking: 3.5,
    terrain: ['sentiero', 'carrareccia', 'sterrato'],
    gpx_filename: 'cammino-san-benedetto-stage-03-monteleone-leonessa.gpx',
    variant_of: null, description_key: 'stage.desc.3'
  },
  {
    stage_number: 4, name: 'Leonessa – Poggio Bustone',
    start: { name: 'Leonessa', gps: { lat: 42.5691, lng: 12.9617 }, elevation_m: 969 },
    end: { name: 'Poggio Bustone', gps: { lat: 42.5019, lng: 12.8856 }, elevation_m: 756 },
    distance_km: 14.23, ascent_m: 609, descent_m: 823,
    min_elevation_m: 700, max_elevation_m: 1300,
    difficulty: 'hard', estimated_hours_walking: 4.5,
    terrain: ['sentiero', 'mulattiera', 'sterrato'],
    gpx_filename: 'cammino-san-benedetto-stage-04-leonessa-poggio-bustone.gpx',
    variant_of: null, description_key: 'stage.desc.4'
  },
  {
    stage_number: 5, name: 'Poggio Bustone – Rieti',
    start: { name: 'Poggio Bustone', gps: { lat: 42.5019, lng: 12.8856 }, elevation_m: 756 },
    end: { name: 'Rieti', gps: { lat: 42.4043, lng: 12.8568 }, elevation_m: 405 },
    distance_km: 17.00, ascent_m: 308, descent_m: 658,
    min_elevation_m: 390, max_elevation_m: 800,
    difficulty: 'medium', estimated_hours_walking: 5.0,
    terrain: ['sentiero', 'asphalt_minor', 'sterrato'],
    gpx_filename: 'cammino-san-benedetto-stage-05-poggio-bustone-rieti.gpx',
    variant_of: null, description_key: 'stage.desc.5'
  },
  {
    stage_number: 6, name: 'Rieti – Rocca Sinibalda',
    start: { name: 'Rieti', gps: { lat: 42.4043, lng: 12.8568 }, elevation_m: 405 },
    end: { name: 'Rocca Sinibalda', gps: { lat: 42.2736, lng: 12.9269 }, elevation_m: 560 },
    distance_km: 20.34, ascent_m: 479, descent_m: 332,
    min_elevation_m: 380, max_elevation_m: 700,
    difficulty: 'hard', estimated_hours_walking: 6.0,
    terrain: ['sterrato', 'carrareccia', 'asphalt_minor'],
    gpx_filename: 'cammino-san-benedetto-stage-06-rieti-rocca-sinibalda.gpx',
    variant_of: null, description_key: 'stage.desc.6'
  },
  {
    stage_number: 7, name: 'Rocca Sinibalda – Castel di Tora',
    start: { name: 'Rocca Sinibalda', gps: { lat: 42.2736, lng: 12.9269 }, elevation_m: 560 },
    end: { name: 'Castel di Tora', gps: { lat: 42.2167, lng: 12.9633 }, elevation_m: 607 },
    distance_km: 15.00, ascent_m: 650, descent_m: 600,
    min_elevation_m: 450, max_elevation_m: 900,
    difficulty: 'hard', estimated_hours_walking: 5.0,
    terrain: ['sentiero', 'mulattiera', 'sterrato'],
    gpx_filename: 'cammino-san-benedetto-stage-07-rocca-sinibalda-castel-di-tora.gpx',
    variant_of: null, description_key: 'stage.desc.7'
  },
  {
    stage_number: 8, name: 'Castel di Tora – Orvinio',
    start: { name: 'Castel di Tora', gps: { lat: 42.2167, lng: 12.9633 }, elevation_m: 607 },
    end: { name: 'Orvinio', gps: { lat: 42.1336, lng: 12.9361 }, elevation_m: 840 },
    distance_km: 13.62, ascent_m: 763, descent_m: 558,
    min_elevation_m: 550, max_elevation_m: 1050,
    difficulty: 'hard', estimated_hours_walking: 4.5,
    terrain: ['sentiero', 'mulattiera', 'sterrato'],
    gpx_filename: 'cammino-san-benedetto-stage-08-castel-di-tora-orvinio.gpx',
    variant_of: null, description_key: 'stage.desc.8'
  },
  {
    stage_number: 9, name: 'Orvinio – Mandela/Vicovaro',
    start: { name: 'Orvinio', gps: { lat: 42.1336, lng: 12.9361 }, elevation_m: 840 },
    end: { name: 'Mandela', gps: { lat: 42.0283, lng: 12.9225 }, elevation_m: 480 },
    distance_km: 20.19, ascent_m: 629, descent_m: 988,
    min_elevation_m: 350, max_elevation_m: 1000,
    difficulty: 'hard', estimated_hours_walking: 6.0,
    terrain: ['sentiero', 'mulattiera', 'carrareccia'],
    gpx_filename: 'cammino-san-benedetto-stage-09-orvinio-mandela.gpx',
    variant_of: null, description_key: 'stage.desc.9'
  },
  {
    stage_number: 10, name: 'Mandela/Vicovaro – Subiaco',
    start: { name: 'Mandela', gps: { lat: 42.0283, lng: 12.9225 }, elevation_m: 480 },
    end: { name: 'Subiaco', gps: { lat: 41.9253, lng: 13.0933 }, elevation_m: 408 },
    distance_km: 32.00, ascent_m: 266, descent_m: 424,
    min_elevation_m: 350, max_elevation_m: 550,
    difficulty: 'strenuous', estimated_hours_walking: 9.0,
    terrain: ['sterrato', 'asphalt_minor', 'carrareccia'],
    gpx_filename: 'cammino-san-benedetto-stage-10-mandela-subiaco.gpx',
    variant_of: null, description_key: 'stage.desc.10'
  },
  {
    stage_number: 11, name: 'Subiaco – Trevi nel Lazio',
    start: { name: 'Subiaco', gps: { lat: 41.9253, lng: 13.0933 }, elevation_m: 408 },
    end: { name: 'Trevi nel Lazio', gps: { lat: 41.8628, lng: 13.2475 }, elevation_m: 821 },
    distance_km: 17.00, ascent_m: 537, descent_m: 258,
    min_elevation_m: 400, max_elevation_m: 900,
    difficulty: 'medium', estimated_hours_walking: 5.0,
    terrain: ['sentiero', 'sterrato', 'mulattiera'],
    gpx_filename: 'cammino-san-benedetto-stage-11-subiaco-trevi.gpx',
    variant_of: null, description_key: 'stage.desc.11'
  },
  {
    stage_number: 12, name: 'Trevi nel Lazio – Collepardo',
    start: { name: 'Trevi nel Lazio', gps: { lat: 41.8628, lng: 13.2475 }, elevation_m: 821 },
    end: { name: 'Collepardo', gps: { lat: 41.7642, lng: 13.3672 }, elevation_m: 587 },
    distance_km: 21.92, ascent_m: 610, descent_m: 830,
    min_elevation_m: 500, max_elevation_m: 1100,
    difficulty: 'hard', estimated_hours_walking: 6.5,
    terrain: ['sentiero', 'mulattiera', 'sterrato'],
    gpx_filename: 'cammino-san-benedetto-stage-12-trevi-collepardo.gpx',
    variant_of: null, description_key: 'stage.desc.12'
  },
  {
    stage_number: 13, name: 'Collepardo – Casamari',
    start: { name: 'Collepardo', gps: { lat: 41.7642, lng: 13.3672 }, elevation_m: 587 },
    end: { name: 'Casamari', gps: { lat: 41.6750, lng: 13.4953 }, elevation_m: 300 },
    distance_km: 24.88, ascent_m: 654, descent_m: 940,
    min_elevation_m: 280, max_elevation_m: 800,
    difficulty: 'hard', estimated_hours_walking: 7.0,
    terrain: ['sentiero', 'sterrato', 'asphalt_minor'],
    gpx_filename: 'cammino-san-benedetto-stage-13-collepardo-casamari.gpx',
    variant_of: null, description_key: 'stage.desc.13'
  },
  {
    stage_number: 14, name: 'Casamari – Arpino',
    start: { name: 'Casamari', gps: { lat: 41.6750, lng: 13.4953 }, elevation_m: 300 },
    end: { name: 'Arpino', gps: { lat: 41.6478, lng: 13.6097 }, elevation_m: 450 },
    distance_km: 15.72, ascent_m: 632, descent_m: 449,
    min_elevation_m: 280, max_elevation_m: 700,
    difficulty: 'hard', estimated_hours_walking: 5.0,
    terrain: ['sterrato', 'sentiero', 'asphalt_minor'],
    gpx_filename: 'cammino-san-benedetto-stage-14-casamari-arpino.gpx',
    variant_of: null, description_key: 'stage.desc.14'
  },
  {
    stage_number: '14b', name: 'Casamari – Arpino (via San Domenico)',
    start: { name: 'Casamari', gps: { lat: 41.6750, lng: 13.4953 }, elevation_m: 300 },
    end: { name: 'Arpino', gps: { lat: 41.6478, lng: 13.6097 }, elevation_m: 450 },
    distance_km: 21.87, ascent_m: 441, descent_m: 268,
    min_elevation_m: 280, max_elevation_m: 600,
    difficulty: 'hard', estimated_hours_walking: 6.5,
    terrain: ['sterrato', 'asphalt_minor', 'carrareccia'],
    gpx_filename: 'cammino-san-benedetto-stage-14b-casamari-arpino-san-domenico.gpx',
    variant_of: 14, description_key: 'stage.desc.14b'
  },
  {
    stage_number: 15, name: 'Arpino – Roccasecca',
    start: { name: 'Arpino', gps: { lat: 41.6478, lng: 13.6097 }, elevation_m: 450 },
    end: { name: 'Roccasecca', gps: { lat: 41.5531, lng: 13.6678 }, elevation_m: 245 },
    distance_km: 19.32, ascent_m: 566, descent_m: 772,
    min_elevation_m: 200, max_elevation_m: 750,
    difficulty: 'medium', estimated_hours_walking: 5.5,
    terrain: ['sentiero', 'sterrato', 'asphalt_minor'],
    gpx_filename: 'cammino-san-benedetto-stage-15-arpino-roccasecca.gpx',
    variant_of: null, description_key: 'stage.desc.15'
  },
  {
    stage_number: 16, name: 'Roccasecca – Montecassino',
    start: { name: 'Roccasecca', gps: { lat: 41.5531, lng: 13.6678 }, elevation_m: 245 },
    end: { name: 'Montecassino', gps: { lat: 41.4908, lng: 13.8142 }, elevation_m: 516 },
    distance_km: 18.76, ascent_m: 521, descent_m: 290,
    min_elevation_m: 200, max_elevation_m: 520,
    difficulty: 'medium', estimated_hours_walking: 5.5,
    terrain: ['sentiero', 'sterrato', 'asphalt_minor'],
    gpx_filename: 'cammino-san-benedetto-stage-16-roccasecca-montecassino.gpx',
    variant_of: null, description_key: 'stage.desc.16'
  }
];
