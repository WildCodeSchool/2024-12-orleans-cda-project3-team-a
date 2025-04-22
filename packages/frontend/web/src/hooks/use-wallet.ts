import { useEffect, useState } from 'react';

import { useNumberFormatter } from './use-number-formatter';

const API_URL = import.meta.env.VITE_API_URL;

export default function useWallet() {
  const [wallet, setWallet] = useState(0);

  //CHANGER ICI L'ID PLUS TARD !!

  useEffect(() => {
    async function fetchWallet() {
      try {
        const response = await fetch(`${API_URL}/game/info-park-user`);
        const data = await response.json();
        // const roundedWallet = data.parkInfo.wallet;
        setWallet(data.parkInfo.wallet);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch failed');
      }
    }

    void fetchWallet();
  }, []);

  const walletFormated = useNumberFormatter(wallet);

  return walletFormated;
}
