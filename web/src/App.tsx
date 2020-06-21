import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <Router history={history}>
      <Routes />
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </Router>
  </>
);

export default App;
