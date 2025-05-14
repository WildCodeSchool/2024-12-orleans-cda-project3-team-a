import { useState } from 'react';

import Moon from '../assets/images/icons-buttons/moon.png';
import InputBlue from './input-blue';

export default function BuyCreature() {
  const [name, setName] = useState('');

  return (
    <div className='border-1'>
      <h1 className='p-2'>{'Buy a new Centaure'}</h1>
      <div className='flex gap-10 p-6'>
        <InputBlue
          type='text'
          placeholder='Name'
          value={name}
          onChangeInput={(value) => {
            setName(value);
          }}
        />
        <img className='w-7' src={Moon} alt='' />
        <button type='button'>
          <img src='' alt='' />
        </button>
      </div>
    </div>
  );
}
