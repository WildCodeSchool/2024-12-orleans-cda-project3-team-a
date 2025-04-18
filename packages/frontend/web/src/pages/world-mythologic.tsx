import Enclosure from '@/components/enclosure';

import Boat from '../assets/images/mythologic-zone/boat.png';
import Centaur from '../assets/images/mythologic-zone/centaur.png';
import Cerberus from '../assets/images/mythologic-zone/cerberus.png';
import DoublePillar from '../assets/images/mythologic-zone/double-pillar.png';
import Fountain from '../assets/images/mythologic-zone/fountain.png';
import Griffin from '../assets/images/mythologic-zone/griffin.png';
import Helmet from '../assets/images/mythologic-zone/helmet.png';
import Hydra from '../assets/images/mythologic-zone/helmet.png';
import Minotaur from '../assets/images/mythologic-zone/minotaur.png';
import Pillar from '../assets/images/mythologic-zone/pillar.png';
import Pond from '../assets/images/mythologic-zone/pond.png';
import Rock2 from '../assets/images/mythologic-zone/rock-2.png';
import Rock from '../assets/images/mythologic-zone/rock.png';
import Satyr from '../assets/images/mythologic-zone/satyr.png';
import Sign from '../assets/images/mythologic-zone/sign.png';
import Tree2 from '../assets/images/mythologic-zone/tree-2.png';
import Tree3 from '../assets/images/mythologic-zone/tree-3.png';
import Tree from '../assets/images/mythologic-zone/tree.png';
import Vase from '../assets/images/mythologic-zone/vase.png';

export default function mythologic() {
  return (
    <div className='grid-col-2 grid max-w-[1600px]'>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-mythologic-beige'
          srcImgCreature={Centaur}
          srcImgDeco1={Rock}
          srcImgDeco2={Vase}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Elf'}
          positionDeco1={80}
          positionDeco2={30}
        />
        <Enclosure
          bgColor='bg-mythologic-beige'
          srcImgCreature={Minotaur}
          srcImgDeco1={Tree}
          srcImgDeco2={DoublePillar}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Mermaid'}
          positionDeco1={10}
          positionDeco2={100}
        />
        <Enclosure
          bgColor='bg-mythologic-beige'
          srcImgCreature={Satyr}
          srcImgDeco1={Fountain}
          srcImgDeco2={Tree2}
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
          bgColor='bg-mythologic-beige'
          srcImgCreature={Hydra}
          srcImgDeco1={Helmet}
          srcImgDeco2={Pond}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Fairy'}
          positionDeco1={70}
          positionDeco2={20}
        />{' '}
        <Enclosure
          bgColor='bg-mythologic-beige'
          srcImgCreature={Griffin}
          srcImgDeco1={Pillar}
          srcImgDeco2={Tree3}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Fairy'}
          positionDeco1={70}
          positionDeco2={20}
        />{' '}
        <Enclosure
          bgColor='bg-mythologic-beige'
          srcImgCreature={Cerberus}
          srcImgDeco1={Boat}
          srcImgDeco2={Rock2}
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
