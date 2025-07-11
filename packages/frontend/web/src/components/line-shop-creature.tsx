import { useState } from 'react';

import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import { formatNumber } from '@/utils/number-formatter';

import Moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';
import Input from './input';

type LineShopCreatureProps = {
  readonly creature: Enclosure;
};

export default function LineShopCreature({ creature }: LineShopCreatureProps) {
  const [name, setName] = useState('');
  const { wallet, refetchPark, refetchVisitors, refetchWallet } =
    useGameInfoContext();
  const [isBought, setIsBought] = useState(false);
  const [nameError, setNameError] = useState('');

  const hasEnoughMoons = wallet >= creature.price;

  const buyCreature = async () => {
    if (!hasEnoughMoons) return;
    if (name.trim() === '') {
      setNameError('Enter name for creature');
      return;
    } else if (!/^[a-zA-ZÀ-ÿ0-9 ]{3,}$/.test(name)) {
      setNameError(
        'Name must be at least 3 characters, using letters or numbers',
      );
      return;
    } else {
      setNameError('');
    }
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
        },
      );

      const result = await response.json();
      if (result.ok === true) {
        await Promise.all([refetchPark(), refetchWallet(), refetchVisitors()]);
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
    <div className='flex flex-col'>
      <div
        key={creature.id}
        className='flex items-center justify-center gap-1 md:flex-wrap md:gap-5'
      >
        <img
          className='w-12 md:w-18'
          src={`/images/creatures/${creature.src_image}`}
          alt={creature.species}
        />
        <div className='relative'>
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
          {isBought ? (
            <p className='absolute left-1/2 m-0 -translate-x-1/2 text-xs text-green-600 italic'>
              {'Creature bought!'}
            </p>
          ) : null}
          {nameError ? (
            <p className='absolute m-0 text-xs text-red-600 italic'>
              {nameError}
            </p>
          ) : null}
        </div>
        <ButtonBuy
          onClick={buyCreature}
          bg='bg-white/75'
          border='border border-black'
          cursor={!hasEnoughMoons ? 'not-allowed' : 'pointer'}
          isGrayscale={!hasEnoughMoons}
        >
          <div className='flex items-center justify-center gap-0.5 p-0.5'>
            <p className=''>{formatNumber(creature.price)}</p>
            <img className='w-4' src={Moon} alt='money' />
          </div>
        </ButtonBuy>
      </div>
    </div>
  );
}
