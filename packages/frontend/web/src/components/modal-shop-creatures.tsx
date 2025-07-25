import { useState } from 'react';

import { useGameInfoContext } from '@/contexts/game-info-context';

import BgMenu from './bg-menu';
import CloseWindow from './close-window';
import LineCreature from './line-shop-creature';

type ModalShopCreatures = {
  readonly closeShop: () => void;
};

export default function ModalShopCreatures({ closeShop }: ModalShopCreatures) {
  const { unlockedZones: zones, creaturesMenu } = useGameInfoContext();

  const [selectedZoneId, setSelectedZoneId] = useState<number>(1);

  const creaturesInZone = creaturesMenu.filter(
    (creature) => creature.zone_id === selectedZoneId,
  );

  const isScreen = window.innerWidth < 768;

  return (
    <div className='relative mb-15 overflow-y-auto md:min-w-[80%]'>
      <BgMenu>
        <div className='flex flex-row-reverse'>
          <CloseWindow onClick={closeShop} />
        </div>
        <div>
          <h1 className='font-aerokids text-outline-white mb-4 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-4xl text-transparent md:mb-10 md:text-6xl'>
            {'Shop'}
          </h1>
        </div>
        {isScreen ? (
          <div className='flex flex-col items-center justify-center'>
            <label className='text-secondary-blue mb-2 italic'>
              {'Choose the world'}
            </label>
            <select
              value={selectedZoneId}
              onChange={(event) => {
                setSelectedZoneId(Number(event.target.value));
              }}
              className='flex flex-col rounded-md border-1'
            >
              {zones.map((zone) => (
                <option
                  value={zone.zone_id}
                  key={zone.zone_id}
                  disabled={zone.park_zone_id === null}
                >
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className='mb-10 flex justify-center gap-[5%]'>
            {zones.map((zone) => (
              <button
                key={zone.zone_id}
                type='button'
                onClick={() => {
                  setSelectedZoneId(zone.zone_id);
                }}
                disabled={zone.park_zone_id === null}
                className='flex h-20 w-[15%] cursor-pointer items-center justify-center rounded-md border bg-[linear-gradient(to_bottom,_#FFFFFF,_#D8D8D8)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
              >
                <img
                  src={`/images/logo/${zone.src_image}`}
                  alt={zone.name}
                  className={`h-[90%] ${zone.park_zone_id === null ? 'cursor-not-allowed grayscale' : ''}`}
                />
              </button>
            ))}
          </div>
        )}
        <div className='relative top-3 mb-6 flex min-w-0 flex-col gap-10 md:top-5 md:grid md:grid-cols-2'>
          {creaturesInZone.map((creature) => (
            <LineCreature key={creature.id} creature={creature} />
          ))}
        </div>
      </BgMenu>
    </div>
  );
}
