import useCreatures from '@/hooks/use-creature';

import Potion from '../assets/images/fairy-zone/potion.png';
import Female from '../assets/images/icons-buttons/female.png';
import Male from '../assets/images/icons-buttons/male.png';
import ButtonBuy from './button-buy';

function remainingTimeToFeed(ComingDate: Date) {
  const now = new Date();
  const diff = ComingDate.getTime() - now.getTime();

  if (diff <= 0) return 'No date available';

  const totalMins = Math.floor(diff / 1000 / 60);
  const days = Math.floor(totalMins / 1440);
  const hours = Math.floor((totalMins % 1440) / 60);
  const minutes = totalMins % 60;

  const remainingTime = [];
  if (days > 0) remainingTime.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) remainingTime.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0 && days === 0)
    remainingTime.push(`${minutes} min${minutes > 1 ? 's' : ''}`);

  return ` ${remainingTime.join(' ')}`;
}

export default function CreatureLine() {
  const { creature } = useCreatures();

  if (creature.length === 0) {
    return (
      <p>{`You don't have any species yet. Buy your first species..! `}</p>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {creature.map((creatureData) => {
          const feedDate = new Date(creatureData.feed_date);
          const timeRemainingText = remainingTimeToFeed(feedDate);

          return (
            <div
              key={creatureData.creature_id}
              className='flex items-center justify-center gap-3'
            >
              <div className='relative flex w-17'>
                <img
                  src={`/images/creatures/${creatureData.src_image}`}
                  alt={creatureData.species}
                  className='w-15'
                />
                <img
                  src={creatureData.gender === 'female' ? Female : Male}
                  alt={creatureData.gender}
                  className='absolute right-0 bottom-1 w-5'
                />
              </div>

              <div className='h-7 w-51 rounded border px-2 focus:border-2 focus:outline-none md:w-40 md:rounded-md'>
                {creatureData.name}
              </div>

              <div className='h-7 w-51 rounded border bg-gray-300 px-2 focus:border-2 focus:outline-none md:w-40 md:rounded-md'>
                {timeRemainingText}
              </div>

              <ButtonBuy
                border='border border-black'
                bg='bg-white/75'
                cursor='pointer'
              >
                <img src={Potion} alt='potion' className='w-7 p-0.5' />
              </ButtonBuy>
            </div>
          );
        })}
      </div>
    </div>
  );
}
