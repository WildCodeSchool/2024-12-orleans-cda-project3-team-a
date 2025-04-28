import { type PropsWithChildren, useState } from 'react';

import alert from '../assets/images/icons-buttons/alert.png';
import moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

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
  readonly price: number;
  readonly srcLockedCreature: string;
  readonly nmbrCreature: number;
  readonly name: string;
  readonly positionDeco1: number;
  readonly positionDeco2: number;
}>;

export default function Enclosure({
  bgColor,
  srcImgDeco1,
  srcImgDeco2,
  srcImgCreature,
  price,
  positionDeco1,
  positionDeco2,
  name,
  srcLockedCreature,
  nmbrCreature,
}: EnclosureProps) {
  console.log('positionDeco1:', positionDeco1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockedCreature, setLockedCreature] = useState(false);
  const [hungry, setHungry] = useState(false);
  const handleModale = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`flex h-[50vh] min-w-[33.33%] flex-col justify-between p-4 ${bgColor}`}
    >
      <img
        style={{ left: `${positionDeco1}px` }}
        className={`relative w-15`}
        src={srcImgDeco1}
        alt=''
      />
      <div
        onClick={handleModale}
        className='relative flex flex-col items-center justify-center gap-2'
      >
        <img
          className='absolute top-1 left-80 w-10'
          src={hungry ? alert : ''}
        />
        <img
          className={`w-30 ${hungry ? 'grayscale' : ''}`}
          src={lockedCreature ? srcLockedCreature : srcImgCreature}
          alt=''
        />

        <h1 className={` ${lockedCreature ? 'absolute top-10' : 'hidden'} `}>
          {name}
        </h1>
        {lockedCreature ? (
          <div className='flex items-center gap-1'>
            <ButtonBuy>{price}</ButtonBuy>
            <img src={moon} alt='Prix' className='h-4 w-4' />
          </div>
        ) : (
          <ButtonBuy>{nmbrCreature}</ButtonBuy>
        )}
      </div>
      <img
        style={{ left: `${positionDeco2}px` }}
        className={`relative w-15`}
        src={srcImgDeco2}
        alt=''
      />
    </div>
  );
}
