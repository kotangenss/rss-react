import React, { useEffect, useState } from 'react';
import styles from './input.module.scss';
import Button from '../button';
import { Result, SearchInputProps } from '../../interfaces/searchInput';
import { Item } from '../../interfaces/resultSection';
import handleApiUrl from '../../helpers/handleApiUrl';

export function getCharactersList(value: string, limit: number, offset: number): Promise<Result> {
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&limit=${limit}&apikey=fc27ccfdf4f6216977c85675f33f1731&hash=90cbc144b23e3074532d7dda72228c74&nameStartsWith=${value.trim()}&offset=${offset}`;

  return handleApiUrl(apiUrl);
}

function handleRequestsAndResults(
  requests: Promise<Result>[],
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleResult: (results: Item[]) => void
): void {
  Promise.all(requests)
    .then((responses) => {
      const characters: Item[] = [];

      responses.forEach((response) => {
        characters.push(...response.data.results);
      });

      handleResult(characters);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsLoading(false);
    });
}

function fetchAllCharacters(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleResult: (results: Item[]) => void,
  handleStartSearch: () => void
): void {
  const limit = 100;
  const offset = 0;
  const requests = [];

  setIsLoading(true);
  handleStartSearch();

  for (let letter = 'a'.charCodeAt(0); letter <= 'z'.charCodeAt(0); letter += 1) {
    const letterChar = String.fromCharCode(letter);
    requests.push(getCharactersList(letterChar, limit, offset));
  }

  handleRequestsAndResults(requests, setIsLoading, handleResult);
}

export function handleSearch(
  inputValue: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleResult: (results: Item[]) => void,
  handleStartSearch: () => void
): void {
  const limit = 100;
  const totalCharacters = 200;
  const requests = [];
  const trimmedInputValue = inputValue.trim();

  if (trimmedInputValue === '') {
    handleResult([]);
    return;
  }

  localStorage.setItem('searchQuery', trimmedInputValue);
  setIsLoading(true);
  handleStartSearch();

  for (let offset = 0; offset < totalCharacters; offset += limit) {
    requests.push(getCharactersList(trimmedInputValue, limit, offset));
  }

  handleRequestsAndResults(requests, setIsLoading, handleResult);
}

function handleInputChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
): void {
  setInputValue(e.target.value);
}

export default function SearchInput({
  type,
  placeholder,
  handleResult,
  handleStartSearch,
  isExistItems,
}: SearchInputProps): JSX.Element {
  const [inputValue, setInputValue] = useState(localStorage.getItem('searchQuery') || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isExistItems && !isLoading) {
      if (inputValue !== '') {
        handleSearch(inputValue, setIsLoading, handleResult, handleStartSearch);
      } else {
        fetchAllCharacters(setIsLoading, handleResult, handleStartSearch);
      }
    }
  }, [handleResult, handleStartSearch]);

  return (
    <div className={styles['search-input']}>
      <input
        id="input"
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e): void => handleInputChange(e, setInputValue)}
      />
      <Button
        name="Search"
        onClick={(): void =>
          handleSearch(inputValue, setIsLoading, handleResult, handleStartSearch)
        }
        disabled={isLoading}
      />
    </div>
  );
}
