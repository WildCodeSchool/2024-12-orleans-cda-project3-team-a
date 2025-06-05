import { useState } from 'react';

import type { Enclosure } from '@app/api';
import type { Creatures } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import useEnclosures from '@/hooks/use-enclos';
import { formatNumber } from '@/utils/number-formatter';

import Moons from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type CreatureId = {
  readonly creatureId: number;
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

export default function FeedAllCreatures({
  creatureId,
  creatures,
  potionPrice,
  fetchCreatures,
}: CreatureId) {
  const { creaturesEnclos } = useEnclosures();
  const [isFeeding, setIsFeeding] = useState(false);
  const { fetchAll, wallet } = useGameInfoContext();
  const [isClicked, setIsClicked] = useState(false);

  const hasEnoughMoons = wallet >= Number(potionPrice);

  const creaturesEnclosId = creaturesEnclos.find(
    (creature: Enclosure) => creature.id === creatureId,
  );

  if (!creaturesEnclosId) {
    return null;
  }

  const zoneId = creaturesEnclosId.zone_id;
  const potionImage = getPotionImage(zoneId);

  const now = new Date();
  const hungryCreatures = creatures.filter(
    (creature) => new Date(creature.feed_date) < now,
  );
  const totalPrice = hungryCreatures.length * potionPrice;

  const feedCreatures = async (zoneId: number, parkCreatureId: number) => {
    if (hungryCreatures.length === 0) return;

    if (!hasEnoughMoons) {
      return;
    }

    try {
      const response = await fetch(`/api/game/creature/feed`, {
        method: 'POST',
        credentials: 'include',
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
        await fetchCreatures();
        await fetchAll();
        setIsFeeding(true);
        //display for 2 seconds a message to inform that is bought
        setTimeout(() => {
          setIsFeeding(false);
        }, 2000);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className='w-full rounded-lg border-1 p-0.5 md:w-[30%]'>
      <h1 className='pt-2 text-center text-lg md:text-xl'>
        {'Making everyone magical'}
      </h1>
      <p className='flex items-center justify-center text-xs text-red-500 italic md:text-base'>
        {`This potion costs ${formatNumber(potionPrice)} `}
        <img className='mx-0.5 h-3 md:h-4' src={Moons} alt='moon' />
        {` /creatures!`}
      </p>
      <div className='flex items-center justify-center gap-3 p-2 md:gap-2'>
        <p>{hungryCreatures.length}</p>
        <img
          className='w-8'
          src={`/images/creatures/${creaturesEnclosId.src_image}`}
          alt='creature'
        />
        <p>{formatNumber(totalPrice)}</p>
        <img className='h-6 md:h-7' src={Moons} alt='moon' />
        <ButtonBuy
          bg='bg-white/75'
          border='border border-black'
          cursor={
            !isClicked && hungryCreatures.length > 0 && hasEnoughMoons
              ? 'pointer'
              : 'not-allowed'
          }
          isGrayscale={
            isClicked || hungryCreatures.length === 0 || !hasEnoughMoons
          }
          isDisabled={
            isClicked || hungryCreatures.length === 0 || !hasEnoughMoons
          }
          onClick={async () => {
            if (isClicked || hungryCreatures.length === 0 || !hasEnoughMoons)
              return;

            setIsClicked(true);

            for (const creature of hungryCreatures) {
              await feedCreatures(zoneId, creature.id);
            }
          }}
        >
          <img
            className='w-5 p-0.5 md:w-7'
            src={`/images/decorations/${potionImage}`}
            alt='potion'
          />
        </ButtonBuy>
      </div>
      {isFeeding ? (
        <p className='text-xs text-green-600 italic'>{'Creatures feeding!'}</p>
      ) : null}
    </div>
  );
}
