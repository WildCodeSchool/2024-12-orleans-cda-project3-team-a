import type { Enclosure } from '@app/api';

import BgMenu from './bg-menu';
import BuyCreature from './buy-creature';
import CloseWindow from './close-window';
import CreatureLine from './creature-line';

type FeedModalProps = {
  readonly enclosure: Enclosure;
  readonly onClick: () => void;
};

export default function FeedModal({ enclosure, onClick }: FeedModalProps) {
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
      <div className='relative top-15 max-h-[90%] overflow-auto'>
        <BgMenu>
          <div className='absolute top-0 right-0 m-3'>
            <CloseWindow onClick={onClick} />
          </div>

          <div>
            <div className='m-3 flex w-full flex-wrap items-center justify-center gap-3 pt-2'>
              <BuyCreature creatureId={enclosure.id} />
              <BuyCreature creatureId={enclosure.id} />
              <BuyCreature creatureId={enclosure.id} />
            </div>
            <CreatureLine creatureId={enclosure.id} />
          </div>
        </BgMenu>
      </div>
    </>
  );
}
