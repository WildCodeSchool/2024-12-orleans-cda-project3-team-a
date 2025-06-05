import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function CheckParkIdLayout() {
  const { isLoading, hasParkId } = useAuth();

  //if loading -> wait
  if (isLoading) {
    return;
  }

  //if we have a parkId -> wait
  if (!hasParkId) {
    return <Navigate to='/create-park' />;
  }

  //able to display pages in router if we are logged in
  return <Outlet />;
}
