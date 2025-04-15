import { createContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import useWallet from '@/hooks/use-wallet';

// Define type for context
type GameInfoContextType = {
  wallet: string;
};

// create the context
export const gameInfoContext = createContext<GameInfoContextType | null>(null);

// create the provider
export const GameInfoContextProvider = ({ children }: PropsWithChildren) => {
  const wallet = useWallet(); // Récupérer le wallet via le hook

  // memorize value to avoid unnecessary changes
  const value = useMemo(() => ({ wallet }), [wallet]);

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
};
