import Enclosure from '@/components/enclosure';

import Ash from '../assets/images/winged-zone/ash.png';
import Cloud from '../assets/images/winged-zone/cloud.png';
import Djiin from '../assets/images/winged-zone/djinn.png';
import Dragon from '../assets/images/winged-zone/dragon.png';
import Ghost from '../assets/images/winged-zone/ghost.png';
import Halloween from '../assets/images/winged-zone/magic-lamp.png';
import MagicLamp from '../assets/images/winged-zone/magic-lamp.png';
import Nest from '../assets/images/winged-zone/nest.png';
import Palm from '../assets/images/winged-zone/palm.png';
import Phoenix from '../assets/images/winged-zone/phoenix.png';
import Sign from '../assets/images/winged-zone/sign.png';

export default function winged() {
  return (
    <div className='grid-col-2 grid max-w-[1600px]'>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgCreature={Djiin}
          srcImgDeco1={MagicLamp}
          srcImgDeco2={Palm}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Elf'}
          positionDeco1={300}
          positionDeco2={30}
        />
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgCreature={Phoenix}
          srcImgDeco1={Phoenix}
          srcImgDeco2={Ash}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Mermaid'}
          positionDeco1={10}
          positionDeco2={100}
        />
      </div>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-fairy-blue'
          srcImgCreature={Ghost}
          srcImgDeco1={Cloud}
          srcImgDeco2={Halloween}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Fairy'}
          positionDeco1={70}
          positionDeco2={20}
        />{' '}
        <Enclosure
          bgColor='bg-fairy-green'
          srcImgCreature={Dragon}
          srcImgDeco1={Nest}
          srcImgDeco2={Ash}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Mermaid'}
          positionDeco1={200}
          positionDeco2={300}
        />
      </div>
    </div>
  );
}
