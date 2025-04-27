import { useEffect, useState } from 'react';

import { useNumberFormatter } from './use-number-formatter';

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
        setWallet(data.parkInfo.wallet);
        setVisitorsCount(data.visitorsCount);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch failed');
      }
    }

    void fetchParkInfo();
  }, []);

  const walletFormated = useNumberFormatter(wallet);
  const visitorsFormated = useNumberFormatter(visitorsCount);

  return {
    wallet,
    walletFormated,
    visitorsFormated,
  };
}
