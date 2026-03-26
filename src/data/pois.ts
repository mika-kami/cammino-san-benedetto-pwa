export interface POI {
  id: string;
  name: string;
  type: 'basilica' | 'abbey' | 'church' | 'town' | 'village' | 'nature' | 'castle' | 'city' | 'sanctuary' | 'charterhouse' | 'start' | 'end';
  stage: number;
  gps: { lat: number; lng: number };
  description_key: string;
  notes: string;
}

export const pois: POI[] = [
  { id: 'poi_norcia_basilica', name: 'Norcia – Piazza San Benedetto', type: 'start', stage: 1, gps: { lat: 42.7936, lng: 13.0938 }, description_key: 'poi.norcia_basilica', notes: 'Birthplace of St. Benedict; starting point of the Cammino' },
  { id: 'poi_cascia', name: 'Cascia', type: 'town', stage: 1, gps: { lat: 42.7190, lng: 13.0141 }, description_key: 'poi.cascia', notes: 'Home of Santa Rita' },
  { id: 'poi_roccaporena', name: 'Roccaporena', type: 'village', stage: 1, gps: { lat: 42.6994, lng: 12.9875 }, description_key: 'poi.roccaporena', notes: 'Birthplace of Santa Rita' },
  { id: 'poi_monteleone', name: 'Monteleone di Spoleto', type: 'village', stage: 2, gps: { lat: 42.6844, lng: 12.9522 }, description_key: 'poi.monteleone', notes: 'Medieval village on edge of Leonessa plain' },
  { id: 'poi_leonessa', name: 'Leonessa', type: 'town', stage: 3, gps: { lat: 42.5691, lng: 12.9617 }, description_key: 'poi.leonessa', notes: 'At the foot of Monti Reatini' },
  { id: 'poi_poggio_bustone', name: 'Poggio Bustone', type: 'sanctuary', stage: 4, gps: { lat: 42.5019, lng: 12.8856 }, description_key: 'poi.poggio_bustone', notes: 'Franciscan sanctuary; Valle Santa views; crossroads with Cammino di Francesco' },
  { id: 'poi_rieti', name: 'Rieti', type: 'city', stage: 5, gps: { lat: 42.4043, lng: 12.8568 }, description_key: 'poi.rieti', notes: 'Papal city; Valle del Velino' },
  { id: 'poi_rocca_sinibalda', name: 'Rocca Sinibalda', type: 'castle', stage: 6, gps: { lat: 42.2736, lng: 12.9269 }, description_key: 'poi.rocca_sinibalda', notes: 'Castle village on Lago del Turano' },
  { id: 'poi_castel_di_tora', name: 'Castel di Tora', type: 'village', stage: 7, gps: { lat: 42.2167, lng: 12.9633 }, description_key: 'poi.castel_di_tora', notes: 'Lago del Turano — active closure on route' },
  { id: 'poi_orvinio', name: 'Orvinio', type: 'village', stage: 8, gps: { lat: 42.1336, lng: 12.9361 }, description_key: 'poi.orvinio', notes: 'Gateway to Monti Lucretili park' },
  { id: 'poi_mandela', name: 'Mandela / Vicovaro', type: 'village', stage: 9, gps: { lat: 42.0283, lng: 12.9225 }, description_key: 'poi.mandela', notes: 'Roman aqueduct remains' },
  { id: 'poi_subiaco_sacro_speco', name: 'Subiaco – Sacro Speco', type: 'abbey', stage: 10, gps: { lat: 41.9275, lng: 13.0989 }, description_key: 'poi.subiaco_sacro_speco', notes: 'Major Benedictine site; 14th-century frescoes' },
  { id: 'poi_subiaco_santa_scolastica', name: 'Subiaco – Santa Scolastica', type: 'abbey', stage: 10, gps: { lat: 41.9261, lng: 13.0956 }, description_key: 'poi.subiaco_santa_scolastica', notes: 'Cradle of Italian printing' },
  { id: 'poi_trevi', name: 'Trevi nel Lazio', type: 'village', stage: 11, gps: { lat: 41.8628, lng: 13.2475 }, description_key: 'poi.trevi', notes: 'Roman arch; Lago di San Benedetto' },
  { id: 'poi_trevi_waterfall', name: 'Trevi Waterfall', type: 'nature', stage: 11, gps: { lat: 41.8580, lng: 13.2410 }, description_key: 'poi.trevi_waterfall', notes: 'One of Italy\'s most beautiful waterfalls' },
  { id: 'poi_guarcino', name: 'Guarcino / Vico nel Lazio', type: 'village', stage: 12, gps: { lat: 41.7992, lng: 13.3150 }, description_key: 'poi.guarcino', notes: 'Monti Ernici medieval villages' },
  { id: 'poi_certosa_trisulti', name: 'Certosa di Trisulti', type: 'charterhouse', stage: 12, gps: { lat: 41.7750, lng: 13.3525 }, description_key: 'poi.certosa_trisulti', notes: 'Forest spirituality near Collepardo' },
  { id: 'poi_casamari', name: 'Abbazia di Casamari', type: 'abbey', stage: 13, gps: { lat: 41.6750, lng: 13.4953 }, description_key: 'poi.casamari', notes: 'Gothic Cistercian masterpiece' },
  { id: 'poi_arpino', name: 'Arpino', type: 'town', stage: 14, gps: { lat: 41.6478, lng: 13.6097 }, description_key: 'poi.arpino', notes: 'Birthplace of Cicero; polygonal acropolis' },
  { id: 'poi_gole_melfa', name: 'Gole del Melfa', type: 'nature', stage: 15, gps: { lat: 41.5900, lng: 13.6400 }, description_key: 'poi.gole_melfa', notes: 'Gorges; former hermit territory' },
  { id: 'poi_roccasecca', name: 'Roccasecca', type: 'town', stage: 15, gps: { lat: 41.5531, lng: 13.6678 }, description_key: 'poi.roccasecca', notes: 'Birthplace of St. Thomas Aquinas' },
  { id: 'poi_montecassino', name: 'Abbazia di Montecassino', type: 'end', stage: 16, gps: { lat: 41.4908, lng: 13.8142 }, description_key: 'poi.montecassino', notes: 'Founded 529 AD; tomb of St. Benedict; Testimonium issued here' }
];
