import type { PropsWithChildren } from 'react';

import Chest from '../assets/images/deco/chest.png';
import Moons from '../assets/images/icons-buttons/moon.png';

type DailyGiftProps = PropsWithChildren<{
  readonly src_image?: string;
  readonly type: 'creature' | 'visitor' | 'moons';
  readonly amount?: number;
  readonly onClose: () => void;
}>;

export default function DailyGift({
  src_image,
  type,
  amount,
  onClose,
}: DailyGiftProps) {
  return (
    <div
      onClick={onClose}
      className='fixed inset-0 flex justify-center bg-black/70'
    >
      <div className='animate-lights-on h-screen w-70 bg-gradient-to-b from-white/50 to-white/0 [clip-path:polygon(45%_0%,55%_0%,100%_100%,0%_100%)]' />
      <img
        src={Chest}
        alt='chest'
        className='animate-scale absolute mt-25 w-25 drop-shadow-[0_5px_10px_white] md:mt-35 md:w-40'
      />

      {type === 'moons' ? (
        <div className='absolute mt-85 flex flex-col items-center gap-3 text-white md:mt-120'>
          <p className='text-3xl font-bold drop-shadow-[0_2px_4px_black] md:text-4xl'>
            {amount}
          </p>
          <img src={Moons} alt='moons' className='w-10 md:w-16' />
        </div>
      ) : (
        <img
          src={`/images/creatures/${src_image}`}
          alt='gift'
          className='animate-drop absolute mt-85 w-18 drop-shadow-[0_5px_10px_white] md:mt-120 md:w-25'
          style={{
            animationDelay: '2s',
            animationFillMode: 'forwards',
            opacity: 0,
          }}
        />
      )}
    </div>
  );
}
