import CloseWindow from '@/components/close-window';
import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import Login from '@/pages/login';

export default function Test() {
  return (
    <div>
      <ReturnHome />
      <CloseWindow />
      <InfoNbVisitorsMoons />
      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>
      <Login />
    </div>
  );
}
