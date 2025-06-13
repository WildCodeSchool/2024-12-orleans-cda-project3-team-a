import { useCallback, useEffect, useState } from 'react';

import { formatNumber } from '@/utils/number-formatter';

export default function useWallet() {
  const [wallet, setWallet] = useState(0);

  const fetchWallet = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/wallet`);

      const data = (await response.json()) as {
        ok: boolean;
        park: {
          wallet: number | null;
        };
      };

      if (!data.ok || data.park.wallet === null) {
        throw new Error('No park');
      }

      const wallet = data.park.wallet;
      setWallet(wallet);
      return wallet;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch for wallet failed');
      return null;
    }
  }, []);

  useEffect(() => {
    void fetchWallet();
  }, [fetchWallet]);

  const walletFormated = formatNumber(wallet);

  return {
    wallet,
    walletFormated,
    refetchWallet: fetchWallet,
  };
}
