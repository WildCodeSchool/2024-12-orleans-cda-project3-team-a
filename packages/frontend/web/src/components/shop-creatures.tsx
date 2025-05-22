import { useState } from 'react';

import { useGameInfoContext } from '@/contexts/game-info-context';
import useEnclosures from '@/hooks/use-enclos';

import BgMenu from './bg-menu';
import Creature from './creatures';

export default function ShopCreature() {
  const { creaturesEnclos } = useEnclosures();
  const { unlockedZones } = useGameInfoContext();

  const [selectedZoneId, setSelectedZoneId] = useState<number>();

  const creaturesInZone = creaturesEnclos.filter(
    (creature) => creature.zone_id === selectedZoneId,
  );

  return (
    <BgMenu>
      <div className='mb-4 flex justify-center gap-4'>
        {unlockedZones.map((zone) => (
          <button
            key={zone.zone_id}
            type='button'
            onClick={() => {
              setSelectedZoneId(zone.zone_id);
            }}
          >
            <img
              src={`/images/logo/${zone.src_image}`}
              alt=''
              className='h-25 border-2 p-2'
            />
          </button>
        ))}
      </div>
      <div>
        {creaturesInZone.map((creature) => (
          <Creature key={creature.id} creature={creature} />
        ))}
      </div>
    </BgMenu>
  );
}
