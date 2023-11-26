import React from 'react';
import { ButtonProps } from 'src/interfaces/button';
import styles from './index.module.scss';

export default function Button({
  className,
  name,
  onClick,
  disabled,
  testid,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={className ? styles[className] : styles.button}
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={testid}
    >
      {name}
    </button>
  );
}
