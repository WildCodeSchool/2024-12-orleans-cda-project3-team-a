import Enclosure from '@/components/enclosure';

import boat from '../assets/images/fairy-zone/boat.png';
import elf from '../assets/images/fairy-zone/elf.png';
import iceCream from '../assets/images/fairy-zone/ice-cream-shop.png';
import locked from '../assets/images/fairy-zone/sign.png';

export default function fairy() {
  return (
    <div className='grid-col-2 grid max-w-[1600px]'>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={elf}
          price={1000}
          srcLockedCreature={locked}
          nmbrCreature={1}
          name={'Elf'}
          positionDeco1={300}
          positionDeco2={400}
        />
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={elf}
          price={1000}
          srcLockedCreature={locked}
          nmbrCreature={1}
          name={'Mermaid'}
          positionDeco1={200}
          positionDeco2={100}
        />
      </div>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={elf}
          price={1000}
          srcLockedCreature={locked}
          nmbrCreature={1}
          name={'Fairy'}
          positionDeco1={70}
          positionDeco2={80}
        />{' '}
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgDeco1={boat}
          srcImgDeco2={iceCream}
          srcImgCreature={elf}
          price={1000}
          srcLockedCreature={locked}
          nmbrCreature={100}
          name={'Mermaid'}
          positionDeco1={11}
          positionDeco2={90}
        />
      </div>
    </div>
  );
}
