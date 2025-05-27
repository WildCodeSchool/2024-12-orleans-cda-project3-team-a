import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import useEnclosures from '@/hooks/use-enclos';

import Moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';
import Input from './input';

type BuyCreatureProps = {
  readonly creatureId: number;
  readonly fetchCreatures: () => Promise<void>;
};

export default function BuyCreature({
  creatureId,
  fetchCreatures,
}: BuyCreatureProps) {
  const [name, setName] = useState('');
  const [isBought, setIsBought] = useState(false);
  const { wallet, fetchAll } = useGameInfoContext();
  const { creaturesEnclos } = useEnclosures();
  const { zone_id: zoneId } = useParams();

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
            zoneId,
          }),
          credentials: 'include',
        },
      );

      // refetch for the information wallet and visitor number
      const result = await response.json();

      if (result.ok === true) {
        await fetchAll();
        await fetchCreatures();
        setName('');
        setIsBought(true);
        //display for 2 seconds a message to inform that is bought
        setTimeout(() => {
          setIsBought(false);
        }, 2000);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className='rounded-lg border-1'>
      <h1 className='pt-2 text-center text-xl md:text-2xl'>{`Buy a new ${creaturesEnclosId.species}`}</h1>
      <div className='flex items-center gap-1 p-2 md:gap-5'>
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
      {isBought ? (
        <p className='text-xxs text-green-600 italic md:text-xs'>
          {'Creature bought!'}
        </p>
      ) : null}
    </div>
  );
}
