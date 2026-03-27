import routeData from './routes-generated.json';

export type RouteWaypoint = [number, number, number]; // [lat, lng, ele]

export const stageRoutes: Record<string, RouteWaypoint[]> = routeData as unknown as Record<string, RouteWaypoint[]>;
