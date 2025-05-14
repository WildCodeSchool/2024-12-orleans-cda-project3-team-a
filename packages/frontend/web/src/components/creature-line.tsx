import useCreatures from '@/hooks/use-creatures';

import FairyPotion from '../assets/images/fairy-zone/potion.png';
import Female from '../assets/images/icons-buttons/female.png';
import Male from '../assets/images/icons-buttons/male.png';
import MythologicPotion from '../assets/images/mythologic-zone/potion.png';
import ShadowPotion from '../assets/images/shadow-zone/potion.png';
import WingedPotion from '../assets/images/winged-zone/potion.png';
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

function getPotionImage(zoneId: number) {
  switch (zoneId) {
    case 1:
      return FairyPotion;
    case 2:
      return WingedPotion;
    case 3:
      return MythologicPotion;
    case 4:
      return ShadowPotion;
    default:
      return FairyPotion;
  }
}

export default function CreatureLine() {
  const { creatures } = useCreatures();

  if (creatures.length === 0) {
    return (
      <p>{`You don't have any species yet. Buy your first species..! `}</p>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {creatures.map((creatureData) => {
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
                <img
                  src={getPotionImage(creatureData.zone_id)}
                  alt='potion'
                  className='w-7 p-0.5'
                />
              </ButtonBuy>
            </div>
          );
        })}
      </div>
    </div>
  );
}
