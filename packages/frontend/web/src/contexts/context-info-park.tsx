import { createContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import useWallet from '@/hooks/use-wallet';

// Define type for context
type GameInfoContextState = {
  wallet: string;
};

// Define the type for provider
type GameInfoContextProviderProps = PropsWithChildren;

// create the context
export const gameInfoContext = createContext<GameInfoContextState>({
  wallet: '',
});

// create the provider
export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  // get wallet with hook
  const wallet = useWallet();

  // memorize value to avoid unnecessary changes
  const value = useMemo(() => ({ wallet }), [wallet]);

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}
