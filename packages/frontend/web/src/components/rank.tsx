import type { Rank } from '@app/api';

import useRank from '../hooks/use-rank';

export default function Rank() {
  const ranks = useRank() as Rank[] | null;

  return (
    <div>
      {ranks ? (
        <ul>
          {ranks.map((park) => (
            <li key={park.id}>
              {park.park_name}
              {' - Nourries: '}
              {park.nb_creatures_nourries}
              {' - Wallet: '}
              {park.wallet}
            </li>
          ))}
        </ul>
      ) : (
        <p>{'Chargement...'}</p>
      )}
    </div>
  );
}
