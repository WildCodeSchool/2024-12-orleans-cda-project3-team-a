import { useGameInfoContext } from '@/contexts/game-info-context';
import useCreatures from '@/hooks/use-creatures';
// import { useNumberFormatter } from '@/hooks/use-number-formatter';
import { formatRemainingTime } from '@/utils/format-remaining-time';

import Female from '../assets/images/icons-buttons/female.png';
import Male from '../assets/images/icons-buttons/male.png';
import ButtonBuy from './button-buy';

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

type FeedProps = {
  readonly potionPrice: number;
  readonly refetch: () => Promise<void>;
};

export default function CreatureLine({ potionPrice, refetch }: FeedProps) {
  const { creatures } = useCreatures();
  const { wallet } = useGameInfoContext();
  const hasEnoughMoons = wallet > potionPrice;
  // const priceFormatted = useNumberFormatter(potionPrice);

  if (creatures.length === 0) {
    return <p>{`You don't have any species yet. Buy your first species..!`}</p>;
  }

  const feedCreature = async (creatureId: number, zoneId: number) => {
    if (!hasEnoughMoons) return;

    try {
      const response = await fetch('/api/game/feed-creature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          creatureId,
          zoneId,
        }),
      });

      const result = await response.json();

      if (result.ok === true) {
        await refetch();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {creatures.map((creatureData) => {
        const feedDate = new Date(creatureData.feed_date);
        const timeRemainingTime = formatRemainingTime(feedDate);

        return (
          <div
            key={creatureData.id}
            className='flex items-center justify-center gap-3'
          >
            <div className='relative flex w-17'>
              <img
                src={`/images/creatures/${creatureData.src_image}`}
                alt={creatureData.species}
                className={`w-15 ${creatureData.is_active === 1 ? '' : 'animate-none grayscale'}`}
              />
              <img
                src={creatureData.gender === 'female' ? Female : Male}
                alt={creatureData.gender}
                className='absolute right-0 bottom-1 w-5'
              />
            </div>

            <div className='h-7 w-51 rounded border px-2 md:w-40 md:rounded-md'>
              {creatureData.name}
            </div>

            <div className='h-7 w-51 rounded border bg-gray-300 px-2 md:w-40 md:rounded-md'>
              {timeRemainingTime}
            </div>

            <ButtonBuy
              border='border border-black'
              bg='bg-white/75'
              cursor={creatureData.is_active === 0 ? 'pointer' : 'not-allowed'}
              grayscale={creatureData.is_active === 1} 
              onClick={async () => {
                if (creatureData.is_active === 0) {
                  await feedCreature(creatureData.id, creatureData.zone_id);
                }
              }}
            >
              <img
                src={`/images/decorations/${getPotionImage(creatureData.zone_id)}`}
                alt='potion'
                className='w-7 p-0.5'
              />
            </ButtonBuy>
          </div>
        );
      })}
    </div>
  );
}
