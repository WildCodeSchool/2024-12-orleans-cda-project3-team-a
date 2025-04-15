import { useState } from 'react';

import InputBlue from '@/components/input-blue';
import ReturnHome from '@/components/return-home';

import BgPattern from '../assets/images/icons-buttons/bg-pattern.png';

export default function Test() {
  const [email, setEmail] = useState('test');

  return (
    <div className='w-full p-4'>
      <ReturnHome />
      <InputBlue
        type='email'
        placeholder='Votre email'
        value={email}
        onChangeInput={setEmail}
      />
      {email}
      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>
      <div
        className='bg-primary-gray rounded-2xl p-4'
        style={{ backgroundImage: `url(${BgPattern})` }}
      >
        <h1>{'coucou'}</h1>
        <h3>{'KLGJNEGPAKRJNGOENGLFZKG?VKTJBPGOKE2TNGHOP42TPG£'}</h3>
        <p>{'coucuocoucuo'}</p>

        <p>{'coucuocoucuo'}</p>
        <p>{'coucuocoucuo'}</p>
      </div>
    </div>
  );
}
