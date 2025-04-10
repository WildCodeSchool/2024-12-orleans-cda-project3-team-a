import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/auth-layout';
import Home from './pages/home';
import Test from './pages/test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
