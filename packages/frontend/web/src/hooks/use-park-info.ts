import { useEffect, useState } from 'react';

import { useNumberFormatter } from './use-number-formatter';

const API_URL = import.meta.env.VITE_API_URL;

export default function useParkInfo() {
  const [wallet, setWallet] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);

  useEffect(() => {
    async function fetchParkInfo() {
      try {
        const response = await fetch(`${API_URL}/game/info-park-user`);
        const data = await response.json();
        setWallet(data.parkInfo.wallet);
        setVisitorsCount(data.visitorsCount);
      } catch (error) {
        console.error('fetch failed');
      }
    }

    void fetchParkInfo();
  }, []);

  const walletFormated = useNumberFormatter(wallet);
  const visitorsFormated = useNumberFormatter(visitorsCount);

  return {
    walletFormated,
    visitorsFormated,
  };
}
