import type { PropsWithChildren } from 'react';

import BgPattern from '../assets/images/icons-buttons/bg-pattern.png';

type PatternProps = PropsWithChildren;

export default function BgMenu({ children }: PatternProps) {
  return (
    <div
      className='bg-primary-gray rounded p-4 md:rounded-md'
      style={{ backgroundImage: `url(${BgPattern})` }}
    >
      {children}
    </div>
  );
}
