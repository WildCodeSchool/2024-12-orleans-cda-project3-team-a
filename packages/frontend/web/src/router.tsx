import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './pages/auth-layout';
import Home from './pages/home';
import Login from './pages/login';
import Rules from './pages/rules';
import SignUp from './pages/sign-up';
import Test from './pages/test';
import CheckAuth from './useful/check-auth';

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
        path: '',
        element: <CheckAuth />,
        children: [
          {
            path: 'signup',
            element: <SignUp />,
          },
        ],
      },
      {
        path: 'rules',
        element: <Rules />,
      },
    ],
  },
  //Put pages in children to have the check for authentication
  //if is loggedin we stay on the actual page if not we go on login
  {
    path: '/',
    element: <CheckAuth />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
  //A supprimer plus tard!
  {
    path: '/test',
    element: <Test />,
  },
]);

export default router;
