import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function CheckParkIdLayout() {
  const auth = useAuth();
  const hasParkId = auth?.hasParkId;
  const isLoading = auth?.isLoading;

  console.log('2nd has park id', hasParkId);
  // console.log('2nd has park id', hasParkId);

  //if loading -> wait
  if (isLoading === true) {
    return;
  }

  //if we have a parkId -> wait
  if (hasParkId === false) {
    return <Navigate to='/create-park' />;
  }

  //able to display pages in router if we are logged in
  return <Outlet />;
}
