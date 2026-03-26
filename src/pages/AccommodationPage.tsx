import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { accommodations } from '../data/accommodations';

const TYPES = ['all', 'ostello', 'hotel', 'bb', 'agriturismo', 'donativo', 'affittacamere', 'religious'] as const;

export default function AccommodationPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<number>(0);

  const filtered = accommodations.filter(a => {
    if (filter !== 'all' && a.type !== filter) return false;
    if (stageFilter > 0 && a.stage !== stageFilter) return false;
    return true;
  });

  return (
    <div className="page">
      <h1 className="page-title">{t('nav.accommodations')}</h1>

      <select value={stageFilter} onChange={e => setStageFilter(Number(e.target.value))} style={{ width: '100%', marginBottom: '8px' }}>
        <option value={0}>{t('accommodation.filter_all')} - {t('nav.stages')}</option>
        {Array.from({ length: 16 }, (_, i) => i + 1).map(n => (
          <option key={n} value={n}>{t('nav.stages')} {n}</option>
        ))}
      </select>

      <div className="filter-bar">
        {TYPES.map(type => (
          <button
            key={type}
            className={`filter-chip ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {type === 'all' ? t('accommodation.filter_all') : t(`accommodation.type.${type}`)}
          </button>
        ))}
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '12px' }}>
        {filtered.length} {t('nav.accommodations')}
        {filtered.length > 0 && ` · ${t('accommodation.last_scraped')}: ${new Date(filtered[0].last_scraped).toLocaleDateString()}`}
      </div>

      {filtered.map(acc => (
        <div key={acc.id} className="card accommodation-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="accommodation-name">{acc.name}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{t('nav.stages')} {acc.stage}</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            {acc.location} · {acc.address}
          </div>
          <div className="accommodation-meta">
            <span className="badge badge-type">{t(`accommodation.type.${acc.type}`)}</span>
            {acc.price_range && <span className="badge badge-type">{acc.price_range}</span>}
            {acc.credential_required && <span className="badge badge-credential">💛 {t('accommodation.credential_required')}</span>}
            {acc.pilgrim_stamp && <span className="badge badge-stamp">{t('accommodation.stamp_point')}</span>}
            {acc.cin_compliant && <span className="badge badge-cin">CIN</span>}
            {acc.rating && <span style={{ fontSize: '0.85rem' }}>⭐ {acc.rating} ({acc.rating_count})</span>}
          </div>
          {acc.notes && <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--color-text-light)' }}>{acc.notes}</div>}
          <div className="accommodation-actions">
            {acc.phone && <a href={`tel:${acc.phone}`} className="btn btn-sm btn-primary">📞 {t('accommodation.call')}</a>}
            <Link to={`/map?lat=${acc.gps.lat}&lng=${acc.gps.lng}`} className="btn btn-sm btn-secondary">📍</Link>
            {acc.source_url && <a href={acc.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">🔗</a>}
          </div>
        </div>
      ))}
    </div>
  );
}
