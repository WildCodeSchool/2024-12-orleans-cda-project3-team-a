import { useEffect, useState } from 'react';

import type { Enclosure } from '@app/api';

export default function useEnclosures() {
  const [creaturesEnclos, setCreaturesEnclos] = useState<Enclosure[]>([]);

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`/api/game/enclos`, {
          credentials: 'include',
        });
        const data = await response.json();
        setCreaturesEnclos(data.enclosure);
      } catch (error) {
        console.error('fetch failed', error);
      }
    }
    void fetchCreatures();
  }, []);
  return { creaturesEnclos };
}
