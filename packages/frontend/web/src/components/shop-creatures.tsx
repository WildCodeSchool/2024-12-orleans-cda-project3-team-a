import { useState } from 'react';

import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';

import Moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';
import Input from './input';

type ShopCreatureProps = {
  readonly creature: Enclosure;
};

export default function Creature({ creature }: ShopCreatureProps) {
  const [name, setName] = useState('');
  const { wallet, fetchAll } = useGameInfoContext();

  const hasEnoughMoons = wallet > creature.price;

  const buyCreature = async () => {
    if (!hasEnoughMoons) return;

    try {
      const response = await fetch(
        `/api/game/creature/buy?creatureId=${creature.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            zoneId: creature.zone_id,
          }),
          credentials: 'include',
        },
      );
      const result = await response.json();
      if (result.ok === true) {
        await fetchAll();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      key={creature.id}
      className='flex items-center justify-center gap-1 md:gap-5'
    >
      <img
        className='w-12 md:w-18'
        src={`/images/creatures/${creature.src_image}`}
        alt=''
      />
      <Input
        bgColor='bg-white'
        borderColor='border-gray'
        type='text'
        placeholder={creature.species}
        value={name}
        onChangeInput={(value) => {
          setName(value);
        }}
      />
      <ButtonBuy
        onClick={buyCreature}
        bg='bg-white/75'
        border='border border-black'
        cursor='pointer'
      >
        <p>{creature.price}</p>
        <img className='w-5' src={Moon} alt='' />
      </ButtonBuy>
    </div>
  );
}
