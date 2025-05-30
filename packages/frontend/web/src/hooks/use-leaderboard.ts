import { useEffect, useState } from 'react';

import type { Rank } from '@app/api';

export default function useRank() {
  const [rank, setRank] = useState<Rank[] | null>(null);

  useEffect(() => {
    async function fetchRank() {
      try {
        const response = await fetch(`/api/game/leaderboard`, {});
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
