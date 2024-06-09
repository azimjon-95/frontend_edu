import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './sertificate/context/AuthContext';
const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>

);


