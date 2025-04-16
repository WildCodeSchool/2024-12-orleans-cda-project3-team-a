import { useEffect, useState } from 'react';

import { numberFormatter } from './number-formatter';

const API_URL = import.meta.env.VITE_API_URL;

export default function useWallet() {
  const [wallet, setWallet] = useState('');

  //CHANGER ICI L'ID PLUS TARD !!

  useEffect(() => {
    async function fetchWallet() {
      try {
        const response = await fetch(`${API_URL}/game/info-park-user`);
        const data = await response.json();
        const roundedWallet = numberFormatter(data.parkInfo.wallet);
        setWallet(roundedWallet);
      } catch (error) {
        console.error('fetch failed');
      }
    }

    void fetchWallet();
  }, []);

  return wallet;
}
