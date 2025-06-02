import { useEffect } from 'react';

import useCreaturesStatus from '@/hooks/use-creatures-status';

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
      <div className='text-secondary-blue flex flex-col gap-3'>
        <p>{`Now that you've bestowed a name upon your magical park, it's time to bring it to life with your very first creature!`}</p>
        <p>{`For now, the Fairy realm is open to you.`}</p>
        <p>{`To unlock the next realm, the "Winged" world, you'll need to buy at least one creature of each species into your park.`}</p>
        <p>{`Let the adventure begin! ✨🐉`}</p>
      </div>
      <div className='relative mt-4'>
        <div className='absolute -right-4 -bottom-4'>
          <img
            className='w-12 md:w-20'
            src='../public/images/minguch.png'
            alt='mingush'
          />
        </div>
      </div>
    </div>
  );
}
