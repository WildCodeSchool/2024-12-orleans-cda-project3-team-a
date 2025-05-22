import { useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

import EnclosureComponent from '@/components/enclosure';
import InfoNbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import { useGameInfoContext } from '@/contexts/game-info-context';
import useFetchBarriers from '@/hooks/use-fetch-barriers';
import Loader from '@/components/loader';
import Barrier from '@/components/barrier';

export default function WorldEnclosure() {
  const { creaturesEnclos, decorations } = useGameInfoContext();
  const { zone_id: zoneId } = useParams();
  const { barriers, isLoading, refetch } = useFetchBarriers();
  

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

      <div className='absolut min-h-200 min-w-200 z-3'>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {barriers.map((barrier) => {
                    return (
                      <Barrier
                        key={`${barrier.barrierId}`}
                        barrier={barrier}
                        refetch={refetch}
                      />
                    );
                  })}
                </>
              )}
      </div>
      <header className='fixed flex w-[94%] justify-end gap-3 p-2 sm:z-2 md:w-[98%]'>
        <InfoNbVisitorsMoons />
        <ReturnHome />
      </header>
    </div>
  );
}
