import Enclosure from '@/components/enclosure';

import boat from '../assets/images/fairy-zone/boat.png';
import elf from '../assets/images/fairy-zone/elf.png';
import iceCream from '../assets/images/fairy-zone/ice-cream-shop.png';
import locked from '../assets/images/fairy-zone/sign.png';

export default function fairy() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
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
            positionDeco1={10}
            positionDeco2={30}
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
            positionDeco1={10}
            positionDeco2={100}
          />
          <Enclosure
            bgColor='bg-fairy-green'
            srcImgDeco1={boat}
            srcImgDeco2={iceCream}
            srcImgCreature={elf}
            price={1000}
            srcLockedCreature={locked}
            nmbrCreature={1}
            name={'Unicorn'}
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
            srcLockedCreature={locked}
            nmbrCreature={1}
            name={'Fairy'}
            positionDeco1={70}
            positionDeco2={20}
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
          <Enclosure
            bgColor='bg-fairy-blue'
            srcImgDeco1={boat}
            srcImgDeco2={iceCream}
            srcImgCreature={elf}
            price={1000}
            srcLockedCreature={locked}
            nmbrCreature={1}
            name={'Unicorn'}
            positionDeco1={10}
            positionDeco2={80}
          />
        </div>
      </div>
    </div>
  );
}
