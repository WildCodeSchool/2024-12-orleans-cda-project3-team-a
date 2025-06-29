import type { PropsWithChildren } from 'react';

type ButtonBuyProps = PropsWithChildren<{
  readonly bg:
    | 'bg-[linear-gradient(to_bottom,_#FFFFFF,_#D8D8D8)]'
    | 'bg-white/75';
  readonly border?: 'border border-black';
  readonly cursor: 'pointer' | 'not-allowed';
  readonly onClick?: () => void;
  readonly isInvisible?: boolean;
  readonly isGrayscale?: boolean;
  readonly isDisabled?: boolean;
}>;

export default function ButtonBuy({
  children,
  bg,
  border,
  cursor,
  onClick,
  isInvisible = false,
  isGrayscale,
  isDisabled,
}: ButtonBuyProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={isDisabled}
      className={`items-center justify-center rounded-md ${border} ${bg} px-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
        isInvisible ? 'invisible' : 'active:shadow-none'
      } ${isGrayscale === true ? 'grayscale filter' : ''}`}
      style={{ cursor }}
    >
      <div className='flex items-center justify-center gap-0.5'>{children}</div>
    </button>
  );
}
