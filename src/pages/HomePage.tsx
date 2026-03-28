import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { stages } from '../data/stages';
import { alerts as staticAlerts } from '../data/alerts';
import { useProgress } from '../hooks/useProgress';
import { useDataRefresh } from '../hooks/useDataRefresh';

export default function HomePage() {
  const { t } = useTranslation();
  const { progress } = useProgress();
  const { liveAlerts, lastRefreshed, isRefreshing, isOnline, refreshError, triggerRefresh } = useDataRefresh();
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const completedCount = progress.stages_completed.length;
  const totalDistance = stages.reduce((sum, s) => sum + s.distance_km, 0).toFixed(0);

  // Use live alerts when available, otherwise fall back to static
  const alerts = liveAlerts.length > 0 ? liveAlerts : staticAlerts;
  const activeAlerts = alerts.filter(a => a.severity === 'closed' || a.severity === 'warning');

  const handleRefresh = async () => {
    setStatusMessage(null);
    await triggerRefresh();
  };

  // Show status after refresh completes
  useEffect(() => {
    if (isRefreshing) return;
    if (refreshError) {
      setStatusMessage({ type: 'error', text: refreshError });
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
    if (lastRefreshed) {
      setStatusMessage({ type: 'success', text: new Date(lastRefreshed).toLocaleString() });
      const timer = setTimeout(() => setStatusMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing, refreshError, lastRefreshed]);

  return (
    <div className="page">
      {!isOnline && (
        <div style={{
          background: '#f5a623',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 'var(--radius)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem'
        }}>
          📵 {t('common.offline')} — {t('home.showing_cached_data')}
        </div>
      )}
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🚶‍♂️</div>
        <h1 className="page-title" style={{ fontSize: '1.8rem', marginBottom: '4px' }}>
          {t('home.title')}
        </h1>
        <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', marginBottom: '24px' }}>
          {t('home.subtitle')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>~{totalDistance}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{t('common.km')}</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>16</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{t('home.total_stages')}</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{completedCount}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{t('stage.completed')}</div>
          </div>
        </div>

        {completedCount > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(completedCount / 16) * 100}%` }} />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
              {completedCount}/16 {t('credential.stages_completed')}
            </div>
          </div>
        )}

        <Link to="/stages" className="btn btn-primary btn-block" style={{ textDecoration: 'none', marginBottom: '12px' }}>
          {t('home.start_walking')}
        </Link>
        <Link to="/map" className="btn btn-secondary btn-block" style={{ textDecoration: 'none' }}>
          {t('nav.map')}
        </Link>
      </div>

      {/* Refresh Data Button */}
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button
          className="btn btn-secondary btn-block"
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{ opacity: !isOnline ? 0.5 : 1 }}
        >
          {isRefreshing ? t('home.refreshing') : `🔄 ${t('home.refresh_data')}`}
        </button>

        {statusMessage && (
          <div style={{ marginTop: '8px', fontSize: '0.85rem', color: statusMessage.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {statusMessage.type === 'success' ? '✅' : '❌'} {statusMessage.type === 'success' ? `${t('home.refresh_success')} ${statusMessage.text}` : t('home.refresh_error')}
          </div>
        )}

        {lastRefreshed && !statusMessage && (
          <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            {t('home.last_refreshed')}: {new Date(lastRefreshed).toLocaleString()}
          </div>
        )}
      </div>

      {activeAlerts.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ marginBottom: '8px' }}>{t('alerts.active')}</h3>
          {activeAlerts.map(alert => (
            <div key={alert.id} className={`alert-banner ${alert.severity}`}>
              <span>{alert.severity === 'closed' ? '🔴' : '⚠️'}</span>
              <div>
                <strong>{alert.title}</strong>
                <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>{alert.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
