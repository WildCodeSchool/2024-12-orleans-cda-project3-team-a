import { useCallback, useEffect, useState } from 'react';

import type { UnlockedZones } from '@app/api';

export default function useZones() {
  const [unlockedZones, setUnlockedZones] = useState<UnlockedZones>([]);
  const [isLoadingZones, setIsLoadingZones] = useState(true);
  const [countZones, setCountZones] = useState(0);

  const fetchZones = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/zones-count`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No zones');
      }

      setUnlockedZones(data.unlockedZonesResult);
      setCountZones(data.unlockedZonesCount.countZones);
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
    countZones,
    refetchZones: fetchZones,
  };
}
