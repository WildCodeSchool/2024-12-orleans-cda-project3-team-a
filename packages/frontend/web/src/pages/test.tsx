
import Loader from '@/components/loader';
import Input from '@/components/input-blue';
import ReturnHome from '@/components/return-home';

import { useState } from 'react';

export default function Test() {
  const [email, setEmail] = useState('test');

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <ReturnHome />
      <Input
        type='email'
        placeholder='Votre email'
        value={email}
        onChangeInput={setEmail}
      />
      {email}
      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>
      <Loader />
    </div>
  );
}
