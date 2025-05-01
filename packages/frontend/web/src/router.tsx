import { createBrowserRouter } from 'react-router-dom';

import CheckAuth from './components/check-auth-layout';
import CheckLoggedIn from './components/check-logged-in-layout';
import Home from './pages/home';
import Login from './pages/login';
import Rules from './pages/rules';
import SignUp from './pages/sign-up';
import Test from './pages/test';
import WelcomeLayout from './pages/welcome-layout';
import Fairy from './pages/world-fairy';
import Mythologic from './pages/world-mythologic';
import Shadow from './pages/world-shadow';
import Winged from './pages/world-winged';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomeLayout />,
    children: [
      {
        element: <CheckLoggedIn />,
        children: [
          {
            index: true,
            element: <Login />,
          },
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
  {
    path: '/fairy',
    element: <Fairy />,
  },
  // {
  //   path: '/winged',
  //   element: <Winged />,
  // },
  // {
  //   path: '/Mythologic',
  //   element: <Mythologic />,
  // },
  // {
  //   path: '/Shadow',
  //   element: <Shadow />,
  // },
]);

export default router;
