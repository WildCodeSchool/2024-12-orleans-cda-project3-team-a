import type { Rank as RankType } from '@app/api';

import Moons from '../assets/images/icons-buttons/moon.png';
import Visitor from '../assets/images/icons-buttons/visitors.png';
import useRank from '../hooks/use-rank';
import BgMenu from './bg-menu';
import CloseWindow from './close-window';

type ModalRank = {
  readonly closeRank: () => void;
};

export default function Rank({ closeRank }: ModalRank) {
  const rank = useRank();

  if (!rank) {
    return;
  }

  return (
    <div className='flex w-[90%] items-center justify-center overflow-y-auto'>
      <BgMenu>
        <div>
          <CloseWindow onClick={closeRank} />
        </div>
        <div>
          <ul className=''>
            {rank.map((park: RankType) => (
              <ul
                className='m-3 grid grid-cols-5 gap-20 bg-white/70 p-3'
                key={park.id}
              >
                <li className=''>{park.username}</li>
                <li>{park.park_name}</li>
                <li>{park.nb_creatures_nourries}</li>
                <div className='flex'>
                  <li>{park.wallet}</li>
                  <img className='w-7' src={Moons} alt='' />
                </div>
                <div className='flex'>
                  <li>{park.nb_visiteurs}</li>
                  <img className='w-7' src={Visitor} alt='' />
                </div>
              </ul>
            ))}
          </ul>
        </div>
      </BgMenu>
    </div>
  );
}
