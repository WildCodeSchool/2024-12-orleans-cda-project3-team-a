import type { Enclosure } from '@app/api';
import type { Creatures } from '@app/api';

import BgMenu from './bg-menu';
import BuyCreature from './buy-creature';
import CloseWindow from './close-window';
import CreatureLine from './creature-line';
import FeedCreatures from './feed-all-creatures';

type FeedModalProps = {
  readonly enclosure: Enclosure;
  readonly onClick: () => void;
  readonly potionPrice: number;
  readonly fetchCreatures: () => Promise<void>;
  readonly creatures: Creatures;
};

export default function FeedModal({
  enclosure,
  onClick,
  potionPrice,
  fetchCreatures,
  creatures,
}: FeedModalProps) {
  return (
    <>
      {/* 'Display quantity creature in header' */}
      <div className='bg-primary-gray absolute top-1.5 left-2 flex items-center justify-center gap-3 rounded-lg p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-10 md:w-20'>
        <p>{enclosure.quantityCreature}</p>
        <img
          className='w-7'
          src={`/images/creatures/${enclosure.src_image}`}
          alt=''
        />
      </div>
      {/* Display content of Feed Modal */}
      {
        //transparent bg to disable the click of several modals
      }
      <div className='fixed top-0 left-0 z-40 h-full w-full bg-transparent'>
        <div className='absolute top-15 left-[5%] max-h-[90%] w-[90%] overflow-auto'>
          <BgMenu>
            <div className='absolute top-0 right-0 m-3'>
              <CloseWindow onClick={onClick} />
            </div>

            <div>
              <div className='m-0 flex w-full flex-wrap items-center justify-center gap-2 pt-2 md:m-3 md:gap-3'>
                <BuyCreature
                  creatureId={enclosure.id}
                  fetchCreatures={fetchCreatures}
                />
                <FeedCreatures
                  creatures={creatures}
                  fetchCreatures={fetchCreatures}
                  potionPrice={potionPrice}
                  creatureId={enclosure.id}
                />
              </div>
              <CreatureLine
                creatures={creatures}
                potionPrice={potionPrice}
                fetchCreatures={fetchCreatures}
              />
            </div>
          </BgMenu>
        </div>
      </div>
    </>
  );
}
