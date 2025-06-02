import { Link } from 'react-router-dom';

import Menu from '@/components/menu';
import NbVisitorsMoons from '@/components/nb-visitors-moons';
import WelcomeGuide from '@/components/welcome-guide';

import ParkMap from '../assets/images/background/park-map.png';
import { useGameInfoContext } from '../contexts/game-info-context';

export default function Home() {
  const { unlockedZones } = useGameInfoContext();

  return (
    <div
      className='h-screen bg-cover bg-center p-3'
      style={{ backgroundImage: `url(${ParkMap})` }}
    >
      <WelcomeGuide />
      {/* Display the header menu and nb visitors and moons */}
      <header className='fixed flex w-[94%] justify-between gap-3 sm:z-2 md:w-[98%]'>
        <Menu />
        <NbVisitorsMoons />
      </header>

      {/* Display of 4 worlds */}
      <div className='mt-8 flex h-[95%] flex-col justify-around sm:grid sm:grid-cols-2 sm:gap-8'>
        {unlockedZones.map((zone) => (
          <div key={zone.zone_id} className='flex items-center justify-center'>
            <Link
              to={zone.park_zone_id === null ? '' : `/zone/${zone.zone_id}`}
              className='flex h-full w-full items-center justify-center'
            >
              <img
                className={`w-[50%] ${zone.park_zone_id === null ? 'cursor-not-allowed grayscale' : ''}`}
                src={`/images/logo/${zone.src_image}`}
                alt={zone.src_image}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
