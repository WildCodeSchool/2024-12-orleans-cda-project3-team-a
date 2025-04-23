import Enclosure from '@/components/enclosure';

import Boat from '../assets/images/fairy-zone/boat.png';
import Castle from '../assets/images/fairy-zone/castle.png';
import Elf from '../assets/images/fairy-zone/elf.png';
import Fairy from '../assets/images/fairy-zone/fairy.png';
import Hay from '../assets/images/fairy-zone/hay.png';
import IceCream from '../assets/images/fairy-zone/ice-cream-shop.png';
import Mermaid from '../assets/images/fairy-zone/mermaid.png';
import Rock from '../assets/images/fairy-zone/rock.png';
import Sign from '../assets/images/fairy-zone/sign.png';
import Unicorn from '../assets/images/fairy-zone/unicorn.png';

export default function fairy() {
  return (
    <div className='grid-col-2 grid max-w-[1600px]'>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgDeco1={Boat}
          srcImgDeco2={IceCream}
          srcImgCreature={Elf}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Elf'}
          positionDeco1={300}
          positionDeco2={400}
        />
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgDeco1={Hay}
          srcImgDeco2={Rock}
          srcImgCreature={Unicorn}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Mermaid'}
          positionDeco1={200}
          positionDeco2={100}
        />
      </div>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgDeco1={Rock}
          srcImgDeco2={IceCream}
          srcImgCreature={Mermaid}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Fairy'}
          positionDeco1={70}
          positionDeco2={80}
        />{' '}
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgDeco1={Rock}
          srcImgDeco2={Castle}
          srcImgCreature={Fairy}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={100}
          name={'Mermaid'}
          positionDeco1={11}
          positionDeco2={90}
        />
      </div>
    </div>
  );
}
