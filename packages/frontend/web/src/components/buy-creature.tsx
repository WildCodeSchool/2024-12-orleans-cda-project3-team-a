import { useState } from 'react';

import Moon from '../assets/images/icons-buttons/moon.png';
import Centaur from '../assets/images/mythologic-zone/centaur.png';
import Background from './bg-menu';
import ButtonBuy from './button-buy';
import InputBlue from './input-blue';

export default function BuyCreature() {
  const [name, setName] = useState('');

  return (
    <Background>
      <div className='rounded-lg border-1'>
        <h1 className='p-2'>{'Buy a new Centaure'}</h1>
        <div className='flex items-center justify-center gap-10 p-2'>
          <InputBlue
            type='text'
            placeholder='Name'
            value={name}
            onChangeInput={(value) => {
              setName(value);
            }}
          />
          <img className='h-7 w-7' src={Moon} alt='' />
          <ButtonBuy /> {'+'}
          <img className='w-10' src={Centaur} alt='' />
        </div>
      </div>
    </Background>
  );
}
