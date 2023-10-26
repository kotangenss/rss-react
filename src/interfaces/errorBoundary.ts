import { ReactElement, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactElement;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
