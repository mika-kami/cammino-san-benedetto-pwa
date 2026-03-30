import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../hooks/useSettings';

const LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'cs', label: 'Cestina', flag: 'CZ' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'nl', label: 'Nederlands', flag: 'NL' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const { updateSetting } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    updateSetting('language', code);
    setOpen(false);
  };

  return (
    <div className="lang-selector" ref={ref}>
      <button className="lang-toggle" onClick={() => setOpen(!open)} aria-label="Select language">
        {current.flag}
      </button>
      {open && (
        <div className="lang-dropdown">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              className={`lang-option ${l.code === i18n.language ? 'active' : ''}`}
              onClick={() => handleSelect(l.code)}
            >
              <span className="lang-flag">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
