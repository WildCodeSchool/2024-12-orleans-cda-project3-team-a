import { useEffect, useState } from 'react';

import type { Enclos } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useEnclos() {
  const [creaturesEnclos, setCreaturesEnclos] = useState<Enclos>([]);

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`${API_URL}/game/creatures`, {
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
