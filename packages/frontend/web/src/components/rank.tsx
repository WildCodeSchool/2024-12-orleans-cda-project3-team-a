import type { Rank as RankType } from '@app/api';

import useRank from '../hooks/use-rank';

export default function Rank() {
  const rank = useRank();

  if (!rank) {
    return;
  }

  return (
    <ul>
      {rank.map((park: RankType) => (
        <ul key={park.id}>
          <li>{park.username}</li>
          <li>{park.park_name}</li>
          <li>{park.nb_creatures_nourries}</li>
          <li>{park.wallet}</li>
        </ul>
      ))}
    </ul>
  );
}
