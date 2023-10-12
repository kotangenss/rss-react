import React from 'react';
import styles from './input.module.scss';
import Button from '../button';
import { SearchInputProps } from '../../interfaces/searchSection';

export default class SearchInput extends React.Component<SearchInputProps, { inputValue: string }> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = (): void => {
    const { inputValue } = this.state;
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=fc27ccfdf4f6216977c85675f33f1731&hash=90cbc144b23e3074532d7dda72228c74&limit=3&nameStartsWith=${inputValue}`;
    const { handleResult } = this.props;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        handleResult(data.data.results);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render(): JSX.Element {
    const { type, placeholder } = this.props;
    const { inputValue } = this.state;

    return (
      <div className={styles['search-input']}>
        <input
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={this.handleInputChange}
        />
        <Button name="Search" onClick={this.handleSearch} />
      </div>
    );
  }
}
