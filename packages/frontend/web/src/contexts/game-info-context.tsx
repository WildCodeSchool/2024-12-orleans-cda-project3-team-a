import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { Creatures, Decorations, UnlockedZones } from '@app/api';

import useCreatures from '@/hooks/use-creatures-infos';
import useDecoration from '@/hooks/use-decorations';
import useParkInfo from '@/hooks/use-park-info';
import useZonesInfo from '@/hooks/use-zones-info';

type GameInfoContextState = {
  walletFormated: string;
  visitorsFormated: string;
  unlockedZones: UnlockedZones;
  creatures: Creatures;
  decorElements: Decorations;
};

// Define the type for provider
type GameInfoContextProviderProps = PropsWithChildren;

// create the context
export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  visitorsFormated: '',
  unlockedZones: [],
  creatures: [],
  decorElements: [],
});

// create the provider
export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  // get wallet an visitors with useParkInfoHook
  const { walletFormated, visitorsFormated } = useParkInfo();

  // get unlocked zones with useZonesInfo
  const { unlockedZones } = useZonesInfo();

  //get Creatures and decorations
  const { creatures } = useCreatures();
  const { decorElements } = useDecoration();
  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      walletFormated,
      visitorsFormated,
      unlockedZones,
      creatures,
      decorElements,
    }),
    [walletFormated, visitorsFormated, unlockedZones, creatures, decorElements],
  );

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

// Hook created to call him in others components
export const useGameInfoContext = () => useContext(gameInfoContext);
