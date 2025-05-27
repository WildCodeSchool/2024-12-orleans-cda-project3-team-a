import type { Creatures } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import { formatRemainingTime } from '@/utils/format-remaining-time';

import Female from '../assets/images/icons-buttons/female.png';
import Male from '../assets/images/icons-buttons/male.png';
import ButtonBuy from './button-buy';

type CreatureLineProps = {
  readonly fetchCreatures: () => Promise<void>;
  readonly creatures: Creatures;
  readonly potionPrice: number;
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
}: CreatureLineProps) {
  const { wallet, fetchAll } = useGameInfoContext();
  const hasEnoughMoons = wallet > Number(potionPrice);
  if (creatures.length === 0) {
    return <p>{`You don't have any species yet. Buy your first species..!`}</p>;
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
        await fetchAll();
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
            className='flex items-center justify-center gap-3'
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
            <div className='h-5 w-51 rounded border bg-white px-2 md:h-7 md:w-40 md:rounded-md'>
              {creatureData.name}
            </div>
            <div
              className={`${shouldEat ? 'border-red-300 bg-red-100' : 'border-green-300 bg-green-100'} h-5 w-51 rounded border px-2 md:h-7 md:w-40 md:rounded-md`}
            >
              {remainingTime}
            </div>

            <ButtonBuy
              border='border border-black'
              bg='bg-white/75'
              cursor={shouldEat ? 'pointer' : 'not-allowed'}
              invisible={!shouldEat}
              onClick={async () => {
                if (shouldEat) {
                  await feedCreature(creatureData.id, creatureData.zone_id);
                }
              }}
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
  );
}
