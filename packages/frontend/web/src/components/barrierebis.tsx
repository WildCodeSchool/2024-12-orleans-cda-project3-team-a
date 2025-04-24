import { useEffect, useState } from 'react';

import { useGameInfoContext } from '@/contexts/game-info-context';

import barrierIcon from '../assets/images/deco/barrier.png';
import directionDown from '../assets/images/deco/direction-down.png';
import directionLeft from '../assets/images/deco/direction-left.png';
import directionRight from '../assets/images/deco/direction-right.png';
import directionUp from '../assets/images/deco/direction-up.png';
import moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type BarrierCardProps = {
  readonly barrier: {
    id: number;
    name: string;
    deco_id?: number | null;
    position: string;
    direction: string;
    price: number;
  };
};

export default function BarrierBis({ barrier }: BarrierCardProps) {
  //   const [isEnoughMooney, setIsEnoughMooney] = useState(true);
  const { wallet } = useGameInfoContext();

  const isEnoughMooney = wallet > barrier.price;
  console.log('mon wallet : ', wallet);

  const buyBarrier = () => {
    console.log('acheter barriere');
  };

  return (
    //Whatever the situation is unlock or not, we have to display it depending the position in bdd
    <div
      className={`${
        barrier.position === 'top-left'
          ? 'top-0 left-1/3 -translate-x-1/2'
          : barrier.position === 'top-right'
            ? 'top-0 left-2/3 -translate-x-1/2'
            : barrier.position === 'bottom-center'
              ? 'bottom-0 left-1/2 -translate-x-1/2'
              : barrier.position === 'center-left'
                ? 'top-1/2 left-0 -translate-y-1/2'
                : 'top-1/2 right-0 -translate-y-1/2'
      } absolute transform`}
    >
      {/* if we have a line in park_decoration we display the right direction  */}
      {Boolean(barrier.deco_id) ? (
        <div>
          {/* <p>
            {barrier.name}
            {barrier.direction}
          </p> */}
          {/* We check what is the correct direction to display */}
          <img
            src={
              barrier.direction === 'up'
                ? directionUp
                : barrier.direction === 'down'
                  ? directionDown
                  : barrier.direction === 'right'
                    ? directionRight
                    : directionLeft
            }
            alt='direction'
            className='w-16'
          />
        </div>
      ) : (
        // If barrier is locked we display the barrier in construction to buy
        <div className='relative'>
          <img src={barrierIcon} alt='Barrier to buy' className='w-16' />
          <div
            title={
              isEnoughMooney ? 'click to buy this barrier' : 'not enough mooney'
            }
            className={`absolute top-1/2 z-1 -translate-y-1/2 ${!isEnoughMooney ? 'text-gray-500 grayscale-100' : ''} `}
            onClick={buyBarrier}
          >
            {/* //créer la logique pour déduire l'argent de cette barrière dans le wallet */}
            <ButtonBuy bg='bg-[rgba(255,255,255,0.75)]'>
              {barrier.price} <img src={moon} alt='mooney' className={`w-5`} />
            </ButtonBuy>
          </div>
        </div>
      )}
    </div>
  );
}
