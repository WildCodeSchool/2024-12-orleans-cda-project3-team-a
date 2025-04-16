import Enclosure from '@/components/enclosure';

import boat from '../assets/images/fairy-zone/boat.png';
import elf from '../assets/images/fairy-zone/elf.png';
import iceCream from '../assets/images/fairy-zone/ice-cream-shop.png';
import locked from '../assets/images/fairy-zone/sign.png';

export default function fairy() {
  return (
    <div className='grid-col-2 grid min-w-[1250px]'>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={elf}
          price={1000}
          srcLocked={locked}
          nmbrCreature={1}
          name={''}
          positionDeco1={80}
          positionDeco2={30}
        />
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={locked}
          price={1000}
          srcLocked={locked}
          nmbrCreature={1}
          name={'gargoyl'}
          positionDeco1={10}
          positionDeco2={100}
        />
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={locked}
          price={1000}
          srcLocked={locked}
          nmbrCreature={1}
          name={'unicor'}
          positionDeco1={90}
          positionDeco2={10}
        />
      </div>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={elf}
          price={1000}
          srcLocked={locked}
          nmbrCreature={1}
          name={''}
          positionDeco1={70}
          positionDeco2={20}
        />{' '}
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={elf}
          price={1000}
          srcLocked={locked}
          nmbrCreature={1}
          name={''}
          positionDeco1={11}
          positionDeco2={90}
        />
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={locked}
          price={1000}
          srcLocked={locked}
          nmbrCreature={1}
          name={'Phoenix'}
          positionDeco1={10}
          positionDeco2={80}
        />
      </div>
    </div>
  );
}
