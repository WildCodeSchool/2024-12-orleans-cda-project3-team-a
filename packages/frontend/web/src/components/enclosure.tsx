import { useState } from 'react';

import type { Decorations } from '@app/api';
import type { Enclosure } from '@app/api';

import useCreatures from '@/hooks/use-creatures';

import alert from '../assets/images/icons-buttons/alert.png';
import ButtonBuy from './button-buy';
import FeedModal from './feed-modal';
import Portal from './portal';

type EnclosureProps = {
  readonly decorations: Decorations;
  readonly totalCreaturesInZone: number;
  readonly enclosures: Enclosure;
};

export default function Enclosure({
  decorations,
  totalCreaturesInZone,
  enclosures,
}: EnclosureProps) {
  const isLocked = enclosures.quantityCreature === 0;
  const { inactiveCreatures, refetchCreature, creatures, potionPrice } =
    useCreatures(enclosures.id);
  const [selectedEnclosure, setSelectedEnclosure] = useState<Enclosure | null>(
    null,
  );

  const handleEnclosureClick = (enclosure: Enclosure) => {
    setSelectedEnclosure(enclosure);
  };

  const handleClose = () => {
    setSelectedEnclosure(null);
  };

  const totalInactive = Number(
    inactiveCreatures?.total_inactive_creatures ?? 0,
  );
  const isHungry = totalInactive > 0;

  const getBackground = (background: string) => {
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
        return 'absolute top-1/10 left-1/20';
      case 'top-right':
        return 'absolute top-1/10 left-17/20';
      case 'bottom-left':
        return 'absolute top-7/10 left-1/20';
      case 'bottom-right':
        return 'absolute top-7/10 left-17/20';
      case 'top-center':
        return 'absolute top-1/10 center';
      default:
        return '';
    }
  };

  const decoPositionSix = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-5 left-1/20';
      case 'top-right':
        return 'absolute top-5 left-3/4';
      case 'bottom-left':
        return 'absolute top-60 left-1/20';
      case 'bottom-right':
        return 'absolute bottom-10 left-3/4';
      case 'top-center':
        return 'absolute top-5 center';
      default:
        return '';
    }
  };

  const isFour = totalCreaturesInZone === 4;
  const isSix = totalCreaturesInZone === 6;
  const sizeEnclos = isFour ? 'w-1/2' : isSix ? 'w-1/3' : '';
  const getPosition = isFour
    ? decoPositionFour
    : isSix
      ? decoPositionSix
      : () => '';
  return (
    <div
      className={`relative flex h-[50vh] ${sizeEnclos} flex-col justify-center p-4 ${getBackground(enclosures.background)} `}
      onClick={() => {
        if (!selectedEnclosure) {
          handleEnclosureClick(enclosures);
        }
      }}
    >
      {decorations.map((decoration) => (
        <img
          key={decoration.creature_id}
          className={`w-15 ${getPosition(decoration.position)}`}
          src={`/images/decorations/${decoration.src_image}`}
          alt=''
        />
      ))}
      <div className='relative flex flex-col items-center justify-center gap-2'>
        <img
          className={`absolute top-1 w-10 ${isFour ? 'left-115' : 'left-80'} `}
          src={isLocked ? '' : isHungry ? alert : ''}
        />
        <img
          className={`w-30 ${isLocked ? '' : isHungry ? 'animate-none grayscale' : 'animate-move'}`}
          src={`/images/creatures/${isLocked ? enclosures.src_sign : enclosures.src_image}   `}
          alt=''
        />

        <h1 className={` ${isLocked ? 'absolute top-10' : 'hidden'} `}>
          {enclosures.species}
        </h1>
        {!isLocked && (
          <ButtonBuy
            bg='bg-white/75'
            border='border border-black'
            cursor='pointer'
          >
            {enclosures.quantityCreature}
          </ButtonBuy>
        )}
      </div>
      {selectedEnclosure ? (
        <div
          className='flex flex-wrap items-center justify-center'
          onClick={handleClose}
        >
          <div
            className='absolute z-5'
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Portal>
              <FeedModal
                enclosure={selectedEnclosure}
                onClick={handleClose}
                potionPrice={potionPrice}
                fetchCreatures={refetchCreature}
                creatures={creatures}
              />
            </Portal>
          </div>
        </div>
      ) : null}
    </div>
  );
}
