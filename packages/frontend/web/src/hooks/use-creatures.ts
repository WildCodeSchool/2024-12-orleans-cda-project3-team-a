import { useEffect, useState } from 'react';

import type { GetActiveCreatureCount, GetCreatures } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useCreatures() {
  const [creatures, setCreatures] = useState<GetCreatures>([]);
  const [activeCreatures, setActiveCreatures] =
    useState<GetActiveCreatureCount>([]);

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`${API_URL}/game/creatures`, {
          credentials: 'include',
        });
        const data = await response.json();
        setCreatures(data.creatures);
        setActiveCreatures(data.activeCreatures);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch creature failed', error);
      }
    }

    void fetchCreatures();
  }, []);

  return {
    creatures,
    activeCreatures,
  };
}
