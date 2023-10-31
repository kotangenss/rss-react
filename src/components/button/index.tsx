import styles from './button.module.scss';
import { ButtonProps } from '../../interfaces/button';

export default function Button({ className, name, onClick, disabled }: ButtonProps): JSX.Element {
  return (
    <button
      className={className ? styles[className] : styles.button}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
