import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Barrier } from '@app/api';

export default function useFetchBarriers() {
  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //A changer plus tard zoneId !!
  const { zone_id: zoneId } = useParams();

  const fetchBarriers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/game/barriers?zoneId=${zoneId}`, {
      });
      const data = await response.json();
      setBarriers(data.barriers);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading barriers :', error);
    } finally {
      setIsLoading(false);
    }
  }, [zoneId]);

  useEffect(() => {
    void fetchBarriers();
  }, [fetchBarriers]);

  return { isLoading, barriers, refetch: fetchBarriers };
}
