const it = {
  nav: {
    home: 'Home',
    stages: 'Tappe',
    map: 'Mappa',
    accommodations: 'Alloggi',
    credential: 'Credenziale',
    settings: 'Impostazioni',
  },
  home: {
    title: 'Cammino di San Benedetto',
    subtitle: 'Norcia \u2192 Montecassino',
    total_distance: 'Distanza Totale',
    total_stages: 'Tappe Totali',
    start_walking: 'Inizia a Camminare',
    refresh_data: 'Aggiorna Tutti i Dati',
    refreshing: 'Aggiornamento...',
    refresh_success: 'Aggiornato',
    refresh_error: 'Impossibile connettersi',
    last_refreshed: 'Ultimo aggiornamento',
  },
  stage: {
    distance: 'Distanza',
    ascent: 'Salita',
    descent: 'Discesa',
    difficulty: 'Difficolt\u00e0',
    estimated_time: 'Tempo Stimato',
    hours: 'ore',
    download_gpx: 'Scarica GPX',
    download_full_gpx: 'Scarica GPX Completo',
    elevation_profile: 'Profilo Altimetrico',
    accommodations: 'Alloggi',
    pois: 'Punti di Interesse',
    mark_completed: 'Segna come Completata',
    completed: 'Completata',
    alerts: 'Avvisi',
  },
  difficulty: {
    easy: 'Facile',
    medium: 'Media',
    hard: 'Difficile',
    strenuous: 'Impegnativa',
  },
  accommodation: {
    filter_all: 'Tutti',
    filter_by_type: 'Filtra per Tipo',
    credential_required: 'Credenziale Richiesta',
    cin_compliant: 'Conforme CIN',
    stamp_point: 'Punto Timbro',
    last_scraped: 'Ultimo Aggiornamento',
    call: 'Chiama',
    directions: 'Indicazioni',
    view_source: 'Vedi Fonte',
    type: {
      ostello: 'Ostello',
      hotel: 'Hotel',
      bb: 'B&B',
      agriturismo: 'Agriturismo',
      donativo: 'Donativo',
      affittacamere: 'Affittacamere',
      religious: 'Ospitalit\u00e0 Religiosa',
    },
  },
  credential: {
    title: 'Credenziale del Pellegrino',
    stamps_collected: 'Timbri Raccolti',
    stages_completed: 'Tappe Completate',
    progress: 'Progresso',
    start_date: 'Data di Inizio',
    pilgrim_name: 'Nome del Pellegrino',
    testimonium_eligible: 'Idoneo al Testimonium',
    testimonium_message:
      'Completa almeno 100 km a piedi per ricevere il Testimonium a Montecassino.',
    reset: 'Resetta Credenziale',
  },
  alerts: {
    active: 'Avvisi Attivi',
    no_alerts: 'Nessun avviso attivo',
    closed: 'Chiuso',
    warning: 'Attenzione',
    since: 'Dal',
    source: 'Fonte',
  },
  map: {
    my_location: 'La Mia Posizione',
    off_route_warning: 'Sei fuori dal percorso',
    distance_to_end: 'Distanza alla Fine',
    zoom_to_route: 'Zoom sul Percorso',
  },
  settings: {
    title: 'Impostazioni',
    language: 'Lingua',
    offline_status: 'Stato Offline',
    last_synced: 'Ultima Sincronizzazione',
    clear_data: 'Cancella Dati',
    about: 'Informazioni',
    version: 'Versione',
    outdoor_mode: 'Modalit\u00e0 Outdoor',
  },
  common: {
    km: 'km',
    meters: 'm',
    loading: 'Caricamento...',
    error: 'Si \u00e8 verificato un errore',
    offline: 'Offline',
    online: 'Online',
  },
  poi: {
    norcia_basilica:
      'Basilica di San Benedetto a Norcia, luogo di nascita del patrono d\'Europa. Ricostruita dopo il terremoto del 2016.',
    cascia:
      'Santuario di Santa Rita da Cascia, importante meta di pellegrinaggio dedicata alla santa delle cause impossibili.',
    roccaporena:
      'Roccaporena, il piccolo borgo dove nacque Santa Rita. Qui si trova il famoso Scoglio della preghiera.',
    subiaco_sacro_speco:
      'Sacro Speco a Subiaco, la grotta dove il giovane Benedetto visse come eremita per tre anni.',
    subiaco_santa_scolastica:
      'Monastero di Santa Scolastica a Subiaco, il pi\u00f9 antico monastero benedettino al mondo, fondato nel VI secolo.',
    montecassino:
      'Abbazia di Montecassino, fondata da San Benedetto intorno al 529 d.C. Culla del monachesimo occidentale, ricostruita dopo la distruzione della Seconda Guerra Mondiale.',
    leonessa:
      'Leonessa, un affascinante borgo medievale di collina noto per il suo patrimonio francescano e la splendida cornice montana.',
    trevi_nel_lazio:
      'Trevi nel Lazio, un pittoresco borgo medievale arroccato su una collina con vista sulla valle dell\'Aniene.',
    collepardo:
      'Collepardo, sede della Certosa di Trisulti, un suggestivo monastero certosino immerso in un ambiente montano isolato.',
    casamari:
      'Abbazia di Casamari, splendido esempio di architettura gotica cistercense italiana, ancora sede di una comunit\u00e0 monastica attiva.',
    arpino:
      'Arpino, antico luogo di nascita di Cicerone, con la sua notevole acropoli pre-romana e il centro storico medievale.',
    alvito:
      'Alvito, un tranquillo borgo nella valle di Comino dominato dai resti di un castello medievale.',
    atina:
      'Atina, una delle citt\u00e0 pi\u00f9 antiche del Lazio, situata nell\'alta valle di Comino con patrimonio romano e medievale.',
  },
} as const;

export default it;
