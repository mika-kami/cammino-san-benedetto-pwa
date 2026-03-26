import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { stages } from '../data/stages';
import { alerts } from '../data/alerts';
import { useProgress } from '../hooks/useProgress';

export default function StageListPage() {
  const { t } = useTranslation();
  const { progress } = useProgress();

  return (
    <div className="page">
      <h1 className="page-title">{t('nav.stages')}</h1>
      {stages.map(stage => {
        const stageNum = typeof stage.stage_number === 'number' ? stage.stage_number : 14;
        const isCompleted = progress.stages_completed.includes(stageNum);
        const stageAlerts = alerts.filter(a => a.stage === stageNum);

        return (
          <Link to={`/stages/${stage.stage_number}`} key={stage.stage_number} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card stage-card">
              {stageAlerts.map(a => (
                <div key={a.id} className={`alert-banner ${a.severity}`} style={{ margin: '-16px -16px 8px', borderRadius: 'var(--radius) var(--radius) 0 0', padding: '8px 16px', fontSize: '0.8rem' }}>
                  {a.severity === 'closed' ? '🔴' : '⚠️'} {a.title}
                </div>
              ))}
              <div className="stage-card-header">
                <div>
                  <div className="stage-number">
                    {t('nav.stages')} {stage.stage_number}
                    {isCompleted && ' ✓'}
                  </div>
                  <div className="stage-name">{stage.name}</div>
                </div>
                <span className={`badge badge-${stage.difficulty}`}>{t(`difficulty.${stage.difficulty}`)}</span>
              </div>
              <div className="stage-stats">
                <span className="stage-stat">📏 {stage.distance_km} {t('common.km')}</span>
                <span className="stage-stat">⬆ {stage.ascent_m}m</span>
                <span className="stage-stat">⬇ {stage.descent_m}m</span>
                <span className="stage-stat">🕐 ~{stage.estimated_hours_walking}h</span>
              </div>
              {stage.variant_of && (
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', fontStyle: 'italic' }}>
                  Variante via San Domenico
                </div>
              )}
            </div>
          </Link>
        );
      })}

      <div style={{ textAlign: 'center', padding: '16px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
          ~305 km | +8,320m {t('stage.ascent')} | -8,869m {t('stage.descent')}
        </div>
      </div>
    </div>
  );
}
