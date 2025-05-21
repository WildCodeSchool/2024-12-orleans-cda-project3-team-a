import useCreatures from '@/hooks/use-creatures';
import { formatRemainingTime } from '@/utils/format-remaining-time';

import Female from '../assets/images/icons-buttons/female.png';
import Male from '../assets/images/icons-buttons/male.png';
import ButtonBuy from './button-buy';

type CreatureId = {
  readonly creatureId: number;
};

function getPotionImage(zoneId: number) {
  switch (zoneId) {
    case 1:
      return 'fairy-potion.png';
    case 2:
      return 'winged-potion.png';
    case 3:
      return 'mythologic-potion.png';
    case 4:
      return 'shadow-potion.png';
    default:
      return 'winged-potion.png';
  }
}

export default function CreatureLine({ creatureId }: CreatureId) {
  const { creatures } = useCreatures(creatureId);

  if (creatures.length === 0) {
    return (
      <p>{`You don't have any species yet. Buy your first species..! `}</p>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-4 pt-3 md:grid md:grid-cols-2'>
        {creatures.map((creatureData) => {
          const feedDate = new Date(creatureData.feed_date);
          const timeRemainingText = formatRemainingTime(feedDate);

          return (
            <div
              key={creatureData.id}
              className='flex items-center justify-center gap-3'
            >
              <div className='relative flex w-17'>
                <img
                  src={`/images/creatures/${creatureData.src_image}`}
                  alt={creatureData.species}
                  className='w-15'
                />
                {/*ICI POUR V2 SI ON A LE TEMPS */}
                <img
                  src={creatureData.gender === 'female' ? Female : Male}
                  alt={creatureData.gender}
                  className='absolute right-0 bottom-1 w-2 md:w-5'
                />
              </div>

              <div className='h-7 w-51 rounded border bg-white px-2 focus:border-2 focus:outline-none md:w-40 md:rounded-md'>
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
                  src={`/images/decorations/${getPotionImage(creatureData.zone_id)}`}
                  alt='potion'
                  className='w-15 p-0.5 md:w-7'
                />
              </ButtonBuy>
            </div>
          );
        })}
      </div>
    </div>
  );
}
