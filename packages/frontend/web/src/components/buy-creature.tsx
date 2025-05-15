import { useState } from 'react';

import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import { useNumberFormatter } from '@/hooks/use-number-formatter';

import Moon from '../assets/images/icons-buttons/moon.png';
import Background from './bg-menu';
import ButtonBuy from './button-buy';
import InputBlue from './input-blue';

const API_URL = import.meta.env.VITE_API_URL;

type BuyCreature = {
  readonly enclosures: Enclosure;
};

export default function BuyCreature() {
  const [name, setName] = useState('');
  const { wallet } = useGameInfoContext();
  const hasEnoughMoons = wallet > creature.price;
  const priceFormatted = useNumberFormatter(creature.price);

  const buyCreature = async () => {
    //Buy only if we have enough money
    if (!hasEnoughMoons) return;

    try {
      const response = await fetch(`${API_URL}/game/buyCreature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatureId: creature.creatureId,
        }),
        credentials: 'include',
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
    <Background>
      <div className='w-130 rounded-lg border-1'>
        <h1 className='p-2'>{'Buy a new Centaure'}</h1>
        <div className='bottom-5 flex items-center gap-10 p-2'>
          <InputBlue
            type='text'
            placeholder='Name'
            value={name}
            onChangeInput={(value) => {
              setName(value);
            }}
          />
          <h1>{enclosures.price}</h1>
          <img className='h-7 w-7' src={Moon} alt='' />
          <ButtonBuy
            bg='bg-white/75'
            border='border border-black'
            cursor='pointer'
          >
            {'+'}
            <img
              className='w-10'
              src='../public/images/creatures/centaur.png'
              alt=''
            />
          </ButtonBuy>
        </div>
      </div>
    </Background>
  );
}
