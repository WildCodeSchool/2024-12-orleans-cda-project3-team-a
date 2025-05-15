import { createBrowserRouter } from 'react-router-dom';

import CheckAuth from './components/check-auth-layout';
import CheckLoggedIn from './components/check-logged-in-layout';
import CheckParkIdLayout from './components/check-park-id-layout';
import CreatePark from './components/create-park';
import Dashboard from './components/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Page404 from './pages/page-404';
import Rules from './pages/rules';
import SignUp from './pages/sign-up';
import Test from './pages/test';
import WelcomeLayout from './pages/welcome-layout';
import WorldEnclosure from './pages/world-enclosure';

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
        path: 'create-park',
        element: <WelcomeLayout />,
        children: [{ index: true, element: <CreatePark /> }],
      },
      {
        element: <CheckParkIdLayout />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: '/zone/:zone_id',
            element: <WorldEnclosure />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  //A supprimer plus tard!
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/*',
    element: <Page404 />,
  },
]);

export default router;
