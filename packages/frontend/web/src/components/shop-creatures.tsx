import { useState } from 'react';

import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import useEnclosures from '@/hooks/use-enclos';

import BgMenu from './bg-menu';

type ShopCreatureProps = {
  readonly creatureId: number;
};

export default function ShopCreature({ creatureId }: ShopCreatureProps) {
  const [name, setName] = useState('');
  const { creaturesEnclos } = useEnclosures();
  const { wallet } = useGameInfoContext();

  const creature = creaturesEnclos.find(
    (creature) => creature.id === creatureId,
  );

  if (!creature) return null;

  const hasEnoughMoons = wallet > creature.price;

  const buyCreature = async () => {
    if (!hasEnoughMoons) return;

    try {
      const response = await fetch(
        `/api/game/buy-creature?creatureId=${creatureId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            creatureId,
          }),
          credentials: 'include',
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BgMenu>
      <div>
        <div key={creature.id}>
          <p>{creature.species}</p>
          <p>{creature.price}</p>
        </div>
      </div>
    </BgMenu>
  );
}
