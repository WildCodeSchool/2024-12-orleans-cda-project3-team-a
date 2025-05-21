import type { Enclosure } from '@app/api';

import Close from '../assets/images/icons-buttons/close.png';
import BgMenu from './bg-menu';
import BuyCreature from './buy-creature';
import CreatureLine from './creature-line';

type FeedModaleProps = {
  readonly enclosure: Enclosure;
  readonly onClose?: () => void;
};

export default function FeedModale({ enclosure, onClose }: FeedModaleProps) {
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
          <header className='flex flex-row-reverse'>
            <button
              type='button'
              onClick={onClose}
              className='bg-secondary-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-9 md:w-9 md:rounded-md'
            >
              <img className='w-5' src={Close} alt='' />
            </button>
          </header>
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
