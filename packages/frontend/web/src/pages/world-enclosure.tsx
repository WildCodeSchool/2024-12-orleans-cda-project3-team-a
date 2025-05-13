import { useParams } from 'react-router-dom';

import Enclosure from '@/components/enclosure';
import InfoNbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import { useGameInfoContext } from '@/contexts/game-info-context';

export default function WorldEnclosure() {
  const { creaturesEnclos, decorElements } = useGameInfoContext();
  const { zone_id: zoneid } = useParams();
  const zoneId = Number(zoneid);

  const creatureWorld = creaturesEnclos.filter(
    (creature) => creature.zone_id === zoneId,
  );

  const total = creatureWorld.length;

  return (
    <div className='flex h-[50vh] min-w-[1200px] flex-wrap md:w-full'>
      {creatureWorld.map((creature) => {
        const decorations = decorElements.filter(
          (decoration) => decoration.creature_id === creature.id,
        );

        return (
          <Enclosure
            key={creature.id}
            name={creature.species}
            srcImgCreature={`/images/creatures/${creature.src_image}`}
            lockedCreature={`/images/creatures/${creature.src_sign}`}
            background={creature.background}
            nmbrCreature={Number(creature.nmbrCreature)}
            decorations={decorations}
            totalCreaturesInZone={total}
          />
        );
      })}
      <header className='fixed flex w-[94%] justify-end gap-3 p-2 sm:z-2 md:w-[98%]'>
        <InfoNbVisitorsMoons />
        <ReturnHome />
      </header>
    </div>
  );
}
