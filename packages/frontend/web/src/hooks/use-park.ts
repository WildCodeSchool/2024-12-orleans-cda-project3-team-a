import { useCallback, useEffect, useState } from 'react';

import { useNumberFormatter } from './use-number-formatter';

const API_URL = import.meta.env.VITE_API_URL;

export default function usePark() {
  const [wallet, setWallet] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [isLoadingPark, setIsLoadingPark] = useState(true);

  const fetchPark = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/park-user`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No park');
      }

      setWallet(data.park.wallet);
      setVisitorsCount(data.visitorsCount);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetchPark failed');
    } finally {
      setIsLoadingPark(false);
    }
  }, []);

  useEffect(() => {
    void fetchPark();
  }, [fetchPark]);

  const walletFormated = useNumberFormatter(wallet);
  const visitorsFormated = useNumberFormatter(visitorsCount);

  return {
    wallet,
    walletFormated,
    visitorsFormated,
    isLoadingPark,
    refetchPark: fetchPark,
  };
}
