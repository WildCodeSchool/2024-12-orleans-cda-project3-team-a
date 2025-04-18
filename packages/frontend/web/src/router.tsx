import { createBrowserRouter } from 'react-router-dom';

import Fairy from '../src/pages/world-fairy';
import Home from './pages/home';
import Test from './pages/test';
import Mythologic from './pages/world-mythologic';
import Shadow from './pages/world-shadow';
import Winged from './pages/world-winged';

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
    path: '/fairy',
    element: <Fairy />,
  },
  {
    path: '/winged',
    element: <Winged />,
  },
  {
    path: '/Mythologic',
    element: <Mythologic />,
  },
  {
    path: '/Shadow',
    element: <Shadow />,
  },
]);

export default router;
