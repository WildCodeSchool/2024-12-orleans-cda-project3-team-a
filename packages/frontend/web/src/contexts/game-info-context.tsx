import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import type { PropsWithChildren } from 'react';

import type { Decorations, Enclosure, UnlockedZones } from '@app/api';

import useDecorations from '@/hooks/use-decorations';
import useEnclos from '@/hooks/use-enclosure';
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
  creaturesEnclos: Enclosure[];
  decorations: Decorations;
  parkName: string;
  countVisitorActiveFormated: string;
  parkRefetch: () => Promise<void>;
  zonesRefetch: () => Promise<void>;
  creaturesRefetch: () => Promise<void>;
  visitorsRefetch: () => Promise<void>;
  decorationsRefetch: () => Promise<void>;
};

type GameInfoContextProviderProps = PropsWithChildren;

export const gameInfoContext = createContext<GameInfoContextState>({
  walletFormated: '',
  wallet: 0,
  visitorsFormated: '',
  unlockedZones: [],
  isLoadingPark: true,
  isLoadingZones: true,
  creaturesEnclos: [],
  decorations: [],
  parkName: '',
  countVisitorActiveFormated: '',
  parkRefetch: () => Promise.resolve(),
  zonesRefetch: () => Promise.resolve(),
  creaturesRefetch: () => Promise.resolve(),
  visitorsRefetch: () => Promise.resolve(),
  decorationsRefetch: () => Promise.resolve(),
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

  const countVisitorActive = visitorsPark.filter(
    (visitorPark) => new Date(visitorPark.exit_time).getTime() > Date.now(),
  ).length;
  const countVisitorActiveFormated = formatNumber(countVisitorActive);

  const parkRefetch = useCallback(() => refetchPark(), [refetchPark]);
  const zonesRefetch = useCallback(() => refetchZones(), [refetchZones]);
  const creaturesRefetch = useCallback(
    () => refetchCreatures(),
    [refetchCreatures],
  );
  const visitorsRefetch = useCallback(
    () => refetchVisitors(),
    [refetchVisitors],
  );
  const decorationsRefetch = useCallback(
    () => refetchDecorations(),
    [refetchDecorations],
  );

  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      isLoadingPark,
      isLoadingZones,
      creaturesEnclos,
      decorations,
      parkName,
      countVisitorActiveFormated,
      parkRefetch,
      zonesRefetch,
      creaturesRefetch,
      visitorsRefetch,
      decorationsRefetch,
    }),
    [
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      isLoadingPark,
      isLoadingZones,
      creaturesEnclos,
      decorations,
      parkName,
      countVisitorActiveFormated,
      parkRefetch,
      zonesRefetch,
      creaturesRefetch,
      visitorsRefetch,
      decorationsRefetch,
    ],
  );

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await parkRefetch();
    }, 20000);

    return () => {
      clearInterval(intervalId);
    };
  }, [parkRefetch]);

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

export const useGameInfoContext = () => useContext(gameInfoContext);
