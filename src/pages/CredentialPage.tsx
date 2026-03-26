import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { stages } from '../data/stages';
import { stampPoints } from '../data/stamps';
import { useProgress } from '../hooks/useProgress';

export default function CredentialPage() {
  const { t } = useTranslation();
  const { progress, toggleStageComplete, toggleStamp, setName, setStartDate, totalStamps, resetProgress } = useProgress();

  const completedCount = progress.stages_completed.length;
  const totalStampPoints = stampPoints.length;
  const allCompleted = completedCount >= 16;

  if (allCompleted) {
    return (
      <div className="page testimonium-screen">
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h2>{t('credential.testimonium_eligible')}</h2>
        <p style={{ color: 'var(--color-text-light)', marginBottom: '24px', lineHeight: 1.6 }}>
          {t('credential.testimonium_message')}
        </p>
        <div className="card" style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>{progress.pilgrim_name || 'Pilgrim'}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            {t('credential.start_date')}: {progress.start_date || '—'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            {t('credential.stamps_collected')}: {totalStamps}/{totalStampPoints}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            {t('credential.stages_completed')}: {completedCount}/16
          </div>
        </div>
        <button className="btn btn-danger btn-block" onClick={resetProgress} style={{ marginTop: '24px' }}>
          {t('credential.reset')}
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">{t('credential.title')}</h1>

      <div className="card">
        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', display: 'block', marginBottom: '4px' }}>
          {t('credential.pilgrim_name')}
        </label>
        <input type="text" value={progress.pilgrim_name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', display: 'block', marginTop: '12px', marginBottom: '4px' }}>
          {t('credential.start_date')}
        </label>
        <input type="date" value={progress.start_date} onChange={e => setStartDate(e.target.value)} />
      </div>

      <div className="card">
        <h3>{t('credential.progress')}</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(completedCount / 16) * 100}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
          <span>{completedCount}/16 {t('credential.stages_completed')}</span>
          <span>{totalStamps} {t('credential.stamps_collected')}</span>
        </div>
      </div>

      {stages.filter(s => s.variant_of === null).map(stage => {
        const stageNum = stage.stage_number as number;
        const isCompleted = progress.stages_completed.includes(stageNum);
        const stageStamps = stampPoints.filter(s => s.stage === stageNum);
        const collected = progress.stamps_collected[String(stageNum)] || [];

        return (
          <div key={stage.stage_number} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Link to={`/stages/${stage.stage_number}`} style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                {t('nav.stages')} {stage.stage_number}: {stage.name}
              </Link>
              <button
                className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => toggleStageComplete(stageNum)}
              >
                {isCompleted ? '✓' : t('stage.mark_completed')}
              </button>
            </div>
            {stageStamps.length > 0 && (
              <ul className="stamp-list">
                {stageStamps.map(stamp => {
                  const isCollected = collected.includes(stamp.id);
                  return (
                    <li key={stamp.id} className={`stamp-item ${isCollected ? 'collected' : ''}`} onClick={() => toggleStamp(stageNum, stamp.id)}>
                      <div className="stamp-checkbox">{isCollected ? '✓' : ''}</div>
                      <div style={{ fontSize: '0.9rem' }}>{stamp.name}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      <button className="btn btn-danger btn-block" onClick={resetProgress} style={{ marginTop: '16px' }}>
        {t('credential.reset')}
      </button>
    </div>
  );
}
