import { useEffect, useState } from 'react';

import type { Enclosure } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useEnclosures() {
  const [creaturesEnclos, setCreaturesEnclos] = useState<Enclosure[]>([]);

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`${API_URL}/game/enclos`, {
          credentials: 'include',
        });
        const data = await response.json();
        setCreaturesEnclos(data.creaturesList);
      } catch (error) {
        console.error('fetch failed', error);
      }
    }
    void fetchCreatures();
  }, []);
  return { creaturesEnclos };
}
