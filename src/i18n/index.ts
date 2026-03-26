import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import it from './it';
import de from './de';
import fr from './fr';
import nl from './nl';

const SUPPORTED_LANGUAGES = ['it', 'en', 'de', 'fr', 'nl'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function getStoredLanguage(): SupportedLanguage {
  try {
    const raw = localStorage.getItem('csb_settings');
    if (raw) {
      const settings = JSON.parse(raw);
      if (
        settings.language &&
        SUPPORTED_LANGUAGES.includes(settings.language as SupportedLanguage)
      ) {
        return settings.language as SupportedLanguage;
      }
    }
  } catch {
    // ignore parse errors
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
    de: { translation: de },
    fr: { translation: fr },
    nl: { translation: nl },
  },
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export { SUPPORTED_LANGUAGES };
export type { SupportedLanguage };
export default i18n;
