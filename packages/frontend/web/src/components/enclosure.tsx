import { type PropsWithChildren, useState } from 'react';

import type { Creatures, Decorations } from '@app/api';

import alert from '../assets/images/icons-buttons/alert.png';
import moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type EnclosureProps = PropsWithChildren<{
  readonly srcImgCreature: string;
  readonly price: number;
  readonly lockedCreature: string | null;
  readonly nmbrCreature: number;
  readonly name: string;
  readonly background: string;
  readonly decorations: Decorations;
  readonly totalCreaturesInZone: number;
}>;

export default function Enclosure({
  srcImgCreature,
  price,
  name,
  lockedCreature,
  nmbrCreature,
  background,
  decorations,
  totalCreaturesInZone,
}: EnclosureProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hungry, setHungry] = useState(false);
  const isLocked = nmbrCreature === 0;

  const getBackgound = (background: string) => {
    switch (background) {
      case 'green':
        return 'bg-fairy-green';
      case 'blue':
        return 'bg-fairy-blue';
      case 'yellow':
        return 'bg-winged-yellow';
      case 'red':
        return 'bg-winged-red';
      case 'beige':
        return 'bg-mythologic-beige';
      case 'dark-green':
        return 'bg-shadow-green';
      case 'purple':
        return 'bg-shadow-purple';
    }
  };

  const decoPositionFour = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-5 left-0';
      case 'top-right':
        return 'absolute top-5 left-170';
      case 'bottom-left':
        return 'absolute top-60 lef-0';
      case 'bottom-right':
        return 'absolute top-60 left-170';
      case 'top-center':
        return 'absolute top-5 center';
      default:
        return '';
    }
  };

  const decoPositionSix = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-5 left-0';
      case 'top-right':
        return 'absolute top-5 left-105';
      case 'bottom-left':
        return 'absolute top-60 lef-0';
      case 'bottom-right':
        return 'absolute top-60 left-110';
      case 'top-center':
        return 'absolute top-5 center';
      default:
        return '';
    }
  };

  const isFour = totalCreaturesInZone === 4;
  const isSix = totalCreaturesInZone === 6;
  const width = isFour ? 'w-[50%]' : isSix ? 'w-[33.33%]' : '';
  const getPosition = isFour
    ? decoPositionFour
    : isSix
      ? decoPositionSix
      : () => '';

  // const getPosition = () => {
  //   if (creatureWord.length === 4) {
  //     positions = decoPositionFour;
  //     width = 50
  //   } else if (creatureWord.length === 6) {
  //     positions = decoPositionSix;
  //     width = 33.33
  //   }

  const handleModale = () => {
    setIsModalOpen(!isModalOpen);
  };
  // min-w-[33.33%]
  // className={`flex h-[50vh] min-w-[33.33%] flex-col p-4 ${getBackgound(background)}`}

  return (
    <div
      className={`flex h-[50vh] ${width} flex-col p-4 ${getBackgound(background)}`}
    >
      {decorations.map((decoration) => (
        <img
          key={decoration.creature_id}
          className={`relative w-15 ${getPosition(decoration.position)}`}
          src={`/images/decorations/${decoration.src_image}`}
          alt=''
        />
      ))}
      <div
        onClick={handleModale}
        className='relative flex flex-col items-center justify-center gap-2'
      >
        <img
          className='absolute top-1 left-80 w-10'
          src={hungry ? alert : ''}
        />
        <img
          className={`w-30 ${hungry ? 'grayscale' : ''}`}
          src={isLocked ? (lockedCreature ?? '') : srcImgCreature}
          alt=''
        />

        <h1 className={` ${isLocked ? 'absolute top-10' : 'hidden'} `}>
          {name}
        </h1>
        {isLocked ? (
          <div className='flex items-center gap-1'>
            <ButtonBuy>{price}</ButtonBuy>
            <img src={moon} alt='Prix' className='h-4 w-4' />
          </div>
        ) : (
          <ButtonBuy>{nmbrCreature}</ButtonBuy>
        )}
      </div>
    </div>
  );
}
