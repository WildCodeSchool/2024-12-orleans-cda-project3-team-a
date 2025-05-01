import { type PropsWithChildren, useState } from 'react';

import alert from '../assets/images/icons-buttons/alert.png';
import moon from '../assets/images/icons-buttons/moon.png';
import ButtonBuy from './button-buy';

type EnclosureProps = PropsWithChildren<{
  readonly srcImgDeco1: string;
  readonly srcImgDeco2: string;
  readonly srcImgCreature: string;
  readonly price: number;
  readonly lockedCreature: string | null;
  readonly nmbrCreature: number;
  readonly name: string;
  readonly positionDeco1: number;
  readonly positionDeco2: number;
  readonly background: string | null;
}>;

export default function Enclosure({
  srcImgDeco1,
  srcImgDeco2,
  srcImgCreature,
  price,
  positionDeco1,
  positionDeco2,
  name,
  lockedCreature,
  nmbrCreature,
  background,
}: EnclosureProps) {
  console.log('positionDeco1:', positionDeco1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hungry, setHungry] = useState(false);
  const isLocked = nmbrCreature === 0;

  const getBackgound = (background: string | null) => {
    switch (background) {
      case 'green':
        return 'bg-fairy-green';
      case 'blue':
        return 'bg-fairy-blue';
      case 'yellow':
        return 'bg-winged-yellow';
      case 'red':
        return 'bg-winged-red';
      case 'center-right':
        return 'top-1/2 right-0 -translate-y-1/2';
      case 'beige':
        return 'bg-mythologic-beige';
      case 'dark-green':
        return 'bg-shadow-green';
      case 'purple':
        return 'bg-shadow-purple';
      default:
        return '';
    }
  };

  const handleModale = () => {
    setIsModalOpen(!isModalOpen);
  };
  // min-w-[33.33%]
  return (
    <div
      className={`flex h-[50vh] min-w-[50%] flex-col justify-between p-4 ${getBackgound(background)}`}
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
          src={isLocked ? (lockedCreature ?? '') : (srcImgCreature ?? '')}
          alt=''
        />

        <h1 className={` ${isLocked ? 'absolute top-10' : 'hidden'} `}>
          {name}
        </h1>
        {isLocked ? (
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
