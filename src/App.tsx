import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import styles from './pages/main/main.module.scss';
import ErrorBoundary from './components/errorBoundary';
import Details from './components/details';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary fallback={<p className={styles['error-boundary']}>Something went wrong</p>}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Details />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);
