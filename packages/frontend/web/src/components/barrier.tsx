import type { Barrier } from '@app/api/src/game/get.barriers-route';

import { useGameInfoContext } from '@/contexts/game-info-context';
import { useNumberFormatter } from '@/hooks/use-number-formatter';

import barrierIcon from '../assets/images/deco/barrier.png';
import directionDown from '../assets/images/deco/direction-down.png';
import directionLeft from '../assets/images/deco/direction-left.png';
import directionRight from '../assets/images/deco/direction-right.png';
import directionUp from '../assets/images/deco/direction-up.png';
import moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

const API_URL = import.meta.env.VITE_API_URL;

type BarrierProps = {
  readonly barrier: Barrier;
  readonly refetch: () => Promise<void>;
};

export default function Barrier({ barrier, refetch }: BarrierProps) {
  const { wallet } = useGameInfoContext();
  const isEnoughMooney = wallet > barrier.price;
  const priceFormatted = useNumberFormatter(barrier.price);

  const buyBarrier = async () => {
    //Buy only if we have enough mooney
    if (!isEnoughMooney) return;

    try {
      const response = await fetch(`${API_URL}/game/barrier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barrierId: barrier.barrierId,
        }),
        // credentials: 'include',
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
                : barrier.position === 'center-right'
                  ? 'top-1/2 right-0 -translate-y-1/2'
                  : ''
      } absolute transform`}
    >
      {/* if we have an id (=parkBarrierId) in park_barriers we display the right direction else display the barrier in construction */}
      {barrier.parkBarrierId !== null ? (
        // <div>We check what is the correct direction to display
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
      ) : (
        // display the barrier in construction
        <div className='relative flex items-center justify-center'>
          <img src={barrierIcon} alt='Barrier to buy' className='w-16' />
          <div
            title={
              isEnoughMooney ? 'click to buy this barrier' : 'not enough mooney'
            }
            className={`absolute ${!isEnoughMooney ? 'text-gray-500 grayscale-100' : ''}`}
            onClick={buyBarrier}
          >
            <ButtonBuy
              bg='bg-white/75'
              cursor={!isEnoughMooney ? 'not-allowed' : 'pointer'}
            >
              {priceFormatted}
              <img src={moon} alt='mooney' className={`w-5`} />
            </ButtonBuy>
          </div>
        </div>
      )}
    </div>
  );
}
