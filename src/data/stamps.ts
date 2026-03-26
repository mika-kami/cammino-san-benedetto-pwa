export interface StampPoint {
  id: string;
  stage: number;
  name: string;
  location: string;
  type: 'church' | 'hostel' | 'bar' | 'shop' | 'office' | 'abbey' | 'convent';
}

export const stampPoints: StampPoint[] = [
  // Stage 1 - Norcia
  { id: 's1_capisterium', stage: 1, name: 'Ostello Capisterium', location: 'Norcia', type: 'hostel' },
  { id: 's1_emporio', stage: 1, name: 'Emporio della Sibilla', location: 'Norcia', type: 'shop' },
  { id: 's1_bar_angelisa', stage: 1, name: "Bar D'Angelisa", location: 'Norcia', type: 'bar' },
  { id: 's1_edicola', stage: 1, name: 'Edicola del Corso', location: 'Norcia', type: 'shop' },
  { id: 's1_madonna_grazie', stage: 1, name: 'Chiesa Madonna delle Grazie', location: 'Norcia', type: 'church' },
  { id: 's1_hotel_benito', stage: 1, name: 'Hotel Da Benito', location: 'Norcia', type: 'hostel' },
  // Stage 2
  { id: 's2_chiesa_monteleone', stage: 2, name: 'Chiesa di San Francesco', location: 'Monteleone di Spoleto', type: 'church' },
  { id: 's2_bar_centrale', stage: 2, name: 'Bar Centrale', location: 'Monteleone di Spoleto', type: 'bar' },
  // Stage 3
  { id: 's3_chiesa_leonessa', stage: 3, name: 'Chiesa di San Pietro', location: 'Leonessa', type: 'church' },
  { id: 's3_bar_leonessa', stage: 3, name: 'Bar del Corso', location: 'Leonessa', type: 'bar' },
  // Stage 4
  { id: 's4_santuario', stage: 4, name: 'Santuario di Poggio Bustone', location: 'Poggio Bustone', type: 'church' },
  { id: 's4_bar_poggio', stage: 4, name: 'Bar della Piazza', location: 'Poggio Bustone', type: 'bar' },
  // Stage 5
  { id: 's5_cattedrale', stage: 5, name: 'Cattedrale di Santa Maria', location: 'Rieti', type: 'church' },
  { id: 's5_info_rieti', stage: 5, name: 'Ufficio Informazioni', location: 'Rieti', type: 'office' },
  { id: 's5_bar_rieti', stage: 5, name: 'Bar del Centro', location: 'Rieti', type: 'bar' },
  // Stage 6
  { id: 's6_chiesa_rocca', stage: 6, name: 'Chiesa di San Liberato', location: 'Rocca Sinibalda', type: 'church' },
  { id: 's6_bar_rocca', stage: 6, name: 'Bar La Rocca', location: 'Rocca Sinibalda', type: 'bar' },
  // Stage 7
  { id: 's7_chiesa_castel', stage: 7, name: 'Chiesa di San Giovanni', location: 'Castel di Tora', type: 'church' },
  { id: 's7_bar_lago', stage: 7, name: 'Bar del Lago', location: 'Castel di Tora', type: 'bar' },
  // Stage 8
  { id: 's8_chiesa_orvinio', stage: 8, name: 'Chiesa di Santa Maria', location: 'Orvinio', type: 'church' },
  { id: 's8_bar_orvinio', stage: 8, name: 'Bar Centrale', location: 'Orvinio', type: 'bar' },
  // Stage 9
  { id: 's9_chiesa_mandela', stage: 9, name: 'Chiesa di San Nicola', location: 'Mandela', type: 'church' },
  { id: 's9_bar_vicovaro', stage: 9, name: 'Bar della Piazza', location: 'Vicovaro', type: 'bar' },
  // Stage 10
  { id: 's10_sacro_speco', stage: 10, name: 'Monastero del Sacro Speco', location: 'Subiaco', type: 'abbey' },
  { id: 's10_santa_scolastica', stage: 10, name: 'Abbazia di Santa Scolastica', location: 'Subiaco', type: 'abbey' },
  { id: 's10_bar_subiaco', stage: 10, name: 'Bar del Corso', location: 'Subiaco', type: 'bar' },
  // Stage 11
  { id: 's11_chiesa_trevi', stage: 11, name: 'Chiesa di Santa Maria', location: 'Trevi nel Lazio', type: 'church' },
  { id: 's11_bar_trevi', stage: 11, name: 'Bar La Cascata', location: 'Trevi nel Lazio', type: 'bar' },
  // Stage 12
  { id: 's12_certosa', stage: 12, name: 'Certosa di Trisulti', location: 'Collepardo', type: 'convent' },
  { id: 's12_chiesa_collepardo', stage: 12, name: 'Chiesa di Santa Maria', location: 'Collepardo', type: 'church' },
  // Stage 13
  { id: 's13_casamari', stage: 13, name: 'Abbazia di Casamari', location: 'Casamari', type: 'abbey' },
  { id: 's13_bar_casamari', stage: 13, name: 'Bar Abbazia', location: 'Casamari', type: 'bar' },
  // Stage 14
  { id: 's14_chiesa_arpino', stage: 14, name: 'Chiesa di San Michele', location: 'Arpino', type: 'church' },
  { id: 's14_bar_arpino', stage: 14, name: 'Bar della Piazza', location: 'Arpino', type: 'bar' },
  // Stage 15
  { id: 's15_chiesa_roccasecca', stage: 15, name: 'Chiesa di Santa Maria', location: 'Roccasecca', type: 'church' },
  { id: 's15_bar_roccasecca', stage: 15, name: 'Bar del Borgo', location: 'Roccasecca', type: 'bar' },
  // Stage 16
  { id: 's16_montecassino', stage: 16, name: 'Abbazia di Montecassino', location: 'Montecassino', type: 'abbey' },
];
