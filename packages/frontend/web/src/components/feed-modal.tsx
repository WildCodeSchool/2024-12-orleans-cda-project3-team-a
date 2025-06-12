import { useState } from 'react';

import type { Enclosure } from '@app/api';
import type { Creatures } from '@app/api';

import BgMenu from './bg-menu';
import ButtonBlue from './button-blue';
import BuyCreature from './buy-creature';
import CloseWindow from './close-window';
import CreatureLine from './creature-line';
import FeedCreatures from './feed-all-creatures';

type FeedModalProps = {
  readonly enclosure: Enclosure;
  readonly onClick: () => void;
  readonly potionPrice: number;
  readonly fetchCreatures: () => Promise<void>;
  readonly creatures: Creatures;
};

export default function FeedModal({
  enclosure,
  onClick,
  potionPrice,
  fetchCreatures,
  creatures,
}: FeedModalProps) {
  const isScreen = window.innerWidth < 768;
  const [visibleCreatures, setVisibleCreatures] = useState(isScreen ? 5 : 10);

  //necessary to exit with the escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      onClick();
    }
  });

  return (
    <>
      {/* 'Display quantity creature in header' */}
      <div className='bg-primary-gray absolute top-1.5 left-2 flex items-center justify-center gap-3 rounded-lg p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-10 md:w-20'>
        <p>{enclosure.quantityCreature}</p>
        <img
          className='w-7'
          src={`/images/creatures/${enclosure.src_image}`}
          alt={enclosure.species}
        />
      </div>

      {/* Display content of Feed Modal */}
      {/* transparent bg to disable the click of several modals */}
      <div
        className='fixed top-0 left-0 z-5 h-full w-full bg-transparent'
        onClick={onClick}
      >
        <div
          className='absolute top-15 left-[5%] max-h-[90%] w-[90%] overflow-auto'
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <BgMenu>
            <div className='absolute top-0 right-0 m-3'>
              <CloseWindow onClick={onClick} />
            </div>

            <div>
              <div className='m-0 flex w-full flex-wrap items-center justify-center gap-2 pt-2 md:m-3 md:gap-3'>
                <BuyCreature
                  creatureId={enclosure.id}
                  fetchCreatures={fetchCreatures}
                />
                <FeedCreatures
                  creatures={creatures}
                  fetchCreatures={fetchCreatures}
                  potionPrice={potionPrice}
                  creatureId={enclosure.id}
                />
              </div>
              <div className=''>
                {creatures.length === 0 ? (
                  <div className='flex items-center justify-center gap-4 pt-5'>
                    <img
                      className='w-12 md:w-15'
                      src='/images/minguch.png'
                      alt='mingush'
                    />
                    <div className='text-secondary-blue flex flex-col justify-center text-center text-xs md:text-base'>
                      <p className='flex justify-center'>{`You don't have any ${enclosure.species} yet.`}</p>
                      <p className='font-extrabold'>{`Buy your first ${enclosure.species}!`}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='flex flex-col gap-4 pt-3 md:grid md:grid-cols-2'>
                      {creatures.slice(0, visibleCreatures).map((creature) => (
                        <CreatureLine
                          key={creature.id}
                          creature={creature}
                          potionPrice={potionPrice}
                          fetchCreatures={fetchCreatures}
                        />
                      ))}
                    </div>

                    {visibleCreatures < creatures.length && (
                      <div className='flex justify-center pt-4'>
                        <ButtonBlue
                          bg='bg-primary-blue'
                          type='button'
                          onClick={() => {
                            setVisibleCreatures((prev) => prev + 10);
                          }}
                        >
                          {'View more'}
                        </ButtonBlue>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </BgMenu>
        </div>
      </div>
    </>
  );
}
