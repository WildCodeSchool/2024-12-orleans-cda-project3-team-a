import { createBrowserRouter } from 'react-router-dom';

import Fairy from '../src/pages/world-fairy';
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
    path: '/fairy',
    element: <Fairy />,
  },
]);

export default router;
