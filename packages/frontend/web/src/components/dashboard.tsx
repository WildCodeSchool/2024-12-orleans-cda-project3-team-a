import { useGameInfoContext } from '@/contexts/game-info-context';
import useEnclosures from '@/hooks/use-enclos';
import useVisitors from '@/hooks/use-visitors';
import useZones from '@/hooks/use-zones';
import { formatNumber } from '@/utils/number-formatter';

import moon from '../assets/images/icons-buttons/moon.png';
import padlock from '../assets/images/icons-buttons/padlock-unlocked.svg';
import visitor from '../assets/images/icons-buttons/visitors.png';
import BgMenu from './bg-menu';
import CloseWindow from './close-window';

type DashboardProps = {
  readonly closeDashboard: () => void;
};

export default function Dashboard({ closeDashboard }: DashboardProps) {
  const { parkName, wallet, countVisitorActiveFormated } = useGameInfoContext();
  const { visitors } = useVisitors();
  const { unlockedZones } = useZones();
  const { creaturesEnclos } = useEnclosures();

  const countCreaturesIdUnlocked = creaturesEnclos.reduce((count, element) => {
    return count + (Number(element.quantityCreature) >= 1 ? 1 : 0);
  }, 0);

  const countZoneIdUnlocked = unlockedZones.reduce((count, element) => {
    return count + (element.park_zone_id !== null ? 1 : 0);
  }, 0);

  return (
    <div className='relative mb-[10%] overflow-auto'>
      <BgMenu>
        {/* Display the button to close the window */}
        <div className='flex flex-row-reverse'>
          <CloseWindow onClick={closeDashboard} />
        </div>
        {/* Container for display content of dashboard */}
        <div className='h-full p-3 text-xs md:text-base'>
          <h1 className='font-aerokids text-outline-white mb-10 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-4xl text-transparent md:text-6xl'>
            {parkName}
          </h1>
          {/* Container My park and My visitor */}
          <div className='mb-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
            {/* MY PARK */}

            <div className='relative mb-5 min-h-20 md:mb-0'>
              <h2 className='font-aerokids text-outline-white absolute w-full -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-winged-yellow),var(--color-title-purple-dark),var(--color-winged-yellow))] bg-clip-text pb-3 text-3xl text-transparent md:text-5xl'>
                {'My park'}
              </h2>
              <ul className='grid min-h-30 grid-cols-2 gap-2 rounded border-1 border-gray-500 bg-white/60 p-3 pt-5 md:rounded-md'>
                <li className='flex items-center justify-center gap-2'>
                  {formatNumber(wallet)}
                  <img src={moon} alt='money' className='h-6 md:h-7' />
                </li>
                <li className='flex items-center justify-center gap-2'>
                  {countVisitorActiveFormated}
                  <img src={visitor} alt='money' className='h-6 md:h-7' />
                </li>
                <li className='flex items-center justify-center gap-2'>
                  <img src={padlock} alt='unlocked' className='h-6 md:h-7' />
                  {`${countZoneIdUnlocked}/${unlockedZones.length} world unlocked`}
                </li>
                <li className='flex items-center justify-center gap-1'>
                  <img src={padlock} alt='unlocked' className='h-6 md:h-7' />
                  {`${countCreaturesIdUnlocked}/${creaturesEnclos.length} creatures unlocked`}
                </li>
              </ul>
            </div>

            {/* MY VISITORS */}

            <div className='relative min-h-20'>
              <h2 className='font-aerokids text-outline-white absolute w-full -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-winged-yellow),var(--color-title-purple-dark),var(--color-winged-yellow))] bg-clip-text pb-3 text-3xl text-transparent md:text-5xl'>
                {'My visitors'}
              </h2>
              <div className='grid min-h-30 grid-cols-2 items-center gap-2 rounded border-1 border-gray-500 bg-white/60 p-2 md:rounded-md'>
                {visitors.map((visitor) => (
                  <ul
                    key={visitor.visitor_id}
                    className='flex list-none justify-center'
                  >
                    <li className='flex items-center gap-1 md:gap-3'>
                      <p>{visitor.visitor_count} </p>
                      <img
                        src={`/images/creatures/${visitor.src_image}`}
                        alt={visitor.src_image ?? ''}
                        className='w-8 md:w-10'
                      />
                      <p className='flex items-center'>
                        {visitor.entry_price}
                        <img
                          src={moon}
                          alt='money'
                          className='h-3 px-1 md:h-4'
                        />
                        {'/ 4 hours'}
                      </p>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          {/* Container for display 4 worlds and nb of creatures */}
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {unlockedZones.map((zone) => (
              <div key={zone.zone_id} className='relative pt-9'>
                <h2 className='absolute flex w-full -translate-y-1/2 items-center justify-center pb-3'>
                  <img
                    src={`/images/logo/${zone.src_image}`}
                    alt={zone.name}
                    className='h-15 md:h-20'
                  />
                </h2>
                <div className='grid grid-cols-2 gap-4 rounded border-1 border-gray-500 bg-white/60 p-3 pt-8 md:rounded-md'>
                  {creaturesEnclos
                    .filter((creature) => creature.zone_id === zone.zone_id)
                    .map((creature) => (
                      <div key={creature.id}>
                        <p className='flex items-center justify-center gap-2'>
                          {creature.quantityCreature}
                          <img
                            src={`/images/creatures/${creature.src_image}`}
                            alt={creature.species}
                            className='w-8 md:w-10'
                          />
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BgMenu>
    </div>
  );
}
