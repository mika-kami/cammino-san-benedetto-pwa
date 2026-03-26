import { useTranslation } from 'react-i18next';
import { useSettings } from '../hooks/useSettings';

const LANGUAGES = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'nl', label: 'Nederlands' },
];

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { settings, updateSetting } = useSettings();

  const handleLanguageChange = (lang: string) => {
    updateSetting('language', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="page">
      <h1 className="page-title">{t('settings.title')}</h1>

      <div className="card">
        <div className="setting-row">
          <span className="setting-label">{t('settings.language')}</span>
          <select value={settings.language} onChange={e => handleLanguageChange(e.target.value)}>
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>

        <div className="setting-row">
          <span className="setting-label">{t('settings.outdoor_mode')}</span>
          <button
            className={`btn btn-sm ${settings.outdoor_mode ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => updateSetting('outdoor_mode', !settings.outdoor_mode)}
          >
            {settings.outdoor_mode ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="setting-row">
          <span className="setting-label">{t('settings.offline_status')}</span>
          <span className="setting-value">{navigator.onLine ? t('common.online') : t('common.offline')}</span>
        </div>

        <div className="setting-row">
          <span className="setting-label">{t('settings.version')}</span>
          <span className="setting-value">1.1.0</span>
        </div>
      </div>

      <div className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ marginBottom: '12px' }}>{t('settings.about')}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
          Cammino di San Benedetto — Norcia → Montecassino
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '8px' }}>
          Route data: <a href="https://www.camminodibenedetto.it" target="_blank" rel="noopener noreferrer">camminodibenedetto.it</a>
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
          Maps: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors
        </p>
      </div>
    </div>
  );
}
