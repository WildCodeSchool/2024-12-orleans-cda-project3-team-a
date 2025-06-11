import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import useEnclosures from '@/hooks/use-enclosure';
import { formatNumber } from '@/utils/number-formatter';

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
  const [nameError, setNameError] = useState('');
  const [isBought, setIsBought] = useState(false);
  const {
    wallet,
    zonesRefetch,
    creaturesRefetch,
    visitorsRefetch,
    parkRefetch,
  } = useGameInfoContext();
  const { creaturesEnclos } = useEnclosures();
  const { zone_id: zoneId } = useParams();

  const creaturesEnclosId = creaturesEnclos.find(
    (creature: Enclosure) => creature.id === creatureId,
  );

  if (!creaturesEnclosId) {
    return;
  }

  const hasEnoughMoons = wallet >= creaturesEnclosId.price;

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
        },
      );

      // refetch for the information wallet and visitor number
      const result = await response.json();

      if (result.ok === true) {
        await Promise.all([
          parkRefetch(),
          zonesRefetch(),
          fetchCreatures(),
          creaturesRefetch(),
          visitorsRefetch(),
        ]);

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
      <h1 className='pt-2 text-center text-lg md:text-xl'>{`Buy a new ${creaturesEnclosId.species}`}</h1>
      <p className='flex items-center justify-center text-xs text-green-500 italic md:text-base'>
        {`This creature earns ${creaturesEnclosId.profit} `}
        <img className='mx-0.5 h-3 md:h-4' src={Moon} alt='moon' /> {` /min!`}
      </p>
      <div className='flex items-center gap-1 p-2 text-xs md:gap-5 md:text-base'>
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
          <h1 className='text-xs md:text-base'>
            {formatNumber(creaturesEnclosId.price)}
          </h1>
          <img className='h-6 md:h-7' src={Moon} alt='moon' />
          <ButtonBuy
            onClick={buyCreature}
            bg='bg-white/75'
            border='border border-black'
            cursor={!hasEnoughMoons ? 'not-allowed' : 'pointer'}
            isGrayscale={!hasEnoughMoons}
          >
            <div className='flex h-7 items-center justify-center gap-1'>
              <p className='mb:text-2xl'>{'+'}</p>
              <img
                className='w-5 md:w-7 md:p-0.5'
                src={`/images/creatures/${creaturesEnclosId.src_image}`}
                alt={creaturesEnclosId.species}
              />
            </div>
          </ButtonBuy>
        </div>
      </div>
      {isBought ? (
        <p className='text-xs text-green-600 italic'>{'Creature bought!'}</p>
      ) : null}
      {nameError ? (
        <p className='text-xs text-red-500 italic'>{nameError}</p>
      ) : null}
    </div>
  );
}
