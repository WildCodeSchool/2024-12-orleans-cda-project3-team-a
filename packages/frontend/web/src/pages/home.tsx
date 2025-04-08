import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SomeInterface } from '@app/shared';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [someData, setSomeData] = useState<SomeInterface>({
    someProperty: 'someValue',
  });

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(`${API_URL}/api/demo`, {
        signal: abortController.signal,
      });
      const data = await response.json();
      setSomeData(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const navigate = useNavigate();
  const test = () => {
    void navigate('/test');
  };

  return (
    <div>
      <div className='font-display flex h-screen w-screen flex-col items-center justify-center gap-4'>
        <div className='rounded-2xl bg-red-500 p-1 px-2 text-white transition-all hover:bg-green-400 active:bg-amber-500'>
          {'Edit pages/home.tsx to edit this screen'}
        </div>
        <div className='bg-primary-blue flex w-2xs items-center justify-center rounded-2xl'>
          <button type='button' className='text-4xl' onClick={test}>
            {'Page test'}
          </button>
        </div>

        <div>{someData.someProperty}</div>
      </div>
    </div>
  );
}
