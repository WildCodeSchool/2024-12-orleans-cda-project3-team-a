import { useEffect, useState } from 'react';

import type { Creatures } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useCreatures() {
  const [creatures, setCreatures] = useState<Creatures>([]);

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`${API_URL}/game/creatures`, {
          credentials: 'include',
        });
        const data = await response.json();
        setCreatures(data.creaturesList);
      } catch (error) {
        console.error('fetch failed', error);
      }
    }
    void fetchCreatures();
  }, []);
  return { creatures };
}
