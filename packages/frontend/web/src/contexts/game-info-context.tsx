import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { Decorations, Enclos, UnlockedZones } from '@app/api';

import useDecorations from '@/hooks/use-decorations';
import useEnclos from '@/hooks/use-enclos';
import useParkInfo from '@/hooks/use-park-info';
import useZonesInfo from '@/hooks/use-zones-info';

type GameInfoContextState = {
  walletFormated: string;
  wallet: number;
  visitorsFormated: string;
  unlockedZones: UnlockedZones;
  creaturesEnclos: Enclos;
  decorElements: Decorations;
};

// Define the type for provider
type GameInfoContextProviderProps = PropsWithChildren;

// create the context
export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  wallet: 0,
  visitorsFormated: '',
  unlockedZones: [],
  creaturesEnclos: [],
  decorElements: [],
});

// create the provider
export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  // get wallet and visitors with hook
  const { walletFormated, visitorsFormated, wallet } = useParkInfo();

  // get unlocked zones with useZonesInfo
  const { unlockedZones } = useZonesInfo();

  //get Creatures and decorations
  const { creaturesEnclos } = useEnclos();
  const { decorElements } = useDecorations();
  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      creaturesEnclos,
      decorElements,
    }),
    [
      walletFormated,
      visitorsFormated,
      unlockedZones,
      creaturesEnclos,
      decorElements,
      wallet,
    ],
  );

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

// Hook created to call him in others components
export const useGameInfoContext = () => useContext(gameInfoContext);
