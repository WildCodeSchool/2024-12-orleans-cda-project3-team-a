import { useCallback, useEffect, useState } from 'react';

import { formatNumber } from '@/utils/number-formatter';

export default function usePark() {
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [isLoadingPark, setIsLoadingPark] = useState(true);
  const [parkName, setParkName] = useState('');

  const fetchPark = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/park-user`);

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No park');
      }

      setVisitorsCount(data.visitorsCount);
      setParkName(data.park.park_name);

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

  const visitorsFormated = formatNumber(visitorsCount);

  return {
    visitorsFormated,
    isLoadingPark,
    parkName,
    refetchPark: fetchPark,
  };
}
