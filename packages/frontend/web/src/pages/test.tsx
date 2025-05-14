import { useState } from 'react';
import Barrier from '@/components/barrier';
import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import Loader from '@/components/loader';
import ReturnHome from '@/components/return-home';
import useFetchBarriers from '@/hooks/use-fetch-barriers';
import CreatureLine from '@/components/creature-line';
import CloseWindow from '@/components/close-window';
import InputBlue from '@/components/input-blue';
import Logout from '@/components/logout';

export default function Test() {
  const { barriers, isLoading, refetch } = useFetchBarriers();
  const [email, setEmail] = useState('');

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <ReturnHome />
      <CloseWindow />
      <InputBlue
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

      <InfoNbVisitorsMoons />
      <Logout />
      <CreatureLine />

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
  );
}
