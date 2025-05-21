import { useState } from 'react';

import Barrier from '@/components/barrier';
import BuyCreature from '@/components/buy-creature';
import CloseWindow from '@/components/close-window';
import CreatureLine from '@/components/creature-line';
import FeedModale from '@/components/feed-modale';
import Input from '@/components/input';
import Loader from '@/components/loader';
import Logout from '@/components/logout';
import NbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import useFetchBarriers from '@/hooks/use-fetch-barriers';

export default function Test() {
  const { barriers, isLoading, refetch } = useFetchBarriers();
  const [email, setEmail] = useState('');

  const creatureId = 5;

  // const { barriers, isLoading, refetch } = useFetchBarriers();
  // const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Ouvrir la modale
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Fermer la modale
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className='grid min-w-[1600px] grid-cols-2'>
      <div>
        <button type='button' onClick={handleOpen}>
          {'Ouvrir la modale'}
        </button>

        {isOpen ? <FeedModale onClose={handleClose} /> : null}

        {/* <ReturnHome />
      <CloseWindow />
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
        )} */}
      </div>
    </div>
  );
}
