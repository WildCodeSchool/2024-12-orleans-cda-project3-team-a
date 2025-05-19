import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';
import { GameInfoContextProvider } from '@/contexts/game-info-context';
import { OpenWindowInMenuContextProvider } from '@/contexts/open-window-in-menu-context';

export default function CheckAuthLayout() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn;
  const isLoading = auth?.isLoading;

  //if loading -> wait
  if (isLoading === true) {
    return;
  }

  //if NOT logged in -> go "/" = login ("/home" & "/create-park" & ... are FORBIDDEN)
  if (isLoggedIn === false) {
    return <Navigate to='/' />;
  }

  //able to display pages in router if we are logged in
  return (
    <GameInfoContextProvider>
      <OpenWindowInMenuContextProvider>
        <Outlet />
      </OpenWindowInMenuContextProvider>
    </GameInfoContextProvider>
  );
}
