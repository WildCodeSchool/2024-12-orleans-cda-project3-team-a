import type { PropsWithChildren } from 'react';

import BgPattern from '../assets/images/icons-buttons/bg-pattern.png';

type Pattern = PropsWithChildren;

export default function Pattern({ children }: Pattern) {
  return (
    <div
      className='bg-primary-gray rounded-2xl p-4'
      style={{ backgroundImage: `url(${BgPattern})` }}
    >
      {children}
    </div>
  );
}
