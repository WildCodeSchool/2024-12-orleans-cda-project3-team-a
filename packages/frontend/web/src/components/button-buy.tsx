import type { PropsWithChildren } from 'react';

type ButtonBuyProps = PropsWithChildren;

export default function ButtonBuy({ children }: ButtonBuyProps) {
  return (
    <button
      type='button'
      className='cursor-pointer items-center justify-center rounded-md border border-black bg-[linear-gradient(to_bottom,_#FFFFFF,_#D8D8D8)] px-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
    >
      <div className='flex items-center justify-center gap-1'>{children}</div>
    </button>
  );
}
