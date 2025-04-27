import { useCallback, useEffect, useState } from 'react';

/* eslint-disable no-console */
const API_URL = import.meta.env.VITE_API_URL;

export type BarrierType = {
  decoId: number;
  name: string;
  price: number;
  position: string;
  direction: string;
  parkDecoId: number | null;
};

export default function useFetchBarrier() {
  const [barriers, setBarriers] = useState<BarrierType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBarriers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/game/barrier`);
      const data = await response.json();
      setBarriers(data.barrier);
    } catch (error) {
      console.error('Erreur lors du chargement des barrières :', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBarriers(); // auto-fetch au montage ou lors d'un refresh
  }, [fetchBarriers]); // rafraîchit quand refreshKey change

  return { isLoading, barriers, refetch: fetchBarriers };
}
