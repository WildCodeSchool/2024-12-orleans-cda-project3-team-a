import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Test from './pages/test';
import Login from './pages/login';
import SignUp from './pages/sign-up';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);

export default router;
