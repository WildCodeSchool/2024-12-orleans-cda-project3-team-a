import type { PropsWithChildren } from 'react';

type ButtonBlueProps = PropsWithChildren<{
  readonly bg: 'bg-primary-blue' | 'bg-tertiary-blue';
  readonly type: 'button' | 'submit';
  readonly onClick?: () => void;
}>;

export default function ButtonBlue({
  children,
  bg,
  type,
  onClick,
}: ButtonBlueProps) {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      className={`${bg} text-secondary-blue border-secondary-blue min-w-24 cursor-pointer rounded-md border-2 px-2 py-0.5 font-extrabold shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:min-w-32`}
    >
      {children}
    </button>
  );
}
