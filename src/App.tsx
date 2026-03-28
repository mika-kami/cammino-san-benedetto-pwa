import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import StageListPage from './pages/StageListPage';
import StageDetailPage from './pages/StageDetailPage';
import MapPage from './pages/MapPage';
import AccommodationPage from './pages/AccommodationPage';
import CredentialPage from './pages/CredentialPage';
import SettingsPage from './pages/SettingsPage';
import LanguageSelector from './components/LanguageSelector';
import { useSettings } from './hooks/useSettings';

export default function App() {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW();

  return (
    <div className={settings.outdoor_mode ? 'outdoor-mode' : ''}>
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stages" element={<StageListPage />} />
        <Route path="/stages/:id" element={<StageDetailPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/accommodations" element={<AccommodationPage />} />
        <Route path="/credential" element={<CredentialPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <BottomNav />
      {needRefresh && (
        <div style={{
          position: 'fixed', bottom: '72px', left: '16px', right: '16px',
          background: '#7B4B2A', color: '#fff',
          padding: '12px 16px', borderRadius: 'var(--radius)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 9999
        }}>
          <span style={{ fontSize: '0.9rem' }}>{t('common.update_available')}</span>
          <button
            onClick={() => updateServiceWorker(true)}
            style={{ background: '#fff', color: '#7B4B2A', border: 'none', borderRadius: '6px', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}
          >
            {t('common.update_now')}
          </button>
        </div>
      )}
    </div>
  );
}
