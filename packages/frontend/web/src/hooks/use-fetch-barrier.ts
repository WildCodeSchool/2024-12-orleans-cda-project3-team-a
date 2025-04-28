import { useCallback, useEffect, useState } from 'react';

import type { Barrier } from '@app/api/src/game/get.barriers-route';

const API_URL = import.meta.env.VITE_API_URL;

export default function useFetchBarrier() {
  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBarriers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/game/barriers`, {
        // credentials: 'include',
      });
      const data = await response.json();
      setBarriers(data.barriers);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur during loading barriers :', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBarriers();
  }, [fetchBarriers]);

  return { isLoading, barriers, refetch: fetchBarriers };
}
