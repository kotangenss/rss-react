import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/main/main';
import styles from './pages/main/main.module.scss';
import ErrorBoundary from './components/errorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary fallback={<p className={styles['error-boundary']}>Something went wrong</p>}>
        <Main />
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);
