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
      <div className='relative flex w-17'>
        <img src={Unicorn} alt='creature' className='w-15' />
        <img
          src={Gender}
          alt='creature'
          className='absolute right-0 bottom-1 w-5'
        />
      </div>
      <InputBlue
        bgColor={'bg-white'}
        borderColor={'border-gray'}
        type={'text'}
        placeholder={'Enter a name'}
        onChangeInput={setName}
        value={name}
      />
      <input
        className='h-7 w-2 rounded border bg-gray-300 px-2 focus:border-2 focus:outline-none md:w-25 md:rounded-md'
        disabled
      />
      <ButtonBuy>
        <img src={Potion} alt='potion' className='w-7 p-0.5' />
      </ButtonBuy>
    </div>
  );
}
