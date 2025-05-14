import { useCallback, useEffect, useState } from 'react';

import type { UnlockedZones } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useZones() {
  const [unlockedZones, setUnlockedZones] = useState<UnlockedZones>([]);
  const [isLoadingZones, setIsLoadingZones] = useState(true);

  const fetchZones = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/game/zones-count`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No zones');
      }

      setUnlockedZones(data.unlockedZonesResult);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch zones failed');
    } finally {
      setIsLoadingZones(false);
    }
  }, []);

  useEffect(() => {
    void fetchZones();
  }, [fetchZones]);

  return {
    unlockedZones,
    isLoadingZones,
    refetchZones: fetchZones,
  };
}
