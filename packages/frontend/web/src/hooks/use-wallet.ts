import { useCallback, useEffect, useState } from 'react';

export default function useWallet() {
  const [wallet, setWallet] = useState(0);

  const fetchWallet = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/wallet`);

      const data = (await response.json()) as {
        ok: boolean;
        park: {
          wallet: number;
        };
      };

      if (!data.ok) {
        throw new Error('No park');
      }

      const wallet = data.park.wallet;
      setWallet(wallet);
      return wallet;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch for wallet failed');
      return;
    }
  }, []);

  useEffect(() => {
    void fetchWallet();
  }, [fetchWallet]);

  return {
    wallet,
    refetchWallet: fetchWallet,
  };
}
