import { useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

import EnclosureComponent from '@/components/enclosure';
import InfoNbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import { useGameInfoContext } from '@/contexts/game-info-context';

export default function WorldEnclosure() {
  const { creaturesEnclos, decorations } = useGameInfoContext();
  const { zone_id: zoneId } = useParams();

  const creatureWorld = creaturesEnclos.filter(
    (creature: Enclosure) => creature.zone_id === Number(zoneId),
  );
  const total = creatureWorld.length;

  return (
    
    <div className='flex min-w-[1200px] flex-wrap md:w-full'>
      {creatureWorld.map((enclosure: Enclosure) => {
        const decorationsList = decorations.filter(
          (decoration) => decoration.creature_id === enclosure.id,
        );

        return (
          <EnclosureComponent
            key={enclosure.id}
            enclosures={enclosure}
            decorations={decorationsList}
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
