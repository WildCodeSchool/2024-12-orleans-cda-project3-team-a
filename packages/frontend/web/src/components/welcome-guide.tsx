import { useEffect, useState } from 'react';

import useCreaturesStatus from '@/hooks/use-creatures-status';

import Loader from './loader';

export default function WelcomeGuide() {
  const { hasCreature, checkCreatureStatus } = useCreaturesStatus();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreatureStatus = async () => {
      await checkCreatureStatus();
      setIsLoading(false);
    };

    void fetchCreatureStatus();
  }, [checkCreatureStatus]);

  if (hasCreature) {
    return null;
  }
  return isLoading ? (
    <div className='absolute flex w-1/2 -translate-x-1/2 -translate-y-1/6 transform justify-center rounded-md bg-white/90 p-5'>
      <Loader />
    </div>
  ) : (
    <div className='absolute top-[65%] left-[50%] w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white/90 p-5 text-xs font-bold md:text-base'>
      <div className='text-secondary-blue flex flex-col gap-3'>
        <p className='whitespace-wrap md:animate-typing1 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`Now that you've bestowed a name upon your magical park, it's time to bring it to life with your very first creature!`}</p>
        <p className='whitespace-wrap md:animate-typing2 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`For now, the Fairy realm is open to you.`}</p>
        <p className='whitespace-wrap md:animate-typing3 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`To unlock the next realm, the "Winged" world, you'll need to buy at least one creature of each species into your park.`}</p>
        <p className='whitespace-wrap md:animate-typing4 md:flex md:w-0 md:flex-wrap md:overflow-hidden md:whitespace-nowrap'>{`Let the adventure begin! ✨🐉`}</p>
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
