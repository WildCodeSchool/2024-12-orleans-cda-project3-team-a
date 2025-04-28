import { useCallback, useEffect, useState } from 'react';

import type { BarrierType } from '@app/api';

/* eslint-disable no-console */
const API_URL = import.meta.env.VITE_API_URL;

export default function useFetchBarrier() {
  const [barriers, setBarriers] = useState<BarrierType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBarriers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/game/barrier`);
      const data = await response.json();
      setBarriers(data.barrierResult);
    } catch (error) {
      console.error('Erreur lors du chargement des barrières :', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBarriers();
  }, [fetchBarriers]);

  return { isLoading, barriers, refetch: fetchBarriers };
}
