import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';
import { GameInfoContextProvider } from '@/contexts/game-info-context';

export default function CheckAuthLayout() {
  const { isLoading, isLoggedIn } = useAuth();

  //if loading -> wait
  if (isLoading) {
    return;
  }

  //if NOT logged in -> go "/" = login ("/home" & "/create-park" & ... are FORBIDDEN)
  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  //able to display pages in router if we are logged in
  return (
    <GameInfoContextProvider>
      <Outlet />
    </GameInfoContextProvider>
  );
}
