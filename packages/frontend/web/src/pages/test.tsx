import { useState } from 'react';

import InputBlue from '@/components/input-blue';
import ReturnHome from '@/components/return-home';

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
    </div>
  );
}
