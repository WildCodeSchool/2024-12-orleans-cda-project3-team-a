import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function CheckLoggedInLayout() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn;
  const isLoading = auth?.isLoading;

  if (isLoading === true) {
    return;
  }

  if (isLoggedIn === true) {
    return <Navigate to='/home' />;
  }

  return <Outlet />;
}
