type Language = 'it' | 'en' | 'de' | 'cs' | 'fr' | 'nl';

const ITALIAN_MARKERS = /\b(che cos|donativo|posti|credenziale|pellegrino|a richiesta|sacco|letto|bagni|cucina|tappa|navetta|camera)\b/i;

const EN_PILGRIM_EXPLAINER =
  'What is a pilgrim house? This informal definition means private, non-commercial hospitality without a fixed tariff and reserved for pilgrims with a valid credential. What is donation-based hospitality? It is a free, voluntary contribution that helps cover costs and support the host. What is a fair donation? Give according to your possibilities and conscience, keeping in mind that hosts have real operating costs.';

const DE_PILGRIM_EXPLAINER =
  'Was ist ein Pilgerhaus? Diese informelle Bezeichnung meint private, nicht-kommerzielle Unterkunft ohne festen Tarif, reserviert fuer Pilger mit gueltigem Pilgerausweis. Was bedeutet spendenbasierte Unterkunft? Es ist ein freiwilliger Beitrag zur Deckung der Kosten und zur Unterstuetzung der Gastgeber. Was ist eine faire Spende? Gib nach deinen Moeglichkeiten und deinem Gewissen.';

const CS_PILGRIM_EXPLAINER =
  'Co je poutnicky dum? Jde o soukrome, nekomercni ubytovani bez pevne sazby, urcene poutnikum s platnym prukazem. Co znamena dobrovolny prispevek? Je to dobrovolna castka na pokryti nakladu hostitelu. Jaky prispevek je primereny? Prispejte podle svych moznosti a svedomi.';

const IT_TO_EN_REPLACEMENTS: Array<[RegExp, string]> = [
  [/A donativo/gi, 'Donation-based'],
  [/posti letto/gi, 'beds'],
  [/\bposti\b/gi, 'beds'],
  [/con uso cucina/gi, 'with kitchen access'],
  [/servizio navetta/gi, 'shuttle service'],
  [/a richiesta/gi, 'on request'],
  [/camera singola/gi, 'single room'],
  [/camera doppia/gi, 'double room'],
  [/camera tripla/gi, 'triple room'],
  [/camera quadrupla/gi, 'quadruple room'],
  [/\bconvento\b/gi, 'convent'],
  [/\bcredenziale\b/gi, 'credential'],
  [/\bpellegrino\b/gi, 'pilgrim'],
  [/\bpellegrini\b/gi, 'pilgrims'],
  [/\bvia\b/gi, 'street'],
  [/\blocalita\b/gi, 'locality'],
  [/\btelefono\b/gi, 'phone'],
  [/\baperto\b/gi, 'open'],
  [/\bchiuso\b/gi, 'closed'],
];

const EN_TO_DE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Donation-based/gi, 'Spendenbasiert'],
  [/\bbeds\b/gi, 'Betten'],
  [/with kitchen access/gi, 'mit Kuechennutzung'],
  [/shuttle service/gi, 'Shuttle-Service'],
  [/on request/gi, 'auf Anfrage'],
  [/single room/gi, 'Einzelzimmer'],
  [/double room/gi, 'Doppelzimmer'],
  [/triple room/gi, 'Dreibettzimmer'],
  [/quadruple room/gi, 'Vierbettzimmer'],
  [/\bconvent\b/gi, 'Kloster'],
  [/\bcredential\b/gi, 'Pilgerausweis'],
  [/\bpilgrims?\b/gi, 'Pilger'],
  [/\bstreet\b/gi, 'Strasse'],
  [/\blocality\b/gi, 'Ort'],
  [/\bphone\b/gi, 'Telefon'],
  [/\bopen\b/gi, 'offen'],
  [/\bclosed\b/gi, 'geschlossen'],
];

const EN_TO_CS_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Donation-based/gi, 'Dobrovolny prispevek'],
  [/\bbeds\b/gi, 'luzka'],
  [/with kitchen access/gi, 's pristupem do kuchyne'],
  [/shuttle service/gi, 'kyvadlova doprava'],
  [/on request/gi, 'na pozadani'],
  [/single room/gi, 'jednoluzkovy pokoj'],
  [/double room/gi, 'dvouluzkovy pokoj'],
  [/triple room/gi, 'triluzkovy pokoj'],
  [/quadruple room/gi, 'ctyrluzkovy pokoj'],
  [/\bconvent\b/gi, 'klaster'],
  [/\bcredential\b/gi, 'poutnicky prukaz'],
  [/\bpilgrims?\b/gi, 'poutnici'],
  [/\bstreet\b/gi, 'ulice'],
  [/\blocality\b/gi, 'lokalita'],
  [/\bphone\b/gi, 'telefon'],
  [/\bopen\b/gi, 'otevreno'],
  [/\bclosed\b/gi, 'uzavreno'],
];

function applyReplacements(text: string, replacements: Array<[RegExp, string]>): string {
  return replacements.reduce((acc, [pattern, value]) => acc.replace(pattern, value), text);
}

function withExplainerByLanguage(text: string, language: Language): string {
  const base = text.replace(/CHE COS[\s\S]*$/i, '').trim();
  if (!/CHE COS/i.test(text)) return base;

  if (language === 'de') return `${base} ${DE_PILGRIM_EXPLAINER}`.trim();
  if (language === 'cs') return `${base} ${CS_PILGRIM_EXPLAINER}`.trim();
  return `${base} ${EN_PILGRIM_EXPLAINER}`.trim();
}

function stillLooksItalian(text: string): boolean {
  return ITALIAN_MARKERS.test(text);
}

function shouldKeepPartiallyTranslatedDetail(note: string): boolean {
  return /[\d€]/.test(note) || /\b(CIN|BB|MP|SP|SGL|DBL|TPL|QDPL)\b/i.test(note);
}

export function localizeAccommodationNote(note: string, language: string, fallback: string): string {
  const lang = (language.slice(0, 2) as Language) || 'en';
  const normalized = note.trim();
  if (!normalized) return '';
  if (lang === 'it') return normalized;

  let translated = withExplainerByLanguage(normalized, lang);
  translated = applyReplacements(translated, IT_TO_EN_REPLACEMENTS);

  if (lang === 'de') translated = applyReplacements(translated, EN_TO_DE_REPLACEMENTS);
  if (lang === 'cs') translated = applyReplacements(translated, EN_TO_CS_REPLACEMENTS);

  if (stillLooksItalian(translated)) {
    if (shouldKeepPartiallyTranslatedDetail(translated)) return translated;
    return fallback;
  }

  return translated;
}
