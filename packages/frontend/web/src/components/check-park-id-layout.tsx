import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function CheckParkIdLayout() {
  const auth = useAuth();
  const isParkId = auth?.isParkId;

  //if we have a parkId -> wait
  if (isParkId === false) {
    return <Navigate to='/create-park' />;
  }

  //able to display pages in router if we are logged in
  return <Outlet />;
}
