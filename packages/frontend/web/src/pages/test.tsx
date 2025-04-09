import { useState } from 'react';

import Input from '@/components/input-blue';
import ReturnHome from '@/components/return-home';
import Login from '@/pages/login';

export default function Test() {
  const [email, setEmail] = useState('test');

  return (
    <div>
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
      <Login />
    </div>
  );
}
