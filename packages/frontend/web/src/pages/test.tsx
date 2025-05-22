import { useState } from 'react';

import Barrier from '@/components/barrier';
import CloseWindow from '@/components/close-window';
import Input from '@/components/input';
import Loader from '@/components/loader';
import Logout from '@/components/logout';
import NbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import ShopCreature from '@/components/shop-creatures';
import useFetchBarriers from '@/hooks/use-fetch-barriers';

export default function Test() {
  const { barriers, isLoading, refetch } = useFetchBarriers();
  const [email, setEmail] = useState('');

  return (
    <div className='grid min-w-[1600px] grid-cols-2'>
      <div>
        <ShopCreature creatureId={5} />
        <ReturnHome />
        <Input
          bgColor='bg-primary-blue'
          borderColor='border-secondary-blue'
          type='email'
          placeholder='Votre email'
          value={email}
          onChangeInput={setEmail}
        />
        {email}
        <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
        <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>

        <NbVisitorsMoons />
        <Logout />

        <div className='relative min-h-200 min-w-200 bg-blue-200'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {barriers.map((barrier) => {
                return (
                  <Barrier
                    key={`${barrier.barrierId}`}
                    barrier={barrier}
                    refetch={refetch}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
