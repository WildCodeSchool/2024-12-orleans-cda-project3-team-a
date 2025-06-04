import { useCallback, useEffect, useState } from 'react';

import { formatNumber } from '@/utils/number-formatter';

export default function usePark() {
  const [wallet, setWallet] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [isLoadingPark, setIsLoadingPark] = useState(true);
  const [parkName, setParkName] = useState('');
  const [userName, setUserName] = useState('');
  const [userAvatarId, setUserAvatarId] = useState(0);
  const [userAvatar, setUserAvatar] = useState('');

  const fetchPark = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/park-user`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No park');
      }

      setWallet(data.park.wallet);
      setVisitorsCount(data.visitorsCount);
      setParkName(data.park.park_name);
      setUserName(data.userCredentials.username);
      setUserAvatarId(data.userCredentials.id);
      setUserAvatar(data.userCredentials.src_image);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetchPark failed');
    } finally {
      setIsLoadingPark(false);
    }
  }, []);

  useEffect(() => {
    void fetchPark();
  }, [fetchPark]);

  const walletFormated = formatNumber(wallet);
  const visitorsFormated = formatNumber(visitorsCount);

  return {
    wallet,
    walletFormated,
    visitorsFormated,
    isLoadingPark,
    parkName,
    userName,
    userAvatarId,
    userAvatar,
    refetchPark: fetchPark,
  };
}
