import { Component, ErrorInfo, PromiseLikeOfReactNode, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from 'src/interfaces/errorBoundary';
import styles from './index.module.scss';
import Button from '../button';

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): object {
    return { hasError: true };
  }

  static handleButtonClick = (): void => {
    window.location.reload();
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ hasError: true });
    console.log('Handled error:', error, 'Info:', info);
  }

  render():
    | string
    | number
    | boolean
    | JSX.Element
    | Iterable<ReactNode>
    | PromiseLikeOfReactNode
    | null
    | undefined {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return (
        <div className={styles['alt-interface']}>
          <h1>{fallback}</h1>
          <Button name="Reload page" onClick={ErrorBoundary.handleButtonClick} />
        </div>
      );
    }
    return children;
  }
}