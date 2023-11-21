import styles from './index.module.scss';

export default function Loader(): JSX.Element {
  return <div className={styles['loader-line']} data-testid="loader" />;
}
