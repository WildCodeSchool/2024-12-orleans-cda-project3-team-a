import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { UnlockedZones } from '@app/api';

import useParkInfo from '@/hooks/use-park-info';
import useZonesInfo from '@/hooks/use-zones-info';

type GameInfoContextState = {
  walletFormated: string;
  visitorsFormated: string;
  unlockedZones: UnlockedZones;
};

// Define the type for provider
type GameInfoContextProviderProps = PropsWithChildren;

// create the context
export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  visitorsFormated: '',
  unlockedZones: [],
});

// create the provider
export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  // get wallet an visitors with useParkInfoHook
  const { walletFormated, visitorsFormated } = useParkInfo();

  // get unlocked zones with useZonesInfo
  const { unlockedZones } = useZonesInfo();

  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      walletFormated,
      visitorsFormated,
      unlockedZones,
    }),
    [walletFormated, visitorsFormated, unlockedZones],
  );

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

// Hook created to call him in others components
export const useGameInfoContext = () => useContext(gameInfoContext);
