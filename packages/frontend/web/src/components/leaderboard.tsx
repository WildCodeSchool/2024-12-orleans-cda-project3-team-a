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
    <div className='relative mb-[8%] overflow-y-auto'>
      <BgMenu>
        <div>
          <h1 className='font-aerokids text-outline-white mb-5 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-4xl text-transparent md:text-6xl'>
            {'R anking'}
          </h1>
        </div>
        <div className='absolute top-5 left-[95%]'>
          <CloseWindow onClick={closeRank} />
        </div>
        <div>
          <ul>
            {rank.map((park: Rank, index: number) => (
              <ul
                className='m-2 grid w-full grid-cols-3 gap-5 rounded bg-white/70 p-2.5 text-xs text-nowrap md:grid md:grid-cols-5 md:gap-20 md:rounded-md md:text-base'
                key={park.id}
              >
                <li className='flex min-w-[10%]'>
                  {getMedal(index)}
                  {index > 2 && `${index + 1}. `}
                  {park.park_name.length > 15
                    ? park.park_name.slice(0, 10) + '...'
                    : park.username}

                  {/* {rank.park_name. */}
                </li>
                <li>{park.username}</li>
                <li>
                  {park.active_creatures} {'Créatures'}
                </li>
                <div className='hidden items-center md:flex'>
                  <li>{park.wallet}</li>
                  <img className='max-h-5 max-w-5' src={Moons} alt='Money' />
                </div>
                <div className='hidden md:flex'>
                  <li>{park.total_visitors}</li>
                  <img
                    className='max-h-7 max-w-7'
                    src={Visitor}
                    alt='Visitors'
                  />
                </div>
              </ul>
            ))}
          </ul>
        </div>
      </BgMenu>
    </div>
  );
}
// <h1 className='font-aerokids text-outline-white mb-10 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-4xl text-transparent md:text-6xl'>{'ranking'}</h1>
