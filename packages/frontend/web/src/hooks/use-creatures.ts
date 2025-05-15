import { useEffect, useState } from 'react';

import type { ActiveCreatureCount, Creatures } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useCreatures() {
  const [creatures, setCreatures] = useState<Creatures>([]);
  const [activeCreatures, setActiveCreatures] = useState<ActiveCreatureCount>(
    [],
  );

  const creatureId = 6;

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(
          `${API_URL}/game/creatures?creature_id=${creatureId}`,
          {
            credentials: 'include',
          },
        );
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
