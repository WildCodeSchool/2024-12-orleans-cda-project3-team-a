import Input from '@/components/input';
import ReturnHome from '@/components/return-home';

const test = () => {
  return (
    <div>
      <ReturnHome />
      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>
      <Input type='email' placeholder='Email' />
    </div>
  );
};
export default test;
