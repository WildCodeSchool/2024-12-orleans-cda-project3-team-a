import { useEffect, useState } from 'react';

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

  return (
    <div className='font-display flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <div className='rounded-2xl bg-red-500 p-1 px-2 text-white transition-all hover:bg-green-400 active:bg-amber-500'>
        {'Edit pages/home.tsx to edit this screen'}
      </div>

      <div>{someData.someProperty}</div>
    </div>
  );
}
