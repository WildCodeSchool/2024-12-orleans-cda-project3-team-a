import { Link, Navigate, useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

import Barrier from '@/components/barrier';
import EnclosureComponent from '@/components/enclosure';
import Loader from '@/components/loader';
import InfoNbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import Visitor from '@/components/visitor';
import { useGameInfoContext } from '@/contexts/game-info-context';
import useFetchBarriers from '@/hooks/use-fetch-barriers';

import pathOfFourHor from '../assets/images/background/path-of-four-hor.png';
import pathOfFourVert from '../assets/images/background/path-of-four-ver.png';

export default function WorldEnclosure() {
  const { creaturesEnclos, decorations, unlockedZones } = useGameInfoContext();
  const { zone_id: zoneId } = useParams();

  const { barriers, isLoading, refetch } = useFetchBarriers();
  const isUnlocked = unlockedZones.find(
    (unlockedZone) => unlockedZone.zone_id === Number(zoneId),
  );

  //check if this zone is unlocked
  if (isUnlocked?.park_zone_id === null) {
    return <Navigate to='/home' />;
  }

  if (creaturesEnclos.length === 0 || decorations.length === 0) {
    return;
  }
  const total = creaturesEnclos.length;

  return (
    <div className='relative flex min-w-[1200px] flex-wrap overflow-hidden md:w-full'>
      <img
        src={pathOfFourHor}
        alt=''
        className='absolute z-2 min-w-[1200px] top-1/2 -translate-y-1/2'
      />
      <img
        src={pathOfFourVert}
        alt=''
        className='absolute z-2 h-full left-1/2 -translate-x-1/2'
      />
      <header className='fixed -right-2 z-2 flex gap-3 p-3 md:right-0'>
        <InfoNbVisitorsMoons />
        <ReturnHome />
      </header>
      {creaturesEnclos.map((enclosure: Enclosure) => {
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
      
      {isLoading ? (
        <Loader />
      ) : (
        <div className='z-4'>
          {barriers.map((barrier) => {
            return (
              <Barrier
                key={`${barrier.barrierId}`}
                barrier={barrier}
                refetch={refetch}
              />
            );
          })}
        </div>
      )}

      <div className='absolute top-1/2 -translate-y-1/2 z-3'>
        <Link to='/visitors'>
          <Visitor zoneId={zoneId} />
        </Link>
      </div>
    </div>
  );
}
