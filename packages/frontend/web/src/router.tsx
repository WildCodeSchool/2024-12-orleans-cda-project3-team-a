import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
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
