import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import { stages } from '../data/stages';
import { pois } from '../data/pois';
import { accommodations } from '../data/accommodations';
import { alerts } from '../data/alerts';

export default function MapPage() {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([42.4, 13.2], 9);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    // Draw route line through all stages
    const routePoints: L.LatLngExpression[] = [];
    stages.filter(s => s.variant_of === null).forEach(stage => {
      routePoints.push([stage.start.gps.lat, stage.start.gps.lng]);
      routePoints.push([stage.end.gps.lat, stage.end.gps.lng]);
    });

    if (routePoints.length > 0) {
      L.polyline(routePoints, { color: '#7B4B2A', weight: 4, opacity: 0.8 }).addTo(map);
    }

    // Stage markers
    stages.filter(s => s.variant_of === null).forEach(stage => {
      const stageAlerts = alerts.filter(a => a.stage === stage.stage_number);
      const hasAlert = stageAlerts.length > 0;

      const startIcon = L.divIcon({
        className: 'stage-marker',
        html: `<div style="background:${hasAlert ? '#F44336' : '#7B4B2A'};color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)">${stage.stage_number}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([stage.start.gps.lat, stage.start.gps.lng], { icon: startIcon })
        .addTo(map)
        .bindPopup(`<b>${t('nav.stages')} ${stage.stage_number}</b><br>${stage.name}<br>${stage.distance_km} km`);
    });

    // End marker (Montecassino)
    const lastStage = stages.find(s => s.stage_number === 16);
    if (lastStage) {
      const endIcon = L.divIcon({
        className: 'end-marker',
        html: `<div style="background:#4CAF50;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)">⛪</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker([lastStage.end.gps.lat, lastStage.end.gps.lng], { icon: endIcon })
        .addTo(map)
        .bindPopup('<b>Abbazia di Montecassino</b><br>End of the Cammino di San Benedetto');
    }

    // POI markers
    pois.forEach(poi => {
      const color = poi.type === 'abbey' ? '#9C27B0' : poi.type === 'nature' ? '#4CAF50' : '#FF9800';
      const icon = L.divIcon({
        className: 'poi-marker',
        html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      L.marker([poi.gps.lat, poi.gps.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${poi.name}</b><br>${poi.notes}`);
    });

    // Accommodation markers
    accommodations.forEach(acc => {
      const icon = L.divIcon({
        className: 'acc-marker',
        html: `<div style="background:#2196F3;width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });
      L.marker([acc.gps.lat, acc.gps.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${acc.name}</b><br>${acc.type}<br>${acc.phone ? `<a href="tel:${acc.phone}">${acc.phone}</a>` : ''}`);
    });

    // Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const latlng: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(latlng);
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 5000 }
      );
    }

    return () => { map.remove(); mapInstanceRef.current = null; };
  }, [t]);

  // Update user location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;
    const icon = L.divIcon({
      className: 'user-marker',
      html: '<div style="background:#2196F3;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 2px #2196F3"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker(userLocation, { icon, zIndexOffset: 1000 })
      .addTo(mapInstanceRef.current)
      .bindPopup(t('map.my_location'));
  }, [userLocation, t]);

  const zoomToRoute = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds(stages.map(s => [s.start.gps.lat, s.start.gps.lng]));
    stages.forEach(s => bounds.extend([s.end.gps.lat, s.end.gps.lng]));
    mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
  };

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <div style={{ position: 'absolute', bottom: 'calc(var(--nav-height) + 16px)', right: '16px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button className="btn btn-primary btn-sm" onClick={zoomToRoute} style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0 }}>
          🗺
        </button>
        {userLocation && (
          <button className="btn btn-primary btn-sm" onClick={() => mapInstanceRef.current?.setView(userLocation, 15)} style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0 }}>
            📍
          </button>
        )}
      </div>
    </div>
  );
}
