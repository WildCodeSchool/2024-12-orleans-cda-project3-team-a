import { useState } from 'react';

import type { Creatures } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import { formatRemainingTime } from '@/utils/format-remaining-time';

import Female from '../assets/images/icons-buttons/female.png';
import Male from '../assets/images/icons-buttons/male.png';
import Moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type CreatureLineProps = {
  readonly fetchCreatures: () => Promise<void>;
  readonly creature: Creatures[0];
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
  creature,
  potionPrice,
}: CreatureLineProps) {
  const { wallet, parkRefetch, walletRefetch } = useGameInfoContext();
  const [isClicked, setIsClicked] = useState(false);
  const hasEnoughMoons = wallet >= Number(potionPrice);

  const feedCreature = async (parkCreatureId: number, zoneId: number) => {
    if (!hasEnoughMoons) return;

    try {
      const response = await fetch(`/api/game/creature/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parkCreatureId,
          zoneId,
        }),
      });

      const result = await response.json();
      if (result.ok === true) {
        await Promise.all([fetchCreatures(), parkRefetch(), walletRefetch()]);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const feedDate = new Date(creature.feed_date);
  const remainingTime = formatRemainingTime(feedDate);
  const now = new Date();
  const shouldEat = feedDate.getTime() < now.getTime();

  return (
    <div className='flex items-center justify-center gap-2 text-xs md:gap-3 md:text-base'>
      <div className='relative flex w-17'>
        <img
          src={`/images/creatures/${creature.src_image}`}
          alt={creature.species}
          className={`w-15 ${!shouldEat ? '' : 'animate-none grayscale'}`}
        />
        <img
          src={creature.gender === 'female' ? Female : Male}
          alt={creature.gender}
          className='absolute right-0 bottom-1 w-2 md:w-5'
        />
      </div>

      <div className='flex h-5 w-51 items-center rounded border bg-white px-2 md:h-7 md:w-40 md:rounded-md'>
        {creature.name}
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
        isInvisible={!shouldEat || isClicked}
        isGrayscale={!shouldEat || !hasEnoughMoons || isClicked}
        isDisabled={!shouldEat || !hasEnoughMoons || isClicked}
        onClick={async () => {
          if (shouldEat && hasEnoughMoons && !isClicked) {
            setIsClicked(true);
            try {
              await feedCreature(creature.id, creature.zone_id);
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error(err);
              setIsClicked(false);
            }
          }
        }}
      >
        <img
          src={`/images/decorations/${getPotionImage(creature.zone_id)}`}
          alt='potion'
          className='h-3 px-0 md:h-6 md:py-0.5'
        />
        <p className='text-xs md:text-base'>{potionPrice}</p>
        <img className='h-2 md:h-5 md:px-0.5' src={Moon} alt='moon' />
      </ButtonBuy>
    </div>
  );
}
