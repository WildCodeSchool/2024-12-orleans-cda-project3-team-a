import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { GameInfoContextProvider } from './contexts/game-info-context';
import './globals.css';
import router from './router';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <GameInfoContextProvider>
        <RouterProvider router={router} />
      </GameInfoContextProvider>
    </React.StrictMode>,
  );
}
