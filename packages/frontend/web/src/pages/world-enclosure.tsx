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
import { enclosuresCount } from '@/utils/enclosures-count';

import pathHor from '../assets/images/background/path-hor.png';
import pathVert from '../assets/images/background/path-ver.png';

export default function WorldEnclosure() {
  const { creaturesEnclos, decorations, unlockedZones } = useGameInfoContext();
  const { zone_id: zoneId } = useParams();

  const { barriers, isLoading, refetch } = useFetchBarriers();
  const isUnlocked = unlockedZones.find(
    (unlockedZone) => unlockedZone.zone_id === Number(zoneId),
  );

  const total = creaturesEnclos.length;
  const { isFour, isSix } = enclosuresCount(total);

  //check if this zone is unlocked
  if (isUnlocked?.park_zone_id === null) {
    return <Navigate to='/home' />;
  }

  if (creaturesEnclos.length === 0 || decorations.length === 0) {
    return;
  }

  return (
    <div className='relative flex min-w-[1200px] flex-wrap overflow-hidden md:w-full'>
      <img
        src={pathHor}
        alt=''
        className='absolute top-1/2 z-2 min-w-[1200px] -translate-y-1/2'
      />
      {isFour ? (
        <img
          src={pathVert}
          alt=''
          className='absolute left-1/2 z-2 h-full -translate-x-1/2'
        />
      ) : isSix ? (
        <div>
          <img
            src={pathVert}
            alt=''
            className='absolute left-1/3 z-2 h-full -translate-x-1/2'
          />
          <img
            src={pathVert}
            alt=''
            className='absolute left-2/3 z-2 h-full -translate-x-1/2'
          />
        </div>
      ) : (
        ''
      )}

      <header className='fixed -right-2 z-5 flex gap-3 p-3 md:right-0'>
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

      <div className='absolute top-1/2 z-3 -translate-y-1/2'>
        <Link to='/visitors'>
          <Visitor zoneId={zoneId} />
        </Link>
      </div>
    </div>
  );
}
