import { useEffect, useState } from 'react';

import type { ActiveCreatureCount, Creatures } from '@app/api';

export default function useCreatures() {
  const [creatures, setCreatures] = useState<Creatures>([]);
  const [activeCreatures, setActiveCreatures] = useState<ActiveCreatureCount>(
    [],
  );

  const creatureId = 6;

  const fetchCreatures = async () => {
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
  };

  useEffect(() => {
    void fetchCreatures();
  }, []);

  return {
    creatures,
    activeCreatures,
    refetch: fetchCreatures,
  };
}
