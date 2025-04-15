import { createBrowserRouter } from 'react-router-dom';

import Enclosure from './components/enclosure';
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
    path: '/enclosure',
    element: <Enclosure />,
  },
]);

export default router;
