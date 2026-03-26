import { stages } from '../data/stages';

export interface ElevationPoint {
  distance: number; // km from start
  elevation: number; // meters
}

export function generateElevationProfile(stageNumber: number | string): ElevationPoint[] {
  const stage = stages.find(s => String(s.stage_number) === String(stageNumber));
  if (!stage) return [];

  const points: ElevationPoint[] = [];
  const numPoints = 50;
  const startEle = stage.start.elevation_m;
  const endEle = stage.end.elevation_m;
  const totalDist = stage.distance_km;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const distance = +(t * totalDist).toFixed(2);

    // Create realistic elevation profile with hills
    const baseEle = startEle + (endEle - startEle) * t;
    const hillAmplitude = (stage.ascent_m + stage.descent_m) / 6;
    const hill1 = Math.sin(t * Math.PI * 2.5) * hillAmplitude * 0.6;
    const hill2 = Math.sin(t * Math.PI * 1.3 + 0.5) * hillAmplitude * 0.4;
    const elevation = Math.round(baseEle + hill1 + hill2);

    points.push({ distance, elevation });
  }

  return points;
}

export function getMinMaxElevation(points: ElevationPoint[]) {
  if (points.length === 0) return { min: 0, max: 0 };
  const elevations = points.map(p => p.elevation);
  return { min: Math.min(...elevations), max: Math.max(...elevations) };
}
