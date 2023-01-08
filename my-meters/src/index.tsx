import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './components/app';
import ErrorBoundry from './components/error-boundry';

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <ErrorBoundry>      
        <BrowserRouter>
          <App />        
        </BrowserRouter>            
    </ErrorBoundry>  
);

serviceWorkerRegistration.register();
