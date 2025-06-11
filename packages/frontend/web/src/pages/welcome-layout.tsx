import { Outlet } from 'react-router-dom';

import BgHome from '../assets/images/background/bg-home.webp';
import Logo from '../assets/images/logo/fp-logo-arc.png';

export default function WelcomeLayout() {
  return (
    <div
      className='flex min-h-screen justify-center bg-cover bg-center p-3'
      style={{ backgroundImage: `url(${BgHome})` }}
    >
      <div className='flex h-full w-full items-center justify-center md:h-auto'>
        <img
          src={Logo}
          alt='Fantasy Park'
          className='w-[clamp(320px,7.7vw , 1000px)] absolute top-20 z-2 min-h-23 md:top-0'
        />
        <div className='mt-30 flex max-h-40/100 max-w-[95%] flex-wrap overflow-y-auto rounded bg-white/90 p-4 shadow-[0px_8px_4px_rgba(0,0,0,0.25)] md:max-h-70/100 md:max-w-[80%] md:rounded-md'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
