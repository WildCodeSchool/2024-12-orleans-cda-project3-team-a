import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Enclosure } from '@app/api';

import EnclosureComponent from '@/components/enclosure';
import FeedModale from '@/components/feed-modale';
import InfoNbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import { useGameInfoContext } from '@/contexts/game-info-context';

export default function WorldEnclosure() {
  const { creaturesEnclos, decorations } = useGameInfoContext();
  const { zone_id: zoneId } = useParams();

  const [selectedEnclosure, setSelectedEnclosure] = useState<Enclosure | null>(
    null,
  );

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
    <div className='flex min-w-[1200px] flex-wrap md:w-full'>
      <header className='fixed flex w-[94%] justify-end gap-3 p-2 sm:z-2 md:w-[98%]'>
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
      {selectedEnclosure !== null && (
        <FeedModale enclosure={selectedEnclosure} onClose={handleClose} />
      )}
    </div>
  );
}
