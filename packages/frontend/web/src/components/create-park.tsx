import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

import InputBlue from './input-blue';

export default function CreatePark() {
  const [parkName, setParkName] = useState('');

  const auth = useAuth();
  const isParkId = auth?.isParkId;
  // if we have a parkid go Home
  if (isParkId === true) {
    return <Navigate to='/home' />;
  }

  return (
    <div className='text-secondary-blue z-3 flex flex-col items-center justify-center gap-6 p-2'>
      <h2 className='pl-4 text-xl font-extrabold tracking-[0.6em] md:text-2xl'>
        {'WELCOME TO '}
      </h2>
      <h2 className='pl-4 text-xl font-extrabold tracking-[0.6em] md:text-2xl'>
        {'FANTASY PARK'}
      </h2>
      <p>
        {
          ' Take the reins of your very own fantasy creature park and turn it into a must-visit destination. But before you begin, create your account and get ready for an extraordinary adventure! 🚀'
        }
      </p>
      <p>
        {
          'First of all, you need to choose a wonderful name to your park :'
        }{' '}
      </p>
      <InputBlue
        type='text'
        placeholder='Park name'
        value={parkName}
        onChangeInput={(value) => {
          setParkName(value);
        }}
      />
    </div>
  );
}
