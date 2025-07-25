import { useCallback, useEffect, useState } from 'react';

import type { Creatures, InactiveCreatureCount } from '@app/api';

export default function useCreatures(creatureId: number, zoneId: number) {
  const [creatures, setCreatures] = useState<Creatures>([]);
  const [inactiveCreatures, setInactiveCreatures] =
    useState<InactiveCreatureCount>();
  const [potionPrice, setPotionPrice] = useState(0);

  const fetchCreatures = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/game/creature?creature_id=${creatureId}&zoneId=${zoneId}`,
      );
      const data = await response.json();
      setCreatures(data.creatures);
      setInactiveCreatures(data.inactiveCreatures);
      setPotionPrice(data.potion.price);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch creature failed', error);
    }
  }, [creatureId, zoneId]);

  useEffect(() => {
    void fetchCreatures();
  }, [creatureId, fetchCreatures]);

  return {
    creatures,
    inactiveCreatures,
    potionPrice,
    refetchCreature: fetchCreatures,
  };
}
