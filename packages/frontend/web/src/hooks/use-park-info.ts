import { useEffect, useState } from 'react';

import { useNumberFormatter } from './number-formatter';

const API_URL = import.meta.env.VITE_API_URL;

export default function useParkInfo() {
  const [wallet, setWallet] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);

  //CHANGER ICI L'ID PLUS TARD !!

  useEffect(() => {
    async function fetchParkInfo() {
      try {
        const response = await fetch(`${API_URL}/game/info-park-user`);
        const data = await response.json();
        // const roundedWallet = data.parkInfo.wallet;
        setWallet(data.parkInfo.wallet);
        setVisitorsCount(data.visitorsCount);
      } catch (error) {
        console.error('fetch failed');
      }
    }

    void fetchParkInfo();
  }, []);

  const walletFormated = useNumberFormatter(wallet);

  return {
    walletFormated,
    visitorsCount,
  };
}
