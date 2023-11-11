import { LoaderProps } from '../../interfaces/loader';
import styles from './loader.module.scss';

export default function Loader({ size }: LoaderProps): JSX.Element {
  return (
    <div className={styles[`loading-container`]} data-testid="loader">
      <div className={styles[`loading-icon-${size}`]} data-testid={`loading-icon-${size}`} />
      <p>Please wait. Loading in progress</p>
    </div>
  );
}
