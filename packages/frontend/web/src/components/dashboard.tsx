import { useGameInfoContext } from '@/contexts/game-info-context';

import moon from '../assets/images/icons-buttons/moon.png';
import padlock from '../assets/images/icons-buttons/padlock-unlocked.svg';
import visitor from '../assets/images/icons-buttons/visitors.png';
import BgMenu from './bg-menu';

export default function Dashboard() {
  const { parkName, walletFormated, visitorsFormated } = useGameInfoContext();

  return (
    <BgMenu>
      <div className='p-3'>
        <h1 className='font-aerokids text-outline-white mb-10 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-4xl text-transparent md:text-6xl'>
          {parkName}
        </h1>
        {/* Container My park and My visitor */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='relative min-h-20'>
            <h2 className='font-aerokids text-outline-white absolute w-full -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-winged-yellow),var(--color-title-purple-dark),var(--color-winged-yellow))] bg-clip-text pb-3 text-3xl text-transparent md:text-5xl'>
              {'My park'}
            </h2>
            <li className='grid min-h-30 grid-cols-2 gap-2 rounded border-1 border-gray-500 bg-white/60 p-3 pt-5 md:rounded-md'>
              <ul className='flex items-center justify-center gap-2'>
                {walletFormated}
                <img src={moon} alt='money' className='h-6 md:h-7' />
              </ul>
              <ul className='flex items-center justify-center gap-2'>
                {visitorsFormated}
                <img src={visitor} alt='money' className='h-6 md:h-7' />
              </ul>
              <ul className='flex items-center justify-center gap-2'>
                {'3/4 world unlocked'}
                <img src={padlock} alt='unlocked' className='h-6 md:h-7' />
              </ul>
              <ul className='flex items-center justify-center gap-2'>
                {'16/20 creatures unlocked'}
                <img src={padlock} alt='unlocked' className='h-6 md:h-7' />
              </ul>
            </li>
          </div>
          <div className='relative'>
            <h2 className='font-aerokids text-outline-white absolute w-full -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-winged-yellow),var(--color-title-purple-dark),var(--color-winged-yellow))] bg-clip-text pb-3 text-3xl text-transparent md:text-5xl'>
              {'My visitors'}
            </h2>
            <li className='grid min-h-30 grid-cols-2 gap-2 rounded border-1 border-gray-500 bg-white/60 p-3 md:rounded-md'>
              <ul>{'150$$'}</ul>
              <ul>{'200 visitors'}</ul>
              <ul>{'3/4 world unlocked'}</ul>
              <ul>{'16/20 creatures unlocked'}</ul>
            </li>
          </div>
        </div>
        {/* Container for display 4 worlds and nb of creatures */}
        <div className='grid grid-cols-2 md:grid-cols-4'>
          {/* faire un map pour les 4 mondes */}
          <h1>{'titre'}</h1>
          <h1>{'titre'}</h1>
          <h1>{'titre'}</h1>
          <h1>{'titre'}</h1>
        </div>
      </div>
    </BgMenu>
  );
}
