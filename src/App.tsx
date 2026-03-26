import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import StageListPage from './pages/StageListPage';
import StageDetailPage from './pages/StageDetailPage';
import MapPage from './pages/MapPage';
import AccommodationPage from './pages/AccommodationPage';
import CredentialPage from './pages/CredentialPage';
import SettingsPage from './pages/SettingsPage';
import { useSettings } from './hooks/useSettings';

export default function App() {
  const { settings } = useSettings();

  return (
    <div className={settings.outdoor_mode ? 'outdoor-mode' : ''}>
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
    </div>
  );
}
