import type { PropsWithChildren } from 'react';

import BgPattern from '../assets/images/icons-buttons/bg-pattern.png';

type BgMenuProps = PropsWithChildren;

export default function BgMenu({ children }: BgMenuProps) {
  return (
    <div
      className='bg-primary-gray h-[90%] w-[95%] overflow-y-scroll rounded p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-[90%] md:w-[94%] md:rounded-md'
      style={{ backgroundImage: `url(${BgPattern})` }}
    >
      {children}
    </div>
  );
}
