const en = {
  nav: {
    home: 'Home',
    stages: 'Stages',
    map: 'Map',
    accommodations: 'Accommodations',
    credential: 'Credential',
    settings: 'Settings',
  },
  home: {
    title: 'Cammino di San Benedetto',
    subtitle: 'Norcia \u2192 Montecassino',
    total_distance: 'Total Distance',
    total_stages: 'Total Stages',
    start_walking: 'Start Walking',
  },
  stage: {
    distance: 'Distance',
    ascent: 'Ascent',
    descent: 'Descent',
    difficulty: 'Difficulty',
    estimated_time: 'Estimated Time',
    hours: 'hours',
    download_gpx: 'Download GPX',
    download_full_gpx: 'Download Full GPX',
    elevation_profile: 'Elevation Profile',
    accommodations: 'Accommodations',
    pois: 'Points of Interest',
    mark_completed: 'Mark as Completed',
    completed: 'Completed',
    alerts: 'Alerts',
  },
  difficulty: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    strenuous: 'Strenuous',
  },
  accommodation: {
    filter_all: 'All',
    filter_by_type: 'Filter by Type',
    credential_required: 'Credential Required',
    cin_compliant: 'CIN Compliant',
    stamp_point: 'Stamp Point',
    last_scraped: 'Last Updated',
    call: 'Call',
    directions: 'Directions',
    view_source: 'View Source',
    type: {
      ostello: 'Hostel',
      hotel: 'Hotel',
      bb: 'B&B',
      agriturismo: 'Farmhouse',
      donativo: 'Donativo',
      affittacamere: 'Rooms for Rent',
      religious: 'Religious Hospitality',
    },
  },
  credential: {
    title: 'Pilgrim Credential',
    stamps_collected: 'Stamps Collected',
    stages_completed: 'Stages Completed',
    progress: 'Progress',
    start_date: 'Start Date',
    pilgrim_name: 'Pilgrim Name',
    testimonium_eligible: 'Testimonium Eligible',
    testimonium_message:
      'Complete at least 100 km on foot to receive the Testimonium at Montecassino.',
    reset: 'Reset Credential',
  },
  alerts: {
    active: 'Active Alerts',
    no_alerts: 'No active alerts',
    closed: 'Closed',
    warning: 'Warning',
    since: 'Since',
    source: 'Source',
  },
  map: {
    my_location: 'My Location',
    off_route_warning: 'You are off the route',
    distance_to_end: 'Distance to End',
    zoom_to_route: 'Zoom to Route',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    offline_status: 'Offline Status',
    last_synced: 'Last Synced',
    clear_data: 'Clear Data',
    about: 'About',
    version: 'Version',
    outdoor_mode: 'Outdoor Mode',
  },
  common: {
    km: 'km',
    meters: 'm',
    loading: 'Loading...',
    error: 'An error occurred',
    offline: 'Offline',
    online: 'Online',
  },
  poi: {
    norcia_basilica:
      'Basilica of St. Benedict in Norcia, birthplace of the patron saint of Europe. Rebuilt after the 2016 earthquake.',
    cascia:
      'Sanctuary of Santa Rita da Cascia, a major pilgrimage destination dedicated to the saint of impossible causes.',
    roccaporena:
      'Roccaporena, the tiny hamlet where Santa Rita was born. Home to the famous Scoglio (rock) of prayer.',
    subiaco_sacro_speco:
      'Sacro Speco (Holy Cave) in Subiaco, the cave where young Benedict lived as a hermit for three years.',
    subiaco_santa_scolastica:
      'Monastery of Santa Scolastica in Subiaco, the oldest Benedictine monastery in the world, founded in the 6th century.',
    montecassino:
      'Abbey of Montecassino, founded by St. Benedict around 529 AD. The cradle of Western monasticism, rebuilt after WWII destruction.',
    leonessa:
      'Leonessa, a charming medieval hill town known for its Franciscan heritage and beautiful mountain setting.',
    trevi_nel_lazio:
      'Trevi nel Lazio, a picturesque medieval village perched on a hillside with views over the Aniene valley.',
    collepardo:
      'Collepardo, home to the Certosa di Trisulti, a striking Carthusian monastery in a secluded mountain setting.',
    casamari:
      'Abbey of Casamari, a splendid example of Italian Gothic Cistercian architecture, still home to an active monastic community.',
    arpino:
      'Arpino, the ancient birthplace of Cicero, with its remarkable pre-Roman acropolis and medieval old town.',
    alvito:
      'Alvito, a quiet village in the Comino valley dominated by the ruins of a medieval castle.',
    atina:
      'Atina, one of the oldest towns in Lazio, set in the upper Comino valley with Roman and medieval heritage.',
  },
} as const;

export default en;
