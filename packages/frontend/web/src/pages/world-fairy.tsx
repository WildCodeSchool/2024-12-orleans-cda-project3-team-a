import { useState } from 'react';

import Enclosure from '@/components/enclosure';
import { useGameInfoContext } from '@/contexts/game-info-context';

export default function Fairy() {
  const [selectedZoneId, setSelectedZoneId] = useState(1);

  const { creatures } = useGameInfoContext();
  return (
    <div className='grid-col-2 grid min-w-[1600px]'>
      <div className='flex flex-row'>
        {creatures
          .filter((creature) => creature.zone_id === selectedZoneId)
          .map((creature) => (
            <Enclosure
              key={creature.id}
              name={creature.species}
              srcImgCreature={`/images/creatures/${creature.src_image}`}
              lockedCreature={`/images/creatures/${creature.src_sign}`}
              background={creature.background}
              price={creature.price}
              nmbrCreature={Number(creature.nmbrCreature)}
              srcImgDeco1={`/image/decoration$`}
              srcImgDeco2='/path/to/deco2.png'
              positionDeco1={10}
              positionDeco2={20}
            />
          ))}
      </div>
    </div>
  );
}
