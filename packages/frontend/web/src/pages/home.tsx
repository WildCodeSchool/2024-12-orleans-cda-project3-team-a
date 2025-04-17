import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function Home() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn;
  const isLoading = auth?.isLoading;

  if (isLoading) {
    return;
  }

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex items-center justify-center p-4'>
      <p className='font-aerokids bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text p-7 text-9xl text-transparent'>
        {'Fantasy Park !'}
      </p>
    </div>
  );
}
