import { useEffect, useState } from 'react';

import type { ActiveCreatureCount, Creatures } from '@app/api';

export default function useCreatures(creatureId: number) {
  const [creatures, setCreatures] = useState<Creatures>([]);
  const [activeCreatures, setActiveCreatures] = useState<ActiveCreatureCount>(
    [],
  );

  // const creatureId = 3;

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(
          `/api/game/creatures?creature_id=${creatureId}`,
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
  }, [creatureId]);

  return {
    creatures,
    activeCreatures,
  };
}
