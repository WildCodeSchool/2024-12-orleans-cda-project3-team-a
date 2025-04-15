import { useEffect, useState } from 'react';

export default function MyWallet() {
  const [wallet, setWallet] = useState('');

  useEffect(() => {
    async function afficherWallet() {
      try {
        const reponse = await fetch(
          'http://192.168.0.54:3333/api/game/wallet?userId=2',
        );
        const data = await reponse.json();
        // console.log(data);
        // console.log(data.park.wallet);
        setWallet(data.park.wallet);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des infos du park de l'utilisateur",
          error,
        );
      }
    }

    void afficherWallet();
  }, []);

  return <p>{wallet}</p>;
}
