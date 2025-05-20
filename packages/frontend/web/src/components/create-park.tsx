import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';
import { useGameInfoContext } from '@/contexts/game-info-context';

import ButtonBlue from './button-blue';
import Input from './input';

export default function CreatePark() {
  const [parkName, setParkName] = useState('');

  const auth = useAuth();
  const hasParkId = auth?.hasParkId;
  const { fetchAll } = useGameInfoContext();

  // if we have a parkid go Home
  if (hasParkId === true) {
    return <Navigate to='/home' />;
  }

  const createPark = async () => {
    const res = await fetch(`/api/game/park`, {
      method: 'POST',
      body: JSON.stringify({
        parkName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    // typage du data
    const data = (await res.json()) as {
      ok: boolean;
    };

    if (data.ok) {
      auth?.setHasParkId(true);
      //Refetch necessary fetch
      await fetchAll();
    }
  };

  return (
    <div className='text-secondary-blue z-3 flex flex-col items-center justify-center gap-4 p-2'>
      <h2 className='pl-4 text-center text-xl font-extrabold tracking-[0.6em] md:text-2xl'>
        {'WELCOME TO FANTASY PARK'}
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
      <form
        className='flex flex-col items-center gap-4'
        onSubmit={async (event) => {
          event.preventDefault();
          await createPark();
        }}
      >
        <Input
          bgColor='bg-primary-blue'
          borderColor='border-secondary-blue'
          type='text'
          placeholder='Park name'
          value={parkName}
          onChangeInput={(value) => {
            setParkName(value);
          }}
        />
        <ButtonBlue bg='bg-primary-blue' type='submit'>
          {'CREATE MY PARK'}
        </ButtonBlue>
      </form>
    </div>
  );
}
