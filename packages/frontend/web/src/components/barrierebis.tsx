import barrierIcon from '../assets/images/deco/barrier.png';
import directionDown from '../assets/images/deco/direction-down.png';
import directionLeft from '../assets/images/deco/direction-left.png';
import directionRight from '../assets/images/deco/direction-right.png';
import directionUp from '../assets/images/deco/direction-up.png';

type BarrierCardProps = {
  readonly barrier: {
    id: number;
    name: string;
    deco_id?: number | null;
    src_image: string;
    position: string;
  };
};

export default function BarrierBis({ barrier }: BarrierCardProps) {
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
              barrier.src_image === 'direction-up.png'
                ? directionUp
                : barrier.src_image === 'direction-down.png'
                  ? directionDown
                  : barrier.src_image === 'direction-right.png'
                    ? directionRight
                    : directionLeft
            }
            alt='direction'
            className='w-16'
          />
        </div>
      ) : (
        // If barrier is locked we display the barrier in construction to buy
        <img src={barrierIcon} alt='Barrier icon' className='w-16' />
      )}
    </div>
  );
}
