import { useParams } from 'react-router-dom';

import Enclosure from '@/components/enclosure';
import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import Menu from '@/components/menu';
import ReturnHome from '@/components/return-home';
import { useGameInfoContext } from '@/contexts/game-info-context';

export default function WorldEnclosure() {
  const { creatures, decorElements } = useGameInfoContext();
  const { zone_id } = useParams();
  const zoneId = Number(zone_id);

  const creatureWorld = creatures.filter(
    (creature) => creature.zone_id === zoneId,
  );

  const total = creatureWorld.length;

  return (
    <div className='flex h-[100vh] min-w-[1200px] flex-wrap md:w-full'>
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
      <div className='fixed flex w-[94%] justify-between gap-3 p-2 sm:z-2 md:w-[98%]'>
        <Menu />
        <InfoNbVisitorsMoons />
        <ReturnHome />
      </div>
    </div>
  );
}
