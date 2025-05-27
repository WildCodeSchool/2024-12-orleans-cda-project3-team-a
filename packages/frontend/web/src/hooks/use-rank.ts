import { useEffect, useState } from 'react';

export default function useRank() {
  const [rank, setRank] = useState(null);

  useEffect(() => {
    async function fetchRank() {
      try {
        const response = await fetch(`/api/game/rank`, {
          credentials: 'include',
        });
        const data = await response.json();
        setRank(data.rank);
      } catch (error) {
        console.error('fetch failed', error);
      }
    }

    void fetchRank();
  }, []);

  return rank;
}
