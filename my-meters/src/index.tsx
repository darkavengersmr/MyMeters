import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './components/app';
import ErrorBoundry from './components/error-boundry';

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundry>
      <CookiesProvider>
        <BrowserRouter>
          <App />        
        </BrowserRouter>      
      </CookiesProvider>
    </ErrorBoundry>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
