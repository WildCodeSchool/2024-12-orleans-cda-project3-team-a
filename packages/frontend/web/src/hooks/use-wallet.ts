import { useEffect, useState } from 'react';

import { useNumberFormatter } from './number-formatter';

const API_URL = import.meta.env.VITE_API_URL;

export default function useWallet() {
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    async function fetchWallet() {
      try {
        const response = await fetch(`${API_URL}/game/info-park-user`);
        const data = await response.json();
        setWallet(data.parkInfo.wallet);
      } catch (error) {
        console.error('fetch failed');
      }
    }

    void fetchWallet();
  }, []);

  const walletFormated = useNumberFormatter(wallet);

  return walletFormated;
}
