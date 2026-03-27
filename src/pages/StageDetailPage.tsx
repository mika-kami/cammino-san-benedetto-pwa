import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { stages } from '../data/stages';
import { accommodations } from '../data/accommodations';
import { pois } from '../data/pois';
import { alerts } from '../data/alerts';
import { stampPoints } from '../data/stamps';
import { useProgress } from '../hooks/useProgress';
import ElevationProfile from '../components/ElevationProfile';


export default function StageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { progress, toggleStageComplete, toggleStamp } = useProgress();

  const stage = stages.find(s => String(s.stage_number) === id);
  if (!stage) return <div className="page"><p>{t('common.error')}</p></div>;

  const stageNum = typeof stage.stage_number === 'number' ? stage.stage_number : 14;
  const stageAccommodations = accommodations.filter(a => a.stage === stageNum);
  const stagePois = pois.filter(p => p.stage === stageNum);
  const stageAlerts = alerts.filter(a => a.stage === stageNum);
  const stageStamps = stampPoints.filter(s => s.stage === stageNum);
  const isCompleted = progress.stages_completed.includes(stageNum);
  const collectedStamps = progress.stamps_collected[String(stageNum)] || [];

  const handleDownloadGpx = () => {
    const a = document.createElement('a');
    a.href = `/gpx/${stage.gpx_filename}`;
    a.download = stage.gpx_filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="page">
      {stageAlerts.map(a => (
        <div key={a.id} className={`alert-banner ${a.severity}`}>
          {a.severity === 'closed' ? '🔴' : '⚠️'} {a.description}
          <a href={a.source_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>
            {t('alerts.source')}
          </a>
        </div>
      ))}

      <div className="stage-number" style={{ marginBottom: '4px' }}>{t('nav.stages')} {stage.stage_number}</div>
      <h1 className="page-title">{stage.name}</h1>

      <div className="card">
        <div className="stage-stats" style={{ flexWrap: 'wrap' }}>
          <span className="stage-stat">📏 {stage.distance_km} {t('common.km')}</span>
          <span className="stage-stat">⬆ +{stage.ascent_m}m</span>
          <span className="stage-stat">⬇ -{stage.descent_m}m</span>
          <span className="stage-stat">🕐 ~{stage.estimated_hours_walking}h</span>
        </div>
        <div style={{ marginTop: '8px' }}>
          <span className={`badge badge-${stage.difficulty}`}>{t(`difficulty.${stage.difficulty}`)}</span>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '12px' }}>{t('stage.elevation_profile')}</h3>
        <ElevationProfile stageNumber={stage.stage_number} />
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button className="btn btn-primary btn-block" onClick={handleDownloadGpx}>
          📥 {t('stage.download_gpx')}
        </button>
      </div>

      <button
        className={`btn btn-block ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
        onClick={() => toggleStageComplete(stageNum)}
        style={{ marginBottom: '16px' }}
      >
        {isCompleted ? `✓ ${t('stage.completed')}` : t('stage.mark_completed')}
      </button>

      {stageStamps.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ marginBottom: '8px' }}>{t('credential.stamps_collected')}</h3>
          <ul className="stamp-list">
            {stageStamps.map(stamp => {
              const isCollected = collectedStamps.includes(stamp.id);
              return (
                <li key={stamp.id} className={`stamp-item ${isCollected ? 'collected' : ''}`} onClick={() => toggleStamp(stageNum, stamp.id)}>
                  <div className="stamp-checkbox">{isCollected ? '✓' : ''}</div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{stamp.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{stamp.location}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {stagePois.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ marginBottom: '8px' }}>{t('stage.pois')}</h3>
          {stagePois.map(poi => (
            <div key={poi.id} className="card" style={{ padding: '12px' }}>
              <div style={{ fontWeight: 600 }}>{poi.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{poi.notes}</div>
            </div>
          ))}
        </div>
      )}

      {stageAccommodations.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '8px' }}>{t('stage.accommodations')}</h3>
          {stageAccommodations.map(acc => (
            <div key={acc.id} className="card accommodation-card">
              <div className="accommodation-name">{acc.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{acc.address}</div>
              <div className="accommodation-meta">
                <span className="badge badge-type">{t(`accommodation.type.${acc.type}`)}</span>
                {acc.credential_required && <span className="badge badge-credential">💛 {t('accommodation.credential_required')}</span>}
                {acc.pilgrim_stamp && <span className="badge badge-stamp">{t('accommodation.stamp_point')}</span>}
                {acc.cin_compliant && <span className="badge badge-cin">CIN</span>}
                {acc.source && <span className="badge badge-source">{t(`accommodation.source.${acc.source}`)}</span>}
                {acc.rating && <span style={{ fontSize: '0.85rem' }}>⭐ {acc.rating}</span>}
              </div>
              <div className="accommodation-actions">
                {acc.phone && (
                  <a href={`tel:${acc.phone}`} className="btn btn-sm btn-primary">📞 {t('accommodation.call')}</a>
                )}
                <Link to={`/map?lat=${acc.gps.lat}&lng=${acc.gps.lng}`} className="btn btn-sm btn-secondary">📍 {t('accommodation.directions')}</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
