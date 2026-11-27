import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app/App';
import { Providers } from './app/Providers';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Providers>
        <App />
      </Providers>
    </HashRouter>
  </StrictMode>,
);
