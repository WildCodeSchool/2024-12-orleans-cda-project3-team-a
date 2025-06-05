import { createContext, useCallback, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { Decorations, Enclosure, UnlockedZones, User } from '@app/api';

import useDecorations from '@/hooks/use-decorations';
import useEnclos from '@/hooks/use-enclos';
import useUser from '@/hooks/use-me';
import usePark from '@/hooks/use-park';
import useVisitors from '@/hooks/use-visitors';
import useZones from '@/hooks/use-zones';
import { formatNumber } from '@/utils/number-formatter';

type GameInfoContextState = {
  walletFormated: string;
  wallet: number;
  visitorsFormated: string;
  unlockedZones: UnlockedZones;
  isLoadingPark: boolean;
  isLoadingZones: boolean;
  isLoadingUser: boolean;
  fetchAll: () => Promise<void>;
  creaturesEnclos: Enclosure[];
  decorations: Decorations;
  parkName: string;
  countVisitorActiveFormated: string;
  user: User | null;
};

type GameInfoContextProviderProps = PropsWithChildren;

export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  wallet: 0,
  visitorsFormated: '',
  unlockedZones: [],
  isLoadingPark: true,
  isLoadingZones: true,
  isLoadingUser: true,
  fetchAll: () => Promise.resolve(),
  creaturesEnclos: [],
  decorations: [],
  parkName: '',
  countVisitorActiveFormated: '',
  user: null,
});

export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  const {
    walletFormated,
    visitorsFormated,
    wallet,
    isLoadingPark,
    refetchPark,
    parkName,
  } = usePark();

  const { unlockedZones, isLoadingZones, refetchZones } = useZones();
  const { creaturesEnclos, refetchCreatures } = useEnclos();
  const { decorations, refetchDecorations } = useDecorations();
  const { visitorsPark, refetchVisitors } = useVisitors();
  const { user, isLoading: isLoadingUser, refetchUser } = useUser();

  const countVisitorActive = visitorsPark.filter(
    (visitorPark) => new Date(visitorPark.exit_time).getTime() > Date.now(),
  ).length;
  const countVisitorActiveFormated = formatNumber(countVisitorActive);

  const fetchAll = useCallback(async () => {
    await Promise.all([
      refetchPark(),
      refetchZones(),
      refetchCreatures(),
      refetchVisitors(),
      refetchDecorations(),
      refetchUser(),
    ]);
  }, [
    refetchPark,
    refetchZones,
    refetchCreatures,
    refetchVisitors,
    refetchDecorations,
    refetchUser,
  ]);

  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      isLoadingPark,
      isLoadingZones,
      isLoadingUser,
      fetchAll,
      creaturesEnclos,
      decorations,
      parkName,
      countVisitorActiveFormated,
      user,
    }),
    [
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      isLoadingPark,
      isLoadingZones,
      isLoadingUser,
      fetchAll,
      creaturesEnclos,
      decorations,
      parkName,
      countVisitorActiveFormated,
      user,
    ],
  );

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

export const useGameInfoContext = () => useContext(gameInfoContext);
