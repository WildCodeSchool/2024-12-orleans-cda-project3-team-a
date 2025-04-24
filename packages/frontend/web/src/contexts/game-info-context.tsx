import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import useWallet from '@/hooks/use-wallet';

// Define type for context
type GameInfoContextState = {
  walletFormated: string;
  wallet: number;
};

// Define the type for provider
type GameInfoContextProviderProps = PropsWithChildren;

// create the context
export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  wallet: 0,
});

// create the provider
export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  // get wallet with hook
  const { walletFormated, wallet } = useWallet();

  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({ walletFormated, wallet }),
    [walletFormated, wallet],
  );

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

// Hook created to call him in others components
export const useGameInfoContext = () => useContext(gameInfoContext);
