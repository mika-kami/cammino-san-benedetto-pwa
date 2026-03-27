import { useState, useEffect, useCallback } from 'react';
import type { RouteAlert } from '../data/alerts';

const STORAGE_KEYS = {
  liveAlerts: 'csb_live_alerts',
  lastRefreshed: 'csb_last_refreshed',
  accommodationsLastChecked: 'csb_accommodations_last_checked',
} as const;

const API_URL = (import.meta.env.VITE_API_BASE_URL || '') + '/api/refresh';

interface RefreshApiResponse {
  last_updated: string | null;
  alerts: RouteAlert[];
  accommodations_last_checked: string | null;
  source: string;
  error?: string;
}

export function useDataRefresh() {
  const [liveAlerts, setLiveAlerts] = useState<RouteAlert[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.liveAlerts);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [lastRefreshed, setLastRefreshed] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.lastRefreshed)
  );

  const [accommodationsLastChecked, setAccommodationsLastChecked] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.accommodationsLastChecked)
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.liveAlerts, JSON.stringify(liveAlerts));
  }, [liveAlerts]);

  useEffect(() => {
    if (lastRefreshed) localStorage.setItem(STORAGE_KEYS.lastRefreshed, lastRefreshed);
  }, [lastRefreshed]);

  useEffect(() => {
    if (accommodationsLastChecked) localStorage.setItem(STORAGE_KEYS.accommodationsLastChecked, accommodationsLastChecked);
  }, [accommodationsLastChecked]);

  const triggerRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setRefreshError(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
      }

      const data: RefreshApiResponse = await res.json();

      if (data.error) {
        setRefreshError(data.error);
        return;
      }

      if (data.alerts.length > 0) {
        setLiveAlerts(data.alerts);
      }
      if (data.last_updated) {
        setLastRefreshed(data.last_updated);
      }
      if (data.accommodations_last_checked) {
        setAccommodationsLastChecked(data.accommodations_last_checked);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Refresh failed';
      setRefreshError(msg);
      console.error('[useDataRefresh] error:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return {
    liveAlerts,
    lastRefreshed,
    accommodationsLastChecked,
    isRefreshing,
    refreshError,
    triggerRefresh,
  };
}
