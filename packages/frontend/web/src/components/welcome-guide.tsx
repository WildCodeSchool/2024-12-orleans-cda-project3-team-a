import { useEffect } from 'react';

import useCreaturesStatus from '@/hooks/use-creatures-status';

export default function WelcomeGuide() {
  const { hasCreatures, checkCreaturesStatus } = useCreaturesStatus();
  const isScreen = window.innerWidth > 950;

  useEffect(() => {
    void checkCreaturesStatus();
  }, [checkCreaturesStatus]);

  if (hasCreatures) {
    return null;
  }
  return (
    <div
      className={`absolute top-[65%] left-[50%] ${isScreen ? 'w-3/4' : 'm:w-13/20'} -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white/90 p-5 text-xs font-bold md:text-base`}
    >
      <div className='text-secondary-blue flex flex-col gap-3'>
        <p className='whitespace-wrap md:animate-typing1 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`Now that you've bestowed a name upon your magical park.`}</p>
        <p className='whitespace-wrap md:animate-typing2 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`It's time to bring  it to life with your very first creature!`}</p>
        <p className='whitespace-wrap md:animate-typing3 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`For now, the Fairy realm is open to you.`}</p>
        <p className='whitespace-wrap md:animate-typing4 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`To unlock the next realm, the "Winged" world.`}</p>
        <p className='whitespace-wrap md:animate-typing5 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{` You'll need to buyat least one creature of each species into your park.`}</p>
        <p className='whitespace-wrap md:animate-typing6 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`Let the adventure begin! ✨🐉`}</p>
      </div>
      <div className='relative mt-4'>
        <div className='absolute -right-1 -bottom-3'>
          <img
            className='w-12 md:w-20'
            src='/images/minguch.png'
            alt='mingush'
          />
        </div>
      </div>
    </div>
  );
}
