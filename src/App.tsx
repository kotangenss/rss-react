import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import styles from './pages/main/main.module.scss';
import ErrorBoundary from './components/errorBoundary';
import Details from './components/details';
import Main from './pages/main';
import NotFound from './pages/notFound';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary fallback={<p className={styles['error-boundary']}>Something went wrong</p>}>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Details />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>
);
