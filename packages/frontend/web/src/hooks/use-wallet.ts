import numeral from 'numeral';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function useWallet() {
  const [wallet, setWallet] = useState('');

  //CHANGER ICI L'ID PLUS TARD !!

  useEffect(() => {
    async function fetchWallet() {
      try {
        const reponse = await fetch(`${API_URL}/game/info-park-user?userId=1`);
        const data = await reponse.json();
        const roundedWallet = numeral(data.parkInfo.wallet)
          .format('0,0a')
          .toUpperCase();
        setWallet(roundedWallet);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des infos du park de l'utilisateur",
          error,
        );
      }
    }

    void fetchWallet();
  }, []);

  return wallet;
}
