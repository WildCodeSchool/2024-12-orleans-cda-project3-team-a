import numeral from 'numeral';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function useWallet() {
  const [wallet, setWallet] = useState('');

  //CHANGER ICI L'ID PLUS TARD !!

  useEffect(() => {
    async function fetchWallet() {
      try {
        const response = await fetch(`${API_URL}/game/info-park-user?userId=1`);
        const data = await response.json();
        const roundedWallet = numeral(data.parkInfo.wallet)
          .format('0,0a')
          .toUpperCase();
        setWallet(roundedWallet);
      } catch (error) {
        console.error('fetch failed');
      }
    }

    void fetchWallet();
  }, []);

  return wallet;
}
