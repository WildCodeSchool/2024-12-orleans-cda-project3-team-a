import { useEffect } from 'react';

import useCreaturesStatus from '@/hooks/use-creatures-status';

import mingush from '../assets/images/icons-buttons/minguch.png';

export default function WelcomeGuide() {
  const { hasCreatures, checkCreaturesStatus } = useCreaturesStatus();
  useEffect(() => {
    void checkCreaturesStatus();
  }, [checkCreaturesStatus]);

  if (hasCreatures) {
    return null;
  }
  return (
    <div className='absolute top-[65%] left-[50%] w-9/10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white/90 p-5 text-xl md:text-2xl'>
      <div className='flex flex-col gap-6'>
        <p className='typewriter typing1'>{`Now that you've bestowed a name upon your magical park, it's time to bring it to life with your very first creature!`}</p>
        <p className='typewriter typing2'>{`For now, the Fairy realm is open to you.`}</p>
        <p className='typewriter typing3'>{`To unlock the next realm, the "Winged" world, you'll need to buy at least one creature of each species into your park.`}</p>
        <p className='typewriter typing4'>{`Let the adventure begin! ✨🐉`}</p>
      </div>
      <div className='relative mt-4'>
        <div className='absolute -right-4 -bottom-4'>
          <img className='w-15' src={mingush} alt='mingush' />
        </div>
      </div>
    </div>
  );
}
