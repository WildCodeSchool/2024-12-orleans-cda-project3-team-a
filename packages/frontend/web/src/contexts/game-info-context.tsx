import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import useCreature from '@/hooks/creature';
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
  const { creatures } = useCreature();
  // memorize value to avoid unnecessary changes
  const value = useMemo(() => ({ wallet, creatures }), [wallet, creatures]);

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

// Hook created to call him in others components
export const useGameInfoContext = () => useContext(gameInfoContext);
