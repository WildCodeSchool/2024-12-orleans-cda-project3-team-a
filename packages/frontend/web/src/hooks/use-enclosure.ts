import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

export default function useEnclosures() {
  const [creaturesEnclos, setCreaturesEnclos] = useState<Enclosure[]>([]);
  const { zone_id: zoneId } = useParams();

  const fetchCreatures = useCallback(async () => {
    if (zoneId === undefined) {
      return;
    }

    try {
      const response = await fetch(`/api/game/enclosure?zoneId=${zoneId}`);
      const data = await response.json();
      if (data.ok === false) {
        throw new Error('No park');
      }
      setCreaturesEnclos(data.enclosure);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch failed', error);
    }
  }, [zoneId]);

  useEffect(() => {
    void fetchCreatures();
  }, [fetchCreatures]);

  return { creaturesEnclos, refetchCreatures: fetchCreatures };
}
