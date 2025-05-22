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
    <div>
      <div className='bg-primary-gray absolute top-1.5 left-2 flex items-center justify-center gap-3 rounded-lg p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-10 md:w-20'>
        <p>{enclosure.quantityCreature}</p>
        <img
          className='w-7'
          src={`/images/creatures/${enclosure.src_image}`}
          alt=''
        />
      </div>
      <div className='fixed top-6 left-0 z-2 flex h-screen w-screen items-center justify-center'>
        <BgMenu>
          <div className='flex flex-row-reverse'>
            <CloseWindow onClick={onClick} />
          </div>

          <div>
            <div className='flex gap-3 pt-2'>
              <BuyCreature creatureId={enclosure.id} />
            </div>
            <CreatureLine creatureId={enclosure.id} />
          </div>
        </BgMenu>
      </div>
    </div>
  );
}
