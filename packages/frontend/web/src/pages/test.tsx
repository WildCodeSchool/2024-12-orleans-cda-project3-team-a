import { useState } from 'react';

import Barrier from '@/components/barrier';
import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import Input from '@/components/input-blue';
import Loader from '@/components/loader';
import ReturnHome from '@/components/return-home';

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
      <InfoNbVisitorsMoons />
      <Barrier direction='directionUp' />
    </div>
  );
}
