import { useState } from 'react';

import CloseWindow from '@/components/close-window';
import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import InputBlue from '@/components/input-blue';
import Loader from '@/components/loader';
import Logout from '@/components/logout';
import ReturnHome from '@/components/return-home';

export default function Test() {
  const [email, setEmail] = useState('test');

  return (
    <div className='grid min-w-[1600px] grid-cols-2'>
      <ReturnHome />
      <CloseWindow />
      <InputBlue
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
      <Logout />
    </div>
  );
}
