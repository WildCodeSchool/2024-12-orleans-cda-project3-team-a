import { useState } from 'react';

import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import useEnclosures from '@/hooks/use-enclos';

import Moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';
import Input from './input';

type BuyCreatureProps = {
  readonly creatureId: number;
};

export default function BuyCreature({ creatureId }: BuyCreatureProps) {
  const [name, setName] = useState('');
  const { wallet } = useGameInfoContext();
  const { creaturesEnclos } = useEnclosures();
  const creaturesEnclosId = creaturesEnclos.find(
    (creature: Enclosure) => creature.id === creatureId,
  );
  if (!creaturesEnclosId) {
    return;
  }
  const hasEnoughMoons = wallet > creaturesEnclosId.price;
  const buyCreature = async () => {
    if (!hasEnoughMoons) return;
    try {
      const response = await fetch(
        `/api/game/creature/buy?creatureId=${creatureId}`,
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
      // on refetch plus tard
      // const result = await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className='rounded-lg border-1'>
      <h1 className='pt-2'>{`Buy a new ${creaturesEnclosId.species}`}</h1>
      <div className='bottom-5 flex items-center gap-3 p-2 md:gap-5'>
        <Input
          bgColor='bg-white'
          borderColor='border-gray'
          type='text'
          placeholder='Name'
          value={name}
          onChangeInput={(value) => {
            setName(value);
          }}
        />
        <div className='flex items-center gap-1'>
          <h1 className='text-xs md:text-base'>{creaturesEnclosId.price}</h1>
          <img className='h-6 md:h-7' src={Moon} alt='' />
          <ButtonBuy
            onClick={buyCreature}
            bg='bg-white/75'
            border='border border-black'
            cursor='pointer'
          >
            <p className='text-2xl'>{'+'}</p>
            <img
              className='w-7 p-0.5'
              src={`/images/creatures/${creaturesEnclosId.src_image}`}
              alt=''
            />
          </ButtonBuy>
        </div>
      </div>
    </div>
  );
}
