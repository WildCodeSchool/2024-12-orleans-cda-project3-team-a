import { Link, useParams } from 'react-router-dom';

import type { Barrier } from '@app/api';

import { useGameInfoContext } from '@/contexts/game-info-context';
import { useNumberFormatter } from '@/hooks/use-number-formatter';

import barrierIcon from '../assets/images/deco/barrier.png';
import directionDown from '../assets/images/deco/direction-down.png';
import directionLeft from '../assets/images/deco/direction-left.png';
import directionRight from '../assets/images/deco/direction-right.png';
import directionUp from '../assets/images/deco/direction-up.png';
import moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type BarrierProps = {
  readonly barrier: Barrier;
  readonly refetch: () => Promise<void>;
};

export default function Barrier({ barrier, refetch }: BarrierProps) {
  const { wallet } = useGameInfoContext();
  const hasEnoughMoons = wallet > barrier.price;
  const priceFormatted = useNumberFormatter(barrier.price);

  const buyBarrier = async () => {
    //Buy only if we have enough money
    if (!hasEnoughMoons) return;

    try {
      const response = await fetch(`/api/game/barriers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barrierId: barrier.barrierId,
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

  const getPositionClass = (position: string | null) => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-1/3 -translate-x-1/2';
      case 'top-right':
        return 'top-0 left-2/3 -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-0 left-1/2 -translate-x-1/2';
      case 'center-left':
        return 'top-1/2 left-0 -translate-y-1/2';
      case 'center-right':
        return 'top-1/2 right-0 -translate-y-1/2';
      default:
        return '';
    }
  };

  const positionClass = getPositionClass(barrier.position);

  return (
    <div className={`${positionClass} absolute z-2 transform`}>
      {/*Check if we have already bought the direction */}
      {barrier.parkBarrierId !== null ? (
        // display the right direction
        <Link to={`/zone/${barrier.link_world}`}>
          <img
            src={
              barrier.direction === 'up'
                ? directionUp
                : barrier.direction === 'down'
                  ? directionDown
                  : barrier.direction === 'right'
                    ? directionRight
                    : barrier.direction === 'left'
                      ? directionLeft
                      : ''
            }
            alt='direction'
            className='w-16'
          />
        </Link>
      ) : (
        // display the barrier in construction
        <div className='relative flex items-center justify-center'>
          <img src={barrierIcon} alt='Barrier to buy' className='w-16' />
          <div
            title={
              hasEnoughMoons ? 'click to buy this barrier' : 'not enough money'
            }
            className={`absolute ${!hasEnoughMoons ? 'text-gray-500 grayscale-100' : ''}`}
            onClick={buyBarrier}
          >
            <ButtonBuy
              bg='bg-white/75'
              cursor={!hasEnoughMoons ? 'not-allowed' : 'pointer'}
            >
              {priceFormatted}
              <img src={moon} alt='money' className={`w-5`} />
            </ButtonBuy>
          </div>
        </div>
      )}
    </div>
  );
}
