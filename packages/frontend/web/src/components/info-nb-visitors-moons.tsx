import { useContext } from 'react';

import moon from '../assets/images/icons-buttons/moon.png';
import visitor from '../assets/images/icons-buttons/visitors.png';
import { gameInfoContext } from '../contexts/context-info-park';

//faire le fetch dans le contexte!

export default function InfoNbVisitorsMoons() {
  const { wallet } = useContext(gameInfoContext);

  return (
    <div className='bg-secondary-gray flex h-8 w-fit cursor-default items-center justify-between gap-2 rounded px-2 py-0.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-9 md:rounded-md'>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {'50'}
        <img src={visitor} alt='visitors' className='h-6 md:h-7' />
      </div>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {wallet}
        <img src={moon} alt='mooney' className='h-6 md:h-7' />
      </div>
    </div>
  );
}
