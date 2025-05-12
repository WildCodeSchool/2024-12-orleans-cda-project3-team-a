import { createContext, useCallback, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { UnlockedZones } from '@app/api';

import useParkInfo from '@/hooks/use-park-info';
import useZonesInfo from '@/hooks/use-zones-info';

type GameInfoContextState = {
  walletFormated: string;
  wallet: number;
  visitorsFormated: string;
  unlockedZones: UnlockedZones;
  isLoadingPark: boolean;
  isLoadingZones: boolean;
  fetchAll: () => Promise<void>;
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
    refetchParkInfo,
  } = useParkInfo();

  // get unlocked zones with useZonesInfo
  const { unlockedZones, isLoadingZones, refetchZonesInfo } = useZonesInfo();

  //function to refetch hook necessary for home page
  const fetchAll = useCallback(async () => {
    await Promise.all([refetchParkInfo(), refetchZonesInfo()]);
  }, [refetchParkInfo, refetchZonesInfo]);

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
    }),
    [
      walletFormated,
      visitorsFormated,
      unlockedZones,
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
