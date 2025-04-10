import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import Test from './pages/test';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);

export default router;
