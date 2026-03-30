const cs = {
  nav: {
    home: 'Domu',
    stages: 'Etapy',
    map: 'Mapa',
    accommodations: 'Ubytovani',
    credential: 'Poutnicky prukaz',
    settings: 'Nastaveni',
  },
  home: {
    title: 'Cammino di San Benedetto',
    subtitle: 'Norcia -> Montecassino',
    total_distance: 'Celkova vzdalenost',
    total_stages: 'Pocet etap',
    start_walking: 'Zacit pout',
    refresh_data: 'Aktualizovat vsechna data',
    refreshing: 'Aktualizuji...',
    refresh_success: 'Aktualizovano',
    refresh_error: 'Nepodarilo se pripojit',
    last_refreshed: 'Posledni aktualizace',
    showing_cached_data: 'Zobrazuji data z cache',
  },
  stage: {
    distance: 'Vzdalenost',
    ascent: 'Stoupani',
    descent: 'Klesani',
    difficulty: 'Obtiznost',
    estimated_time: 'Odhadovany cas',
    hours: 'hodin',
    download_gpx: 'Stahnout GPX',
    download_full_gpx: 'Stahnout celou GPX',
    elevation_profile: 'Vyskovy profil',
    accommodations: 'Ubytovani',
    pois: 'Zajimavosti',
    mark_completed: 'Oznacit jako hotove',
    completed: 'Hotovo',
    alerts: 'Upozorneni',
    gpx_offline_note: 'GPX je dostupne offline - jiz v cache',
  },
  difficulty: {
    easy: 'Lehka',
    medium: 'Stredni',
    hard: 'Tezka',
    strenuous: 'Narocna',
  },
  accommodation: {
    filter_all: 'Vse',
    filter_by_type: 'Filtrovat podle typu',
    credential_required: 'Vyzadovan prukaz',
    cin_compliant: 'CIN dostupny',
    stamp_point: 'Misto razitka',
    last_scraped: 'Posledni aktualizace',
    call: 'Zavolat',
    directions: 'Navigace',
    view_source: 'Zobrazit zdroj',
    view_official_site: 'Zobrazit na oficialnim webu',
    note_untranslated: 'Poznamka je dostupna na zdrojove strance.',
    source: {
      camminodibenedetto: 'Oficialni web',
      dormireincammino: 'Dormire in Cammino',
      booking: 'Booking.com',
      google: 'Google',
      direct: 'Naprimo',
      'pilgrim-guide': 'Poutnicky pruvodce',
    },
    type: {
      ostello: 'Hostel',
      hotel: 'Hotel',
      bb: 'B&B',
      agriturismo: 'Agroturistika',
      donativo: 'Dobrovolny prispevek',
      affittacamere: 'Pokoje',
      religious: 'Nabozenske ubytovani',
    },
  },
  credential: {
    title: 'Poutnicky prukaz',
    stamps_collected: 'Nasbirana razitka',
    stages_completed: 'Dokoncene etapy',
    progress: 'Postup',
    start_date: 'Datum startu',
    pilgrim_name: 'Jmeno poutnika',
    testimonium_eligible: 'Narok na Testimonium',
    testimonium_message:
      'Dokoncete alespon 100 km pesky, abyste ziskali Testimonium v Montecassinu.',
    reset: 'Resetovat prukaz',
  },
  alerts: {
    active: 'Aktivni upozorneni',
    no_alerts: 'Zadne aktivni upozorneni',
    closed: 'Uzavreno',
    warning: 'Varovani',
    since: 'Od',
    source: 'Zdroj',
  },
  map: {
    my_location: 'Moje poloha',
    off_route_warning: 'Jste mimo trasu',
    distance_to_end: 'Vzdalenost do cile',
    zoom_to_route: 'Priblizit trasu',
    offline_tiles_notice: 'Offline - dostupne jsou jen cacheovane casti mapy',
    finish_popup: 'Konec Cammino di San Benedetto',
  },
  settings: {
    title: 'Nastaveni',
    language: 'Jazyk',
    offline_status: 'Offline stav',
    last_synced: 'Posledni synchronizace',
    clear_data: 'Vymazat data',
    about: 'O aplikaci',
    version: 'Verze',
    outdoor_mode: 'Outdoor rezim',
  },
  common: {
    km: 'km',
    meters: 'm',
    loading: 'Nacitam...',
    error: 'Doslo k chybe',
    offline: 'Offline',
    online: 'Online',
    update_available: 'Je dostupna aktualizace',
    update_now: 'Aktualizovat',
  },
  poi: {
    norcia_basilica:
      'Bazilika sv. Benedikta v Norcii, rodisti patrona Evropy. Po zemetreseni v roce 2016 byla obnovena.',
    cascia:
      'Svatyne sv. Rity v Cascii, vyznamne poutni misto zasvecene svetici nemoznych pripadu.',
    roccaporena:
      'Roccaporena, mala vesnice kde se narodila sv. Rita. Nachazi se zde znamy modlitebni skalisek.',
    subiaco_sacro_speco:
      'Sacro Speco v Subiacu, jeskyne, kde mlady Benedikt zil tri roky jako poustevnik.',
    subiaco_santa_scolastica:
      'Klaster Santa Scolastica v Subiacu, nejstarsi benediktinsky klaster na svete.',
    montecassino:
      'Opatstvi Montecassino, zalozene sv. Benediktem kolem roku 529.',
    leonessa:
      'Leonessa, puvabne stredoveke horske mesto se silnym frantiskanskym odkazem.',
    trevi_nel_lazio:
      'Trevi nel Lazio, malebna stredoveka obec na kopci s vyhledem do udoli Aniene.',
    collepardo:
      'Collepardo, kde lezi Certosa di Trisulti, pusobivy kartuzian sky klaster v horach.',
    casamari:
      'Opatstvi Casamari, vyborny priklad italske goticke cisterciacke architektury.',
    arpino:
      'Arpino, rodne mesto Cicera, s vyjimecnou predrimskou akropoli a stredovekym centrem.',
    alvito:
      'Alvito, klidna obec v udoli Comino s ruinami stredovekeho hradu.',
    atina:
      'Atina, jedno z nejstarsich mest v Laziu s rimskym i stredovekym dedictvim.',
  },
} as const;

export default cs;
