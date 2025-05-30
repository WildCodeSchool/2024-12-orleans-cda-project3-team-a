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
  parkName: string;
  userName: string;
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
  parkName: '',
  userName: '',
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
    parkName,
    userName,
  } = usePark();

  // get unlocked zones with useZones
  const { unlockedZones, isLoadingZones, refetchZones } = useZones();

  //get Creatures and decorations
  const { creaturesEnclos, refetchCreatures } = useEnclos();
  const { decorations } = useDecorations();

  //function to refetch hook necessary for home page
  const fetchAll = useCallback(async () => {
    await Promise.all([refetchPark(), refetchZones(), refetchCreatures()]);
  }, [refetchPark, refetchZones, refetchCreatures]);

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
      parkName,
      userName,
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
      parkName,
      userName,
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
