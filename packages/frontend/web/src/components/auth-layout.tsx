import type { PropsWithChildren } from 'react';

import BgHome from '../assets/images/background/bg-home.webp';
import Logo from '../assets/images/logo/fp-logo-arc.png';

type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className='flex min-h-screen justify-center bg-cover bg-center p-3'
      style={{ backgroundImage: `url(${BgHome})` }}
    >
      <div className='flex w-full items-center justify-center'>
        <img
          src={Logo}
          alt='Fantasy Park'
          className='w-[clamp(320px,7.7vw , 1000px)] absolute top-20 z-2 min-h-23 sm:top-15 md:top-0'
        />
        <div className='mt-30 flex min-h-[70%] max-w-[568px] flex-wrap rounded bg-white/90 p-4 shadow-[0px_8px_4px_rgba(0,0,0,0.25)] md:rounded-md'>
          {children}
        </div>
      </div>
    </div>
  );
}
