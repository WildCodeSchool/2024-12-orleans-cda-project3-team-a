import { useCallback, useEffect, useState } from 'react';

import type { Enclosure } from '@app/api';

export default function useEnclosures() {
  const [creaturesEnclos, setCreaturesEnclos] = useState<Enclosure[]>([]);

  const fetchCreatures = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/enclos`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.ok === false) {
        throw new Error('No park');
      }
      setCreaturesEnclos(data.enclosure);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch failed', error);
    }
  }, []);

  useEffect(() => {
    void fetchCreatures();
  }, [fetchCreatures]);

  return { creaturesEnclos, refetchCreatures: fetchCreatures };
}
