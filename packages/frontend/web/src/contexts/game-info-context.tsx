import { createContext, useCallback, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { Decorations, Enclosure, UnlockedZones } from '@app/api';

import useDecorations from '@/hooks/use-decorations';
import useEnclos from '@/hooks/use-enclos';
import usePark from '@/hooks/use-park';
import useZones from '@/hooks/use-zones';

type GameInfoContextState = {
  walletFormated: string;
  wallet: number;
  visitorsFormated: string;
  unlockedZones: UnlockedZones;
  isLoadingPark: boolean;
  isLoadingZones: boolean;
  fetchAll: () => Promise<void>;
  creaturesEnclos: Enclosure[];
  decorations: Decorations;
};

// Define the type for provider
type GameInfoContextProviderProps = PropsWithChildren;

// create the context
export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  wallet: 0,
  visitorsFormated: '',
  unlockedZones: [],
  isLoadingPark: true,
  isLoadingZones: true,
  fetchAll: () => Promise.resolve(),
  creaturesEnclos: [],
  decorations: [],
});

// create the provider
export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  // get wallet and visitors with hook
  const {
    walletFormated,
    visitorsFormated,
    wallet,
    isLoadingPark,
    refetchPark,
  } = usePark();

  // get unlocked zones with useZones
  const { unlockedZones, isLoadingZones, refetchZones } = useZones();

  //function to refetch hook necessary for home page
  const fetchAll = useCallback(async () => {
    await Promise.all([refetchPark(), refetchZones()]);
  }, [refetchPark, refetchZones]);

  //get Creatures and decorations
  const { creaturesEnclos } = useEnclos();
  const { decorations } = useDecorations();
  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      isLoadingPark,
      isLoadingZones,
      fetchAll,
      creaturesEnclos,
      decorations,
    }),
    [
      walletFormated,
      visitorsFormated,
      unlockedZones,
      creaturesEnclos,
      decorations,
      wallet,
      isLoadingPark,
      isLoadingZones,
      fetchAll,
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
