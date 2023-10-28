import React from 'react';
import styles from './input.module.scss';
import Button from '../button';
import { Result, SearchInputProps, SearchInputState } from '../../interfaces/searchInput';
import { Item } from '../../interfaces/resultSection';

export default class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
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
      isLoading: false,
    };
  }

  componentDidMount(): void {
    const { inputValue } = this.state;
    if (inputValue !== '') {
      this.handleSearch();
    } else {
      this.fetchAllCharacters();
    }
  }

  fetchAllCharacters = (): void => {
    const limit = 100;
    const offset = 0;
    const requests = [];
    const { handleStartSearch, handleResult } = this.props;

    this.setState({ isLoading: true });
    handleStartSearch();

    for (let letter = 'a'.charCodeAt(0); letter <= 'z'.charCodeAt(0); letter += 1) {
      const letterChar = String.fromCharCode(letter);
      requests.push(SearchInput.loadData(letterChar, limit, offset));
    }

    this.handleRequestsAndResults(requests, handleResult);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = (): void => {
    const { inputValue } = this.state;
    const { handleResult, handleStartSearch } = this.props;
    const limit = 100;
    const totalCharacters = 200;
    const requests = [];

    const trimmedInputValue = inputValue.trim();
    if (trimmedInputValue === '') {
      handleResult([]);
      this.setState({ isLoading: false });
      return;
    }

    localStorage.setItem('searchQuery', trimmedInputValue);
    this.setState({ isLoading: true });
    handleStartSearch();

    for (let offset = 0; offset < totalCharacters; offset += limit) {
      requests.push(SearchInput.loadData(trimmedInputValue, limit, offset));
    }

    this.handleRequestsAndResults(requests, handleResult);
  };

  handleRequestsAndResults = (
    requests: Promise<Result>[],
    handleResult: (results: Item[]) => void
  ): void => {
    Promise.all(requests)
      .then((responses) => {
        const characters: Item[] = [];

        responses.forEach((response) => {
          characters.push(...response.data.results);
        });

        handleResult(characters);
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ isLoading: false });
      });
  };

  render(): JSX.Element {
    const { type, placeholder } = this.props;
    const { inputValue, isLoading } = this.state;

    return (
      <div className={styles['search-input']}>
        <input
          id="input"
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={this.handleInputChange}
        />
        <Button name="Search" onClick={this.handleSearch} disabled={isLoading} />
      </div>
    );
  }
}
