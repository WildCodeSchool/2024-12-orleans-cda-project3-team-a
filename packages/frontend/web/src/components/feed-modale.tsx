import type { Enclosure } from '@app/api';

import BgMenu from './bg-menu';
import BuyCreature from './buy-creature';
import CreatureLine from './creature-line';

type FeedModaleProps = {
  readonly enclosure: Enclosure;
  readonly onClose?: () => void;
};

export default function FeedModale({ enclosure, onClose }: FeedModaleProps) {
  return (
    <div className='absolute z-3'>
      <BgMenu>
        <div className='relative'>
          <button type='button' onClick={onClose} className=''>
            {'✕'}
          </button>
          <h2 className=''>{enclosure.species}</h2>
          <div className='flex gap-3'>
            <BuyCreature creatureId={3} />
            <BuyCreature creatureId={4} />
          </div>
          <CreatureLine />
        </div>
      </BgMenu>
    </div>
  );
}
