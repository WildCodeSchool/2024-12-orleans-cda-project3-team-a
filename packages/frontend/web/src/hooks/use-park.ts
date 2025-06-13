import { useCallback, useEffect, useState } from 'react';

export default function usePark() {
  const [isLoadingPark, setIsLoadingPark] = useState(true);
  const [parkName, setParkName] = useState('');

  const fetchPark = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/park-user`);

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No park');
      }

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

  return {
    isLoadingPark,
    parkName,
    refetchPark: fetchPark,
  };
}
