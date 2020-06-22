import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </BrowserRouter>
  </>
);

export default App;
