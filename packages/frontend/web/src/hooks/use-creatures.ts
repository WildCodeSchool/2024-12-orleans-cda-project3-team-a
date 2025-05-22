import { useCallback, useEffect, useState } from 'react';

import type { ActiveCreatureCount, Creatures } from '@app/api';

export default function useCreatures(creatureId: number) {
  const [creatures, setCreatures] = useState<Creatures>([]);

  const [inactiveCreatures, setInactiveCreatures] =
    useState<ActiveCreatureCount>([]);

  const fetchCreatures = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/game/creature?creature_id=${creatureId}`,
        {
          credentials: 'include',
        },
      );
      const data = await response.json();
      setCreatures(data.creatures);
      setInactiveCreatures(data.activeCreatures);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch creature failed', error);
    }
  }, [creatureId]);

  useEffect(() => {
    void fetchCreatures();
  }, [creatureId, fetchCreatures]);

  return {
    creatures,
    inactiveCreatures,
    refetchCreature: fetchCreatures,
  };
}
