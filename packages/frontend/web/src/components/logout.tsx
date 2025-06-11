import { useAuth } from '@/contexts/auth-context';

import iconLogout from '../assets/images/icons-buttons/deconnection.png';

export default function Logout() {
  const auth = useAuth();

  const logout = async () => {
    const res = await fetch(`/api/auth/logout`, {
      method: 'post',
    });
    const data = (await res.json()) as {
      ok: boolean;
    };
    if (data.ok) {
      auth.setIsLoggedIn(false);
    }
  };

  return (
    <button
      type='button'
      className='flex cursor-pointer items-center justify-center'
      onClick={logout}
    >
      <img
        src={iconLogout}
        alt='logout'
        title='Logout'
        className='h-6 md:h-7'
      />
    </button>
  );
}
