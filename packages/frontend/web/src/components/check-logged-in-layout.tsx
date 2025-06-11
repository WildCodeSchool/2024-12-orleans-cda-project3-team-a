import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function CheckLoggedInLayout() {
  const { isLoading, isLoggedIn } = useAuth();

  //if loading -> wait
  if (isLoading) {
    return;
  }

  //if logged in -> go home ("/" & "/signup" are FORBIDDEN)
  if (isLoggedIn) {
    return <Navigate to='/home' />;
  }

  //able to display pages in router if we are NOT logged in
  return <Outlet />;
}
