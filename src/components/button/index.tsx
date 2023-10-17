import React from 'react';
import styles from './button.module.scss';
import { ButtonProps } from '../../interfaces/searchSection';

export default class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { name, onClick, disabled } = this.props;

    return (
      <button className={styles.button} type="button" onClick={onClick} disabled={disabled}>
        {name}
      </button>
    );
  }
}
