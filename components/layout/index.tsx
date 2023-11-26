'use client';

import { Montserrat } from 'next/font/google';
import type { Metadata } from 'next';
import Head from 'next/head';
import ErrorBoundary from '../errorBoundary';
import styles from './index.module.scss';

const montserrat = Montserrat({
  weight: ['200', '400', '600', '800'],
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Marvel API',
};

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Marvel API</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className={`${montserrat.className} ${styles.body}`} data-testid="body">
        <ErrorBoundary fallback={<p className={styles['error-boundary']}>Something went wrong</p>}>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  );
}
