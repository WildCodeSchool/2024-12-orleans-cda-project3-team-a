import { useEffect, useState } from 'react';

import { useGameInfoContext } from '@/contexts/game-info-context';

import barrierIcon from '../assets/images/deco/barrier.png';
import directionDown from '../assets/images/deco/direction-down.png';
import directionLeft from '../assets/images/deco/direction-left.png';
import directionRight from '../assets/images/deco/direction-right.png';
import directionUp from '../assets/images/deco/direction-up.png';
import moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type BarrierProps = {
  readonly direction:
    | 'directionDown'
    | 'directionLeft'
    | 'directionRight'
    | 'directionUp';
};

export default function Barrier({ direction }: BarrierProps) {
  //faire une requete pr savoir si c'est acheté ou non, ce qui permettra d'afficher ou non la direction
  const [isBought, setIsBought] = useState(false);
  const [isEnoughMooney, setIsEnoughMooney] = useState(false);

  const { wallet } = useGameInfoContext();
  const walletNumber = parseInt(wallet);
  const barrierPrice = 300;

  //Check if user has enough money
  useEffect(() => {
    if (walletNumber > barrierPrice) {
      setIsEnoughMooney(true);
    }
  }, [walletNumber]);

  const buyBarrier = () => {
    if (isEnoughMooney) {
      //Supprimer la barrière en travaux dans park_decorations
      //Ajouter la barriere direction dans park_decorations
      //Retirer l'argent dans wallet et dans bdd
      setIsBought(true);
    }
  };

  return (
    <div className='relative flex items-center'>
      {isBought ? (
        // IF is bought -> display the correct picture for the direction thanks to the props
        <img
          src={
            direction === 'directionUp'
              ? directionUp
              : direction === 'directionDown'
                ? directionDown
                : direction === 'directionRight'
                  ? directionRight
                  : directionLeft
          }
          alt=''
          className='w-16'
        />
      ) : (
        // IF is NOT bought->  display the barrier in construction and display price to buy it
        <>
          <img
            src={barrierIcon}
            alt='Barrier to buy'
            className='absolute z-0 w-16'
          />

          {/* if not enough mooney display in grey the amount and the moon */}
          <div
            title={
              isEnoughMooney ? 'click to buy this barrier' : 'not enough mooney'
            }
            className={`z-1 ${!isEnoughMooney ? 'text-gray-400 grayscale-100' : ''}`}
            onClick={buyBarrier}
          >
            {/* //créer la logique pour déduire l'argent de cette barrière dans le wallet */}
            <ButtonBuy bg='bg-[rgba(255,255,255,0.65)]'>
              {barrierPrice} <img src={moon} alt='' className={`w-5`} />
            </ButtonBuy>
          </div>
        </>
      )}
    </div>
  );
}
