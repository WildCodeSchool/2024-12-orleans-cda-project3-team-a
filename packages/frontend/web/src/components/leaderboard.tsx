import type { Rank } from '@app/api';

import BronzeMedal from '../assets/images/icons-buttons/bronze-medal.png';
import GoldMedal from '../assets/images/icons-buttons/gold-medal.png';
import Moons from '../assets/images/icons-buttons/moon.png';
import SilverMedal from '../assets/images/icons-buttons/silver-medal.png';
import Visitor from '../assets/images/icons-buttons/visitors.png';
import useLeaderboard from '../hooks/use-leaderboard';
import BgMenu from './bg-menu';
import CloseWindow from './close-window';

type ModalRank = {
  readonly closeRank: () => void;
};

export default function Rank({ closeRank }: ModalRank) {
  const rank = useLeaderboard();

  if (!rank) {
    return;
  }

  const getMedal = (index: number) => {
    switch (index) {
      case 0:
        return (
          <img
            className='h-5 w-5 md:h-7 md:w-7'
            src={GoldMedal}
            alt='GoldMedal'
          />
        );
      case 1:
        return (
          <img
            className='h-5 w-5 md:h-7 md:w-7'
            src={SilverMedal}
            alt='SilverMedal'
          />
        );
      case 2:
        return (
          <img
            className='h-5 w-5 md:h-7 md:w-7'
            src={BronzeMedal}
            alt='BronzeMedal'
          />
        );
    }
  };

  return (
    <div className='flex items-center overflow-y-auto'>
      <BgMenu>
        <div className='flex flex-row-reverse'>
          <CloseWindow onClick={closeRank} />
        </div>
        <div>
          <ul>
            {rank.map((park: Rank, index: number) => (
              <ul
                className='m-2 grid w-full grid-cols-3 items-center gap-5 rounded bg-white/70 p-3 text-xs md:grid md:grid-cols-5 md:gap-20 md:rounded-md md:text-base'
                key={park.id}
              >
                <li className='flex'>
                  {getMedal(index)}
                  {index > 2 && `${index + 1}. `}
                  {park.park_name}
                </li>

                <li>{park.username}</li>
                <li>
                  {park.active_creatures} {'Créatures'}
                </li>
                <div className='hidden md:flex'>
                  <li>{park.wallet}</li>
                  <img className='w-7' src={Moons} alt='Money' />
                </div>
                <div className='hidden md:flex'>
                  <li>{park.total_visitors}</li>
                  <img className='w-7' src={Visitor} alt='Visitors' />
                </div>
              </ul>
            ))}
          </ul>
        </div>
      </BgMenu>
    </div>
  );
}
