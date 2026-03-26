import { useMemo } from 'react';
import { generateElevationProfile, getMinMaxElevation } from '../utils/elevation';
import { useTranslation } from 'react-i18next';

interface Props {
  stageNumber: number | string;
}

export default function ElevationProfile({ stageNumber }: Props) {
  const { t } = useTranslation();
  const profile = useMemo(() => generateElevationProfile(stageNumber), [stageNumber]);
  const { min, max } = useMemo(() => getMinMaxElevation(profile), [profile]);

  if (profile.length === 0) return null;

  const width = 560;
  const height = 160;
  const padding = { top: 10, right: 10, bottom: 30, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxDist = profile[profile.length - 1].distance;
  const eleRange = max - min || 1;
  const eleMin = min - eleRange * 0.1;
  const eleMax = max + eleRange * 0.1;
  const adjustedRange = eleMax - eleMin;

  const toX = (d: number) => padding.left + (d / maxDist) * chartW;
  const toY = (e: number) => padding.top + chartH - ((e - eleMin) / adjustedRange) * chartH;

  const pathD = profile.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${toX(p.distance).toFixed(1)} ${toY(p.elevation).toFixed(1)}`
  ).join(' ');

  const areaD = pathD + ` L ${toX(maxDist).toFixed(1)} ${(padding.top + chartH).toFixed(1)} L ${padding.left} ${(padding.top + chartH).toFixed(1)} Z`;

  return (
    <div className="elevation-chart">
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
          const y = padding.top + chartH * (1 - t);
          const ele = Math.round(eleMin + adjustedRange * t);
          return (
            <g key={t}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#E8DDD0" strokeWidth="0.5" />
              <text x={padding.left - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#6B5B4E">{ele}m</text>
            </g>
          );
        })}

        {/* X axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
          const x = toX(maxDist * t);
          const dist = (maxDist * t).toFixed(1);
          return (
            <text key={t} x={x} y={height - 5} textAnchor="middle" fontSize="9" fill="#6B5B4E">{dist}km</text>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="rgba(123, 75, 42, 0.15)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#7B4B2A" strokeWidth="2" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
        <span>Min: {min}m</span>
        <span>Max: {max}m</span>
      </div>
    </div>
  );
}
