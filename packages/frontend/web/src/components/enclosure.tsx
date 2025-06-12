import { useState } from 'react';

import type { Decorations } from '@app/api';
import type { Enclosure } from '@app/api';

import useCreatures from '@/hooks/use-creatures';
<<<<<<< HEAD
import { enclosuresCount } from '@/utils/enclosures-count';
=======
import { getBackgroundEnclosure } from '@/utils/get-background-enclosure';
import { getPositionCreatures } from '@/utils/get-position-creatures';
>>>>>>> 3609073ec89b38168fbddc46081400044895e66c

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
    useCreatures(enclosures.id, enclosures.zone_id);
  const { isFour, isSix } = enclosuresCount(totalCreaturesInZone);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnclosureClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const totalInactive = Number(
    inactiveCreatures?.total_inactive_creatures ?? 0,
  );
  const isHungry = totalInactive > 0;

<<<<<<< HEAD
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
=======
  const isFour = totalCreaturesInZone === 4;
  const isSix = totalCreaturesInZone === 6;
>>>>>>> 3609073ec89b38168fbddc46081400044895e66c

  const sizeEnclos = isFour ? 'w-1/2' : isSix ? 'w-1/3' : '';

  return (
    <div
      className={`relative flex h-[50vh] ${sizeEnclos} cursor-pointer flex-col justify-center p-4 ${getBackgroundEnclosure(enclosures.background)} `}
      onClick={() => {
        if (!isModalOpen) {
          handleEnclosureClick();
        }
      }}
    >
      {decorations.map((decoration) => (
        <img
          key={decoration.creature_id}
          className={`w-15 ${getPositionCreatures(totalCreaturesInZone, decoration.position)}`}
          src={`/images/decorations/${decoration.src_image}`}
          alt={decoration.name}
        />
      ))}
      <div className='relative flex flex-col items-center justify-center gap-2'>
        <img
          className={`absolute top-1 w-8 ${isFour ? 'left-3/5' : 'left-13/20'} ${isLocked ? '' : isHungry ? 'animate-alert' : ''}`}
          src={isLocked ? '' : isHungry ? alert : ''}
        />
        <img
          className={`w-30 ${isLocked ? '' : isHungry ? 'animate-none grayscale' : 'animate-move'}`}
          src={`/images/creatures/${isLocked ? enclosures.src_sign : enclosures.src_image}   `}
          alt={`${isLocked ? 'creature locked' : enclosures.species}   `}
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
      {isModalOpen ? (
        <Portal>
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <FeedModal
              enclosure={enclosures}
              onClick={handleClose}
              potionPrice={potionPrice}
              fetchCreatures={refetchCreature}
              creatures={creatures}
            />
          </div>
        </Portal>
      ) : null}
    </div>
  );
}
