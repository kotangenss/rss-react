import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styles from './pages/main/main.module.scss';
import ErrorBoundary from './components/errorBoundary';
import Details from './components/details';
import Main from './pages/main';
import NotFound from './pages/notFound';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={import.meta.env.VITE_PUBLIC_URL}>
      <ErrorBoundary fallback={<p className={styles['error-boundary']}>Something went wrong</p>}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Details />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);
