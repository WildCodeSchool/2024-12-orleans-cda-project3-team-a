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
      className='bg-secondary-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-9 md:w-9 md:rounded-md'
      onClick={logout}
    >
      <img
        src={icoDeconnection}
        alt='deconnection'
        title='deconnection'
        className='w-4 md:w-5'
      />
    </button>
  );
}
