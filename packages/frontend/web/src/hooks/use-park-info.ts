import { useCallback, useEffect, useState } from 'react';

import { useNumberFormatter } from './use-number-formatter';

const API_URL = import.meta.env.VITE_API_URL;

export default function useParkInfo() {
  const [wallet, setWallet] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [isLoadingPark, setIsLoadingPark] = useState(true);

  const fetchParkInfo = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/game/info-park-user`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No parkInfo');
      }

      setWallet(data.parkInfo.wallet);
      setVisitorsCount(data.visitorsCount);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetchParkInfo failed');
    } finally {
      setIsLoadingPark(false);
    }
  }, []);

  useEffect(() => {
    void fetchParkInfo();
  }, [fetchParkInfo]);

  const walletFormated = useNumberFormatter(wallet);
  const visitorsFormated = useNumberFormatter(visitorsCount);

  return {
    wallet,
    walletFormated,
    visitorsFormated,
    isLoadingPark,
    refetchParkInfo: fetchParkInfo,
  };
}
