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
  const isBought = true;

  return (
    <div className='relative flex items-center'>
      {isBought ? (
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
        <>
          <img
            src={barrierIcon}
            alt='Barrier to buy'
            className='absolute z-0 w-16'
          />
          <div className='z-1'>
            <ButtonBuy>
              {'100'} <img src={moon} alt='' className='w-5' />
            </ButtonBuy>
          </div>
        </>
      )}
    </div>
  );
}
