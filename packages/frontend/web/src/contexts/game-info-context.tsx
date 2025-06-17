import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';

import type { Decorations, Enclosure, UnlockedZones } from '@app/api';

import useCreaturesMenu from '@/hooks/use-creatures-menu';
import useDecorations from '@/hooks/use-decorations';
import useEnclos from '@/hooks/use-enclosure';
import usePark from '@/hooks/use-park';
import useVisitors from '@/hooks/use-visitors';
import useWallet from '@/hooks/use-wallet';
import useZones from '@/hooks/use-zones';
import { formatNumber } from '@/utils/number-formatter';

type GameInfoContextState = {
  wallet: number;
  unlockedZones: UnlockedZones;
  isLoadingPark: boolean;
  isLoadingZones: boolean;
  creaturesEnclos: Enclosure[];
  decorations: Decorations;
  parkName: string;
  countVisitorActiveFormated: string;
  refetchPark: () => Promise<void>;
  refetchZones: () => Promise<void>;
  refetchCreatures: () => Promise<void>;
  refetchVisitors: () => Promise<void>;
  refetchDecorations: () => Promise<void>;
  refetchWallet: () => Promise<number | undefined>;
  isWalletUpdated: boolean;
  profitWallet: number;
  creaturesMenu: Enclosure[];
  refetchCreaturesMenu: () => Promise<void>;
};

type GameInfoContextProviderProps = PropsWithChildren;

export const gameInfoContext = createContext<GameInfoContextState>({
  wallet: 0,
  unlockedZones: [],
  isLoadingPark: true,
  isLoadingZones: true,
  creaturesEnclos: [],
  decorations: [],
  parkName: '',
  countVisitorActiveFormated: '',
  refetchPark: () => Promise.resolve(),
  refetchZones: () => Promise.resolve(),
  refetchCreatures: () => Promise.resolve(),
  refetchVisitors: () => Promise.resolve(),
  refetchDecorations: () => Promise.resolve(),
  refetchWallet: () => Promise.resolve(0),
  isWalletUpdated: false,
  profitWallet: 0,
  creaturesMenu: [],
  refetchCreaturesMenu: () => Promise.resolve(),
});

export function GameInfoContextProvider({
  children,
}: GameInfoContextProviderProps) {
  const { isLoadingPark, refetchPark, parkName } = usePark();

  const { wallet, refetchWallet } = useWallet();

  const { unlockedZones, isLoadingZones, refetchZones } = useZones();
  const { creaturesEnclos, refetchCreatures } = useEnclos();
  const { decorations, refetchDecorations } = useDecorations();
  const { visitorsPark, refetchVisitors } = useVisitors();

  const { creaturesMenu, refetchCreaturesMenu } = useCreaturesMenu();

  const countVisitorActive = visitorsPark.filter(
    (visitorPark) => new Date(visitorPark.exit_time).getTime() > Date.now(),
  ).length;
  const countVisitorActiveFormated = formatNumber(countVisitorActive) ?? '0';

  const [isWalletUpdated, setIsWalletUpdated] = useState(false);
  const [profitWallet, setProfitWallet] = useState(0);

  // memorize value to avoid unnecessary changes
  const value = useMemo(
    () => ({
      unlockedZones,
      wallet,
      refetchWallet,
      isLoadingPark,
      isLoadingZones,
      creaturesEnclos,
      decorations,
      parkName,
      countVisitorActiveFormated,
      refetchPark,
      refetchZones,
      refetchCreatures,
      refetchVisitors,
      refetchDecorations,
      isWalletUpdated,
      profitWallet,
      creaturesMenu,
      refetchCreaturesMenu,
    }),
    [
      unlockedZones,
      wallet,
      refetchWallet,
      isLoadingPark,
      isLoadingZones,
      creaturesEnclos,
      decorations,
      parkName,
      countVisitorActiveFormated,
      refetchPark,
      refetchZones,
      refetchCreatures,
      refetchVisitors,
      refetchDecorations,
      isWalletUpdated,
      profitWallet,
      creaturesMenu,
      refetchCreaturesMenu,
    ],
  );

  const previousWalletRef = useRef(wallet);

  //Set interval to update the wallet each 5 seconds and recover the gain to display it
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const previousWallet = previousWalletRef.current;

      const newWallet = await refetchWallet();
      if (newWallet === undefined) return;

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
  }, [refetchWallet]);

  return (
    <gameInfoContext.Provider value={value}>
      {children}
    </gameInfoContext.Provider>
  );
}

export const useGameInfoContext = () => useContext(gameInfoContext);
