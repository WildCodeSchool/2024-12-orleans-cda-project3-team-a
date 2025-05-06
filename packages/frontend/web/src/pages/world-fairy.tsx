import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Enclosure from '@/components/enclosure';
import { useGameInfoContext } from '@/contexts/game-info-context';

export default function Fairy() {
  const [selectedZoneId, setSelectedZoneId] = useState(1);
  const { creatures, decorElements } = useGameInfoContext();

  // const useLink = () => {
  //   const  {zone}  = useParams();
  //   const zoneId = ;
  // };

  const { zone_id } = useParams();
  const zoneId = Number(zone_id);

  const creatureWorld = creatures.filter(
    (creature) => creature.zone_id === zoneId,
  );
  // console.log(zoneId)
  return (
    <div className='grid-col-2 grid min-w-[1600px]'>
      <div className='flex-cols flex'>
        {creatureWorld.map((creature) => {
          const decorationsCreature = decorElements.filter(
            (decoration) => decoration.creature_id === creature.id,
          );
          // console.log(creature.id)

          return (
            <Enclosure
              key={creature.id}
              name={creature.species}
              srcImgCreature={`/images/creatures/${creature.src_image}`}
              lockedCreature={`/images/creatures/${creature.src_sign}`}
              background={creature.background}
              price={creature.price}
              nmbrCreature={Number(creature.nmbrCreature)}
              decorations={decorationsCreature}
              totalCreaturesInZone={creatureWorld.length}
            />
          );
        })}
      </div>
    </div>
  );
}
