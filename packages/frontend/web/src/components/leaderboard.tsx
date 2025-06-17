import type { Rank } from '@app/api';

import { formatNumber } from '@/utils/number-formatter';

import BronzeMedal from '../assets/images/icons-buttons/bronze-medal.png';
import GoldMedal from '../assets/images/icons-buttons/gold-medal.png';
import Moons from '../assets/images/icons-buttons/moon.png';
import profileIcon from '../assets/images/icons-buttons/profile.png';
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
    <div className='relative mb-[20%] overflow-y-auto md:mb-20'>
      <BgMenu>
        <div className='flex flex-row-reverse'>
          <CloseWindow onClick={closeRank} />
        </div>
        <div>
          <h1 className='font-aerokids text-outline-white mb-5 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-4xl text-transparent md:text-6xl'>
            {'Leaderboard'}
          </h1>
        </div>
        <div>
          <div className='flex justify-between p-2 text-xs md:w-full md:text-base'>
            <p>{'Park name'}</p>
            <p>{'Username'}</p>
            <p>{'Active Creatures'}</p>
            <p className='hidden md:block'>{'Wallet'}</p>
            <p className='hidden md:block'>{'Active Visitors'}</p>
          </div>
          <ul className='flex flex-col gap-5'>
            {rank.map((park: Rank, index: number) => (
              <ul
                className='flex w-full justify-between gap-5 rounded bg-white/70 p-2 text-xs text-nowrap md:grid md:grid-cols-5 md:gap-20 md:rounded-md md:text-base'
                key={park.id}
              >
                <li className='flex w-20 items-center' title={park.park_name}>
                  {getMedal(index)}
                  {index > 2 && `${index + 1}. `}
                  {park.park_name.length > 15
                    ? park.park_name.slice(0, 10) + '...'
                    : park.park_name}
                </li>

                {/* div for display the picture avatar and pseudo */}
                <li className='flex w-20 flex-row items-center gap-1'>
                  <img
                    src={
                      park.avatar_id === null
                        ? profileIcon
                        : `/images/avatar/${park.src_image}`
                    }
                    alt='avatar'
                    className='max-w-7'
                  />

                  <p title={park.username ?? 'Unknown user'}>
                    {park.username !== null && park.username.length > 15
                      ? park.username.slice(0, 10) + '...'
                      : (park.username ?? 'Unknown user')}
                  </p>
                </li>

                <li className='flex w-15 items-center justify-center'>
                  {park.active_creatures}
                </li>

                <li className='hidden items-center justify-between md:flex'>
                  <p>{formatNumber(park.wallet ?? 0)}</p>
                  <img className='max-h-5 max-w-5' src={Moons} alt='Money' />
                </li>
                <li className='hidden items-center justify-between md:flex'>
                  <p>{formatNumber(park.active_visitors)}</p>
                  <img
                    className='max-h-7 max-w-7'
                    src={Visitor}
                    alt='Visitors'
                  />
                </li>
              </ul>
            ))}
          </ul>
        </div>
      </BgMenu>
    </div>
  );
}
