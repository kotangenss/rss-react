import React from 'react';
import styles from './input.module.scss';
import Button from '../button';
import { SearchInputProps } from '../../interfaces/searchSection';

export default class SearchInput extends React.Component<SearchInputProps> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { type, placeholder } = this.props;

    return (
      <div className={styles['search-input']}>
        <input type={type} placeholder={placeholder} />
        <Button name="Search" />
      </div>
    );
  }
}
