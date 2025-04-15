import type { PropsWithChildren } from 'react';

type EnclosureProps = PropsWithChildren<{
  readonly bgColor:
    | 'bg-fairy-blue'
    | 'bg-fairy-green'
    | 'bg-winged-red'
    | 'bg-winged-yellow'
    | 'bg-mythologic-beige'
    | 'bg-shadow-purple'
    | 'bg-shadow-green';
  readonly srcImgDeco1: string;
  readonly srcImgDeco2: string;
  readonly srcImgCreature: string;
}>;

export default function Enclosure({
  bgColor,
  srcImgDeco1,
  srcImgDeco2,
  srcImgCreature,
}: EnclosureProps) {
  return (
    <div className={`h-[50vh] w-[800px] ${bgColor}`}>
      <img className='absolute ml-10 w-15 pt-10' src={srcImgDeco1} alt='' />
      <img className='absolute ml-70 w-25 pt-40' src={srcImgCreature} alt='' />
      <img className='absolute ml-160 w-15 pt-70' src={srcImgDeco2} alt='' />
    </div>
  );
}
