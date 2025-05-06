import { useState } from 'react';

import Potion from '../assets/images/fairy-zone/potion.png';
import Unicorn from '../assets/images/fairy-zone/unicorn.png';
import Gender from '../assets/images/icons-buttons/female.png';
import ButtonBuy from './button-buy';
import InputBlue from './input-blue';

export default function CreatureLine() {
  const [name, setName] = useState('');

  return (
    <div className='flex items-center justify-center gap-3'>
      <div className='flex relative w-17'>
        <img src={Unicorn} alt='creature' className='w-15' />
        <img src={Gender} alt='creature' className='w-5 absolute right-0 bottom-1' />
      </div>
      <InputBlue
        bgColor={'bg-white'}
        borderColor={'border-gray'}
        type={'text'}
        placeholder={'Enter a name'}
        onChangeInput={setName}
        value={name}
      />
      <ButtonBuy>
        <img src={Potion} alt='potion' className='w-7 p-0.5' />
      </ButtonBuy>
    </div>
  );
}
