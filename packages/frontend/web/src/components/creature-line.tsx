import type { Creatures } from '@app/api';
import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import { formatRemainingTime } from '@/utils/format-remaining-time';

import Female from '../assets/images/icons-buttons/female.png';
import Male from '../assets/images/icons-buttons/male.png';
import Moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type CreatureLineProps = {
  readonly fetchCreatures: () => Promise<void>;
  readonly creatures: Creatures;
  readonly potionPrice: number;
  readonly enclosure: Enclosure;
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

export default function CreatureLine({
  fetchCreatures,
  creatures,
  potionPrice,
  enclosure,
}: CreatureLineProps) {
  const { wallet } = useGameInfoContext();
  const hasEnoughMoons = wallet >= Number(potionPrice);

  if (creatures.length === 0) {
    return (
      <div className='flex items-center justify-center gap-4 pt-5'>
        <img className='w-12 md:w-15' src='/images/minguch.png' alt='mingush' />
        <div className='text-secondary-blue flex flex-col justify-center text-center text-xs md:text-base'>
          <p className='flex justify-center'>{`You don't have any ${enclosure.species} yet.`}</p>
          <p className='font-extrabold'>{`Buy your first ${enclosure.species}!`}</p>
        </div>
      </div>
    );
  }
  const feedCreature = async (parkCreatureId: number, zoneId: number) => {
    if (!hasEnoughMoons) return;

    try {
      const response = await fetch(`/api/game/creature/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          parkCreatureId,
          zoneId,
        }),
      });

      const result = await response.json();
      if (result.ok === true) {
        await fetchCreatures();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col gap-4 pt-3 md:grid md:grid-cols-2'>
      {creatures.map((creatureData) => {
        const feedDate = new Date(creatureData.feed_date);
        const remainingTime = formatRemainingTime(feedDate);
        const now = new Date();
        const shouldEat = feedDate.getTime() < now.getTime();

        return (
          <div
            key={creatureData.id}
            className='flex items-center justify-center gap-2 text-xs md:gap-3 md:text-base'
          >
            <div className='relative flex w-17'>
              <img
                src={`/images/creatures/${creatureData.src_image}`}
                alt={creatureData.species}
                className={`w-15 ${!shouldEat ? '' : 'animate-none grayscale'}`}
              />
              <img
                src={creatureData.gender === 'female' ? Female : Male}
                alt={creatureData.gender}
                className='absolute right-0 bottom-1 w-2 md:w-5'
              />
            </div>

            <div className='flex h-5 w-51 items-center rounded border bg-white px-2 md:h-7 md:w-40 md:rounded-md'>
              {creatureData.name}
            </div>

            <div
              className={`${shouldEat ? 'border-red-300 bg-red-100' : 'border-green-300 bg-green-100'} flex h-5 w-51 items-center rounded border px-2 md:h-7 md:w-40 md:rounded-md`}
            >
              {remainingTime}
            </div>
            <ButtonBuy
              border='border border-black'
              bg='bg-white/75'
              cursor={!shouldEat || !hasEnoughMoons ? 'not-allowed' : 'pointer'}
              isInvisible={!shouldEat}
              isGrayscale={!shouldEat || !hasEnoughMoons}
              onClick={async () => {
                if (shouldEat && hasEnoughMoons) {
                  await feedCreature(creatureData.id, creatureData.zone_id);
                }
              }}
            >
              <img
                src={`/images/decorations/${getPotionImage(creatureData.zone_id)}`}
                alt='potion'
                className='h-3 px-0 md:h-6 md:py-0.5'
              />
              <p className='text-xs md:text-base'>{potionPrice}</p>
              <img className='h-2 md:h-5 md:px-0.5' src={Moon} alt='moon' />
            </ButtonBuy>
          </div>
        );
      })}
    </div>
  );
}
