import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function CheckLoggedInLayout() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn;
  const isLoading = auth?.isLoading;

  //if loading -> wait
  if (isLoading === true) {
    return;
  }

  //if logged in -> go home ("/" & "/signup" are FORBIDDEN)
  if (isLoggedIn === true) {
    return <Navigate to='/home' />;
  }

  //able to display pages in router if we are NOT logged in
  return <Outlet />;
}
