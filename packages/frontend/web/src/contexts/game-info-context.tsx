import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import useParkInfo from '@/hooks/use-park-info';

type GameInfoContextState = {
  walletFormated: string;
  visitorsFormated: string;
};

// Define the type for provider
type GameInfoContextProviderProps = PropsWithChildren;

// create the context
export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  visitorsFormated: '',
});

// create the provider
export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  // // get wallet an visitors with useParkInfoHook
  const { walletFormated, visitorsFormated } = useParkInfo();

  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({ walletFormated, visitorsFormated }),
    [walletFormated, visitorsFormated],
  );

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

// Hook created to call him in others components
export const useGameInfoContext = () => useContext(gameInfoContext);
