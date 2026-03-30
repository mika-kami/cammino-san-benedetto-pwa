const de = {
  nav: {
    home: 'Start',
    stages: 'Etappen',
    map: 'Karte',
    accommodations: 'Unterkuenfte',
    credential: 'Pilgerausweis',
    settings: 'Einstellungen',
  },
  home: {
    title: 'Cammino di San Benedetto',
    subtitle: 'Norcia -> Montecassino',
    total_distance: 'Gesamtdistanz',
    total_stages: 'Gesamtetappen',
    start_walking: 'Tour starten',
    refresh_data: 'Alle Daten aktualisieren',
    refreshing: 'Aktualisierung...',
    refresh_success: 'Aktualisiert',
    refresh_error: 'Verbindung fehlgeschlagen',
    last_refreshed: 'Zuletzt aktualisiert',
    showing_cached_data: 'Zwischengespeicherte Daten werden angezeigt',
  },
  stage: {
    distance: 'Distanz',
    ascent: 'Aufstieg',
    descent: 'Abstieg',
    difficulty: 'Schwierigkeit',
    estimated_time: 'Geschaetzte Zeit',
    hours: 'Stunden',
    download_gpx: 'GPX herunterladen',
    download_full_gpx: 'Vollstaendige GPX herunterladen',
    elevation_profile: 'Hoehenprofil',
    accommodations: 'Unterkuenfte',
    pois: 'Sehenswuerdigkeiten',
    mark_completed: 'Als abgeschlossen markieren',
    completed: 'Abgeschlossen',
    alerts: 'Hinweise',
    gpx_offline_note: 'GPX offline verfuegbar - bereits im Cache',
  },
  difficulty: {
    easy: 'Leicht',
    medium: 'Mittel',
    hard: 'Schwer',
    strenuous: 'Sehr anspruchsvoll',
  },
  accommodation: {
    filter_all: 'Alle',
    filter_by_type: 'Nach Typ filtern',
    credential_required: 'Pilgerausweis erforderlich',
    cin_compliant: 'CIN vorhanden',
    stamp_point: 'Stempelstelle',
    last_scraped: 'Zuletzt aktualisiert',
    call: 'Anrufen',
    directions: 'Route',
    view_source: 'Quelle anzeigen',
    view_official_site: 'Auf offizieller Seite ansehen',
    note_untranslated: 'Hinweis auf der Quellseite verfuegbar.',
    source: {
      camminodibenedetto: 'Offizielle Seite',
      dormireincammino: 'Dormire in Cammino',
      booking: 'Booking.com',
      google: 'Google',
      direct: 'Direkt',
      'pilgrim-guide': 'Pilgerfuehrer',
    },
    type: {
      ostello: 'Hostel',
      hotel: 'Hotel',
      bb: 'B&B',
      agriturismo: 'Agriturismo',
      donativo: 'Spende',
      affittacamere: 'Zimmervermietung',
      religious: 'Religioese Unterkunft',
    },
  },
  credential: {
    title: 'Pilgerausweis',
    stamps_collected: 'Gesammelte Stempel',
    stages_completed: 'Abgeschlossene Etappen',
    progress: 'Fortschritt',
    start_date: 'Startdatum',
    pilgrim_name: 'Name des Pilgers',
    testimonium_eligible: 'Testimonium moeglich',
    testimonium_message:
      'Schliesse mindestens 100 km zu Fuss ab, um das Testimonium in Montecassino zu erhalten.',
    reset: 'Pilgerausweis zuruecksetzen',
  },
  alerts: {
    active: 'Aktive Hinweise',
    no_alerts: 'Keine aktiven Hinweise',
    closed: 'Gesperrt',
    warning: 'Warnung',
    since: 'Seit',
    source: 'Quelle',
  },
  map: {
    my_location: 'Mein Standort',
    off_route_warning: 'Du bist ausserhalb der Route',
    distance_to_end: 'Distanz bis zum Ziel',
    zoom_to_route: 'Auf Route zoomen',
    offline_tiles_notice: 'Offline - nur zwischengespeicherte Kartenbereiche verfuegbar',
    finish_popup: 'Ende des Cammino di San Benedetto',
  },
  settings: {
    title: 'Einstellungen',
    language: 'Sprache',
    offline_status: 'Offline-Status',
    last_synced: 'Zuletzt synchronisiert',
    clear_data: 'Daten loeschen',
    about: 'Info',
    version: 'Version',
    outdoor_mode: 'Outdoor-Modus',
  },
  common: {
    km: 'km',
    meters: 'm',
    loading: 'Laedt...',
    error: 'Ein Fehler ist aufgetreten',
    offline: 'Offline',
    online: 'Online',
    update_available: 'App-Update verfuegbar',
    update_now: 'Jetzt aktualisieren',
  },
  poi: {
    norcia_basilica:
      'Basilika des hl. Benedikt in Norcia, Geburtsort des Schutzpatrons Europas. Nach dem Erdbeben 2016 wiederaufgebaut.',
    cascia:
      'Heiligtum der hl. Rita von Cascia, ein wichtiges Pilgerziel der Heiligen der unmoeglichen Faelle.',
    roccaporena:
      'Roccaporena, das kleine Dorf, in dem die hl. Rita geboren wurde. Hier befindet sich der bekannte Gebetsfelsen.',
    subiaco_sacro_speco:
      'Sacro Speco in Subiaco, die Hoehle, in der der junge Benedikt drei Jahre als Einsiedler lebte.',
    subiaco_santa_scolastica:
      'Kloster Santa Scolastica in Subiaco, das aelteste Benediktinerkloster der Welt, gegruendet im 6. Jahrhundert.',
    montecassino:
      'Abtei Montecassino, um 529 n. Chr. von Benedikt gegruendet. Wiege des westlichen Moenchtums.',
    leonessa:
      'Leonessa, ein malerisches mittelalterliches Bergdorf mit franziskanischer Tradition.',
    trevi_nel_lazio:
      'Trevi nel Lazio, ein mittelalterliches Dorf auf einem Huegel mit Blick auf das Aniene-Tal.',
    collepardo:
      'Collepardo, Heimat der Certosa di Trisulti, eines eindrucksvollen Kartaeuserklosters in den Bergen.',
    casamari:
      'Abtei Casamari, ein hervorragendes Beispiel italienischer gotischer Zisterzienserarchitektur.',
    arpino:
      'Arpino, Geburtsort Ciceros, mit bemerkenswerter vorroemischer Akropolis und mittelalterlicher Altstadt.',
    alvito:
      'Alvito, ein ruhiges Dorf im Comino-Tal, ueberragt von den Ruinen einer mittelalterlichen Burg.',
    atina:
      'Atina, eine der aeltesten Staedte Latiums im oberen Comino-Tal mit roemischem und mittelalterlichem Erbe.',
  },
} as const;

export default de;
