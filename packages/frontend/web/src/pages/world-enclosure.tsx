import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

import Barrier from '@/components/barrier';
import EnclosureComponent from '@/components/enclosure';
import FeedModal from '@/components/feed-modal';
import Loader from '@/components/loader';
import InfoNbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import { useGameInfoContext } from '@/contexts/game-info-context';
import useFetchBarriers from '@/hooks/use-fetch-barriers';

export default function WorldEnclosure() {
  const { creaturesEnclos, decorations } = useGameInfoContext();
  const { zone_id: zoneId } = useParams();

  console.log(creaturesEnclos);

  const [selectedEnclosure, setSelectedEnclosure] = useState<Enclosure | null>(
    null,
  );
  const { barriers, isLoading, refetch } = useFetchBarriers();

  const creatureWorld = creaturesEnclos.filter(
    (creature: Enclosure) => creature.zone_id === Number(zoneId),
  );
  const total = creatureWorld.length;

  const handleEnclosureClick = (enclosure: Enclosure) => {
    setSelectedEnclosure(enclosure);
  };

  const handleClose = () => {
    setSelectedEnclosure(null);
  };

  return (
    <div className='relative flex min-w-[1200px] flex-wrap md:w-full'>
      <header className='fixed -right-2 z-3 flex w-48 gap-3 p-2 md:right-0'>
        <InfoNbVisitorsMoons />
        <ReturnHome />
      </header>
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
            onClick={() => {
              handleEnclosureClick(enclosure);
            }}
          />
        );
      })}
      {selectedEnclosure ? (
        <div className='absolute flex h-screen w-[98%] justify-center pb-6 text-center text-xs md:text-base'>
          <FeedModal enclosure={selectedEnclosure} onClick={handleClose} />
        </div>
      ) : null}

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
  );
}
