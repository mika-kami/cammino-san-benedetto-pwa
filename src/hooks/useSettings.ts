import { useState, useEffect } from 'react';

interface Settings {
  language: string;
  units: string;
  outdoor_mode: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  language: 'en',
  units: 'metric',
  outdoor_mode: false
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('csb_settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('csb_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
}
