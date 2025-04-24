import { Link } from 'react-router-dom';

import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import Menu from '@/components/menu';

import ParkMap from '../assets/images/background/park-map.png';
import { useGameInfoContext } from '../contexts/game-info-context';

export default function Home() {
  const { unlockedZones } = useGameInfoContext();
  // console.log(unlockedZones);

  return (
    <div
      className='h-[100vh] bg-cover bg-center p-3'
      style={{ backgroundImage: `url(${ParkMap})` }}
    >
      <header className='fixed flex w-[94%] justify-between gap-3 sm:z-2 md:w-[98%]'>
        <Menu />
        <InfoNbVisitorsMoons />
      </header>
      <div className='relative mt-8 ml-8 flex h-[95%] flex-col justify-around sm:grid sm:grid-cols-2 sm:gap-8 md:mt-0 md:ml-0'>
        {unlockedZones.map((zone) => (
          <div key={zone.zone_id} className='flex items-center justify-center'>
            <Link
              to={zone.park_zone_id != null ? zone.link : ''}
              className='flex h-full w-full items-center justify-center'
            >
              <img
                className={`absolute right-[calc(50%-32px)] w-[40%] sm:w-[40%] md:relative md:right-0 ${zone.park_zone_id != null ? '' : 'cursor-not-allowed grayscale'}`}
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
