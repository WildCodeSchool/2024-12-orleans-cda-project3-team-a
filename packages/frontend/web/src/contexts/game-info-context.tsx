import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';

import type { Decorations, Enclosure, UnlockedZones } from '@app/api';

import useDecorations from '@/hooks/use-decorations';
import useEnclos from '@/hooks/use-enclosure';
import usePark from '@/hooks/use-park';
import useVisitors from '@/hooks/use-visitors';
import useWallet from '@/hooks/use-wallet';
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
  isWalletUpdated: boolean;
  profitWallet: number;
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
  isWalletUpdated: false,
  profitWallet: 0,
});

export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  const { visitorsFormated, isLoadingPark, refetchPark, parkName } = usePark();

  const { walletFormated, wallet, refetchWallet } = useWallet();

  const { unlockedZones, isLoadingZones, refetchZones } = useZones();
  const { creaturesEnclos, refetchCreatures } = useEnclos();
  const { decorations, refetchDecorations } = useDecorations();
  const { visitorsPark, refetchVisitors } = useVisitors();

  const countVisitorActive = visitorsPark.filter(
    (visitorPark) => new Date(visitorPark.exit_time).getTime() > Date.now(),
  ).length;
  const countVisitorActiveFormated = formatNumber(countVisitorActive);

  const walletRefetch = useCallback(() => refetchWallet(), [refetchWallet]);
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

  const [isWalletUpdated, setIsWalletUpdated] = useState(false);
  const [profitWallet, setProfitWallet] = useState(0);

  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      walletRefetch,
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
      isWalletUpdated,
      profitWallet,
    }),
    [
      walletFormated,
      visitorsFormated,
      unlockedZones,
      wallet,
      walletRefetch,
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
      isWalletUpdated,
      profitWallet,
    ],
  );

  const previousWalletRef = useRef(wallet);

  //Set interval to update the wallet each 5 seconds and recover the gain to display it
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const previousWallet = previousWalletRef.current;

      const newWallet = await walletRefetch();
      if (newWallet === null) return;

      if (newWallet > previousWallet) {
        setProfitWallet(newWallet - previousWallet);
        setIsWalletUpdated(true);
      } else {
        setProfitWallet(0);
        setIsWalletUpdated(false);
      }

      previousWalletRef.current = newWallet;
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [walletRefetch]);

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

export const useGameInfoContext = () => useContext(gameInfoContext);
