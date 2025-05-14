import { useEffect, useState } from 'react';

import type { UnlockedZones } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useZonesInfo() {
  const [unlockedZones, setUnlockedZones] = useState<UnlockedZones>([]);

  useEffect(() => {
    async function fetchZonesInfo() {
      try {
        const response = await fetch(`${API_URL}/game/zones-count`, {
          credentials: 'include',
        });
        const data = await response.json();
        setUnlockedZones(data.unlockedZonesResult);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch failed');
      }
    }

    void fetchZonesInfo();
  }, []);

  return {
    unlockedZones,
  };
}
