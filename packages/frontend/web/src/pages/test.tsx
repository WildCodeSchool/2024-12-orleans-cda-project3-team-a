import Loader from '@/components/loader';
import ReturnHome from '@/components/return-home';

export default function Test() {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <ReturnHome />
      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>
      <Loader />
    </div>
  );
}
