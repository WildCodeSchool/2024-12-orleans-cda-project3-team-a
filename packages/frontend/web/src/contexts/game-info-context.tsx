import { createContext, useCallback, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { UnlockedZones } from '@app/api';

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
  parkName: string;
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
  parkName: '',
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
  } = usePark();

  // get unlocked zones with useZones
  const { unlockedZones, isLoadingZones, refetchZones } = useZones();

  //function to refetch hook necessary for home page
  const fetchAll = useCallback(async () => {
    await Promise.all([refetchPark(), refetchZones()]);
  }, [refetchPark, refetchZones]);

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
      parkName,
    }),
    [
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      isLoadingPark,
      isLoadingZones,
      fetchAll,
      parkName,
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
