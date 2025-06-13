import { useState } from 'react';

import type { Decorations } from '@app/api';
import type { Enclosure } from '@app/api';

import useCreatures from '@/hooks/use-creatures';
import { enclosuresCount } from '@/utils/enclosures-count';
import { getBackgroundEnclosure } from '@/utils/get-background-enclosure';
import { getPositionCreatures } from '@/utils/get-position-creatures';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isFour, isSix } = enclosuresCount(totalCreaturesInZone);

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
            {enclosures.quantityCreature.toLocaleString()}
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
