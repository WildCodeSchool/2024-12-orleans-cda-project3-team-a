import type { Enclosure } from '@app/api';

import useCreatures from '@/hooks/use-creatures';
import useEnclosures from '@/hooks/use-enclos';

import Moons from '../assets/images/icons-buttons/moon.png';
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

export default function FeedCreatures({ creatureId }: CreatureId) {
  const { creaturesEnclos } = useEnclosures();
  const { creatures, potionPrice, refetchCreature } = useCreatures(creatureId);

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

      console.log('Feeding with:', { parkCreatureId, zoneId });
      const result = await response.json();

      if (result.ok === true) {
        await refetchCreature();
      }
    } catch (error) {
      console.error('Error feeding creatures:', error);
    }
  };

  return (
    <div className='rounded-lg border-1'>
      <h1 className='pt-2'>{'Making everyone magical'}</h1>
      <div className='flex items-center gap-3 p-2 md:gap-2'>
        <p>{creaturesEnclosId.quantityCreature}</p>
        <img
          className='w-8'
          src={`/images/creatures/${creaturesEnclosId.src_image}`}
          alt='creature'
        />
        <p>
          {'*'}
          {totalPrice}
        </p>
        <img className='h-7' src={Moons} alt='moon' />
        <ButtonBuy
          bg='bg-white/75'
          border='border border-black'
          cursor={hungryCreatures.length > 0 ? 'pointer' : 'not-allowed'}
          grayscale={hungryCreatures.length === 0}
          onClick={async () => {
            if (hungryCreatures.length === 0) return;

            for (const creature of hungryCreatures) {
              await feedCreatures(zoneId, creature.id);
            }
          }}
        >
          <img
            className='h-12 w-12 p-2'
            src={`/images/decorations/${potionImage}`}
            alt='potion'
          />
        </ButtonBuy>
      </div>
    </div>
  );
}
