import React from 'react';
import styles from './input.module.scss';
import Button from '../button';
import { SearchInputProps } from '../../interfaces/searchSection';
import { Item } from '../../interfaces/resultSection';

export interface Result {
  data: {
    results: Item[];
  };
}

export default class SearchInput extends React.Component<SearchInputProps, { inputValue: string }> {
  static loadData(inputValue: string, limit: number, offset: number): Promise<Result> {
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&limit=${limit}&apikey=fc27ccfdf4f6216977c85675f33f1731&hash=90cbc144b23e3074532d7dda72228c74&nameStartsWith=${inputValue.trim()}&offset=${offset}`;

    return fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    });
  }

  constructor(props: SearchInputProps) {
    super(props);
    const inputValue = localStorage.getItem('searchQuery') || '';
    this.state = {
      inputValue,
    };

    if (inputValue !== '') {
      this.handleSearch();
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = (): void => {
    const { inputValue } = this.state;
    const { handleResult } = this.props;
    const limit = 100;
    const totalCharacters = 250;
    const requests = [];

    localStorage.setItem('searchQuery', inputValue);

    for (let offset = 0; offset < totalCharacters; offset += limit) {
      requests.push(SearchInput.loadData(inputValue, limit, offset));
    }

    Promise.all(requests)
      .then((responses) => {
        const characters: Item[] = [];

        responses.forEach((response) => {
          characters.push(...response.data.results);
        });

        handleResult(characters);
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
          id="input"
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
