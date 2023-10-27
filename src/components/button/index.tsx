import React from 'react';
import styles from './button.module.scss';
import { ButtonProps } from '../../interfaces/button';

export default class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { className, name, onClick, disabled } = this.props;

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
}
