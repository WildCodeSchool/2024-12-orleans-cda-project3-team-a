import { type PropsWithChildren, useState } from 'react';

import type { Decorations } from '@app/api';

import alert from '../assets/images/icons-buttons/alert.png';
import ButtonBuy from './button-buy';

type EnclosureProps = PropsWithChildren<{
  readonly srcImgCreature: string;
  readonly lockedCreature: string | null;
  readonly nmbrCreature: number;
  readonly name: string;
  readonly background: string;
  readonly decorations: Decorations;
  readonly totalCreaturesInZone: number;
}>;
export default function Enclosure({
  srcImgCreature,
  name,
  lockedCreature,
  nmbrCreature,
  background,
  decorations,
  totalCreaturesInZone,
}: EnclosureProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHungry, setIsHungry] = useState(false);
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
      case 'dark-beige':
        return 'bg-mythologic-dark-beige';
      case 'dark-green':
        return 'bg-shadow-green';
      case 'purple':
        return 'bg-shadow-purple';
    }
  };

  const decoPositionFour = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-[10%] left-[5%]';
      case 'top-right':
        return 'absolute top-[10%] left-[85%]';
      case 'bottom-left':
        return 'absolute top-[70%] left-[5%]';
      case 'bottom-right':
        return 'absolute top-[70%] left-[85%]';
      case 'top-center':
        return 'absolute top-[10%] center';
      default:
        return '';
    }
  };

  const decoPositionSix = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-5 left-[5%]';
      case 'top-right':
        return 'absolute top-5 left-[75%]';
      case 'bottom-left':
        return 'absolute top-60 left-[5%]';
      case 'bottom-right':
        return 'absolute bottom-10 left-[75%]';
      case 'top-center':
        return ' absolute top-5 center';
      default:
        return '';
    }
  };

  const isFour = totalCreaturesInZone === 4;
  const isSix = totalCreaturesInZone === 6;
  const sizeEnclos = isFour ? 'w-[50%]' : isSix ? 'w-[33.33%]' : '';
  const getPosition = isFour
    ? decoPositionFour
    : isSix
      ? decoPositionSix
      : () => '';

  //a utiliser quand la modale sera prete
  const handleModale = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`relative flex h-[50vh] ${sizeEnclos} flex-col justify-center p-4 ${getBackgound(background)} `}
    >
      {decorations.map((decoration) => (
        <img
          key={decoration.creature_id}
          className={`w-15 ${getPosition(decoration.position)}`}
          src={`/images/decorations/${decoration.src_image}`}
          alt=''
        />
      ))}
      <div
        onClick={handleModale}
        className='relative flex flex-col items-center justify-center gap-2'
      >
        <img
          className={`absolute top-1 w-10 ${isFour ? 'left-115' : 'left-80'} `}
          src={isLocked ? '' : isHungry ? alert : ''}
        />
        <img
          className={`w-30 ${isLocked ? '' : isHungry ? 'animate-none grayscale' : 'animate-move'}`}
          src={isLocked ? (lockedCreature ?? '') : srcImgCreature}
          alt=''
        />

        <h1 className={` ${isLocked ? 'absolute top-10' : 'hidden'} `}>
          {name}
        </h1>
        {!isLocked && (
          <ButtonBuy
            bg='bg-white/75'
            border='border border-black'
            cursor='pointer'
          >
            {nmbrCreature}
          </ButtonBuy>
        )}
      </div>
    </div>
  );
}
