import type { PropsWithChildren } from 'react';

type ButtonBuyProps = PropsWithChildren<{
  readonly bg:
    | 'bg-[linear-gradient(to_bottom,_#FFFFFF,_#D8D8D8)]'
    | 'bg-white/75';
  readonly border?: 'border border-black';
  readonly cursor: 'pointer' | 'not-allowed';
  readonly onClick?: () => void;
  readonly grayscale?: boolean;
}>;

export default function ButtonBuy({
  children,
  bg,
  border,
  cursor,
  onClick,
  grayscale = false,
}: ButtonBuyProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`items-center justify-center rounded-md ${border} ${bg} px-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
        grayscale ? 'grayscale' : 'active:shadow-none'
      }`}
      style={{ cursor }}
    >
      <div className='flex items-center justify-center gap-1'>{children}</div>
    </button>
  );
}
