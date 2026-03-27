import { stages } from '../data/stages';
import { stageRoutes } from '../data/routes';

export interface ElevationPoint {
  distance: number; // km from start
  elevation: number; // meters
}

// Haversine distance between two points in km
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function generateElevationProfile(stageNumber: number | string): ElevationPoint[] {
  const stage = stages.find(s => String(s.stage_number) === String(stageNumber));
  if (!stage) return [];

  const waypoints = stageRoutes[String(stageNumber)];
  if (!waypoints || waypoints.length < 2) return [];

  // Calculate cumulative distances from waypoints
  const points: ElevationPoint[] = [];
  let cumDist = 0;

  for (let i = 0; i < waypoints.length; i++) {
    if (i > 0) {
      cumDist += haversine(
        waypoints[i - 1][0], waypoints[i - 1][1],
        waypoints[i][0], waypoints[i][1]
      );
    }
    points.push({
      distance: +cumDist.toFixed(2),
      elevation: waypoints[i][2],
    });
  }

  // Scale distances to match the official stage distance
  const rawTotal = points[points.length - 1].distance;
  if (rawTotal > 0) {
    const scale = stage.distance_km / rawTotal;
    for (const p of points) {
      p.distance = +(p.distance * scale).toFixed(2);
    }
  }

  return points;
}

export function getMinMaxElevation(points: ElevationPoint[]) {
  if (points.length === 0) return { min: 0, max: 0 };
  const elevations = points.map(p => p.elevation);
  return { min: Math.min(...elevations), max: Math.max(...elevations) };
}
