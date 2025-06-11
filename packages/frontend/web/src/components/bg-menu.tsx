import type { PropsWithChildren } from 'react';

import BgPattern from '../assets/images/icons-buttons/bg-pattern.png';

type BgMenuProps = PropsWithChildren;
export default function BgMenu({ children }: BgMenuProps) {
  return (
    <div
      className='bg-primary-gray rounded p-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:rounded-md md:p-6'
      style={{ backgroundImage: `url(${BgPattern})` }}
    >
      {children}
    </div>
  );
}
