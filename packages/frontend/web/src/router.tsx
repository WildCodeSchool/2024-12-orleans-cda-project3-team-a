import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './pages/auth-layout';
import Home from './pages/home';
import Login from './pages/login';
import Rules from './pages/rules';
import SignUp from './pages/sign-up';
import Test from './pages/test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'rules',
        element: <Rules />,
      },
    ],
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);

export default router;
