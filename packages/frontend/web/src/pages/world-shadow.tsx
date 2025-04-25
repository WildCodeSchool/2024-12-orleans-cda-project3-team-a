import Enclosure from '@/components/enclosure';

import CandleSkull from '../assets/images/shadow-zone/candle-skull.png';
import Clothe from '../assets/images/shadow-zone/clothe.png';
import Gargoyle from '../assets/images/shadow-zone/gargoyle.png';
import Moon from '../assets/images/shadow-zone/moon.png';
import Orc from '../assets/images/shadow-zone/orc.png';
import Pond from '../assets/images/shadow-zone/pond.png';
import Potion2 from '../assets/images/shadow-zone/potion-2.png';
import Sign from '../assets/images/shadow-zone/sign.png';
import SnakeSkull from '../assets/images/shadow-zone/snake-skull.png';
import Spider from '../assets/images/shadow-zone/spider.png';
import Tree from '../assets/images/shadow-zone/tree.png';
import Troll from '../assets/images/shadow-zone/troll.png';
import Vampire from '../assets/images/shadow-zone/vampire.png';
import WereWolf from '../assets/images/shadow-zone/werewolf.png';
import Wizard from '../assets/images/shadow-zone/wizard.png';

export default function shadow() {
  return (
    <div className='grid-col-2 grid'>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-shadow-purple'
          srcImgCreature={Troll}
          srcImgDeco1={Tree}
          srcImgDeco2={Clothe}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Elf'}
          positionDeco1={200}
          positionDeco2={3}
        />
        <Enclosure
          bgColor='bg-shadow-green'
          srcImgCreature={Wizard}
          srcImgDeco1={Tree}
          srcImgDeco2={Potion2}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Mermaid'}
          positionDeco1={10}
          positionDeco2={350}
        />
        <Enclosure
          bgColor='bg-shadow-purple'
          srcImgCreature={Vampire}
          srcImgDeco1={SnakeSkull}
          srcImgDeco2={Spider}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Mermaid'}
          positionDeco1={10}
          positionDeco2={320}
        />
      </div>
      <div className='flex flex-row'>
        <Enclosure
          bgColor='bg-shadow-green'
          srcImgDeco1={Pond}
          srcImgDeco2={Spider}
          srcImgCreature={Orc}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Fairy'}
          positionDeco1={70}
          positionDeco2={250}
        />{' '}
        <Enclosure
          bgColor='bg-shadow-purple'
          srcImgCreature={WereWolf}
          srcImgDeco1={Moon}
          srcImgDeco2={SnakeSkull}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={1}
          name={'Fairy'}
          positionDeco1={70}
          positionDeco2={290}
        />{' '}
        <Enclosure
          bgColor='bg-shadow-green'
          srcImgCreature={Gargoyle}
          srcImgDeco1={CandleSkull}
          srcImgDeco2={Pond}
          price={1000}
          srcLockedCreature={Sign}
          nmbrCreature={100}
          name={'Mermaid'}
          positionDeco1={11}
          positionDeco2={210}
        />
      </div>
    </div>
  );
}
