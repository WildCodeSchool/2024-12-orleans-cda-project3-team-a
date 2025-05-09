import { useAuth } from '@/contexts/auth-context';

import icoDeconnection from '../assets/images/icons-buttons/deconnection.png';

const API_URL = import.meta.env.VITE_API_URL;

export default function Logout() {
  const auth = useAuth();

  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'post',
      credentials: 'include',
    });
    const data = (await res.json()) as {
      ok: boolean;
    };
    if (data.ok) {
      auth?.setIsLoggedIn(false);
    }
  };

  return (
    <button
      type='button'
      className='flex cursor-pointer items-center justify-center'
      onClick={logout}
    >
      <img
        src={icoDeconnection}
        alt='deconnection'
        title='deconnection'
        className='h-6 md:h-7'
      />
    </button>
  );
}
