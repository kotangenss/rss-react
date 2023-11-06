import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from './input.module.scss';
import Button from '../button';
import { Result, SearchInputProps } from '../../interfaces/searchInput';
import { Item } from '../../interfaces/resultSection';
import handleApiUrl from '../../helpers/handleApiUrl';
import { Context, InputValueContext, IsLoadingContext } from '../contexts';

export function getCharactersList(value: string, limit: number, offset: number): Promise<Result> {
  const key = import.meta.env.VITE_API_KEY;
  const hash = import.meta.env.VITE_HASH;
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&limit=${limit}&apikey=${key}&hash=${hash}&nameStartsWith=${value.trim()}&offset=${offset}`;

  return handleApiUrl(apiUrl);
}

function handleRequestsAndResults(
  requests: Promise<Result>[],
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setItems: (results: Item[]) => void
): void {
  Promise.all(requests)
    .then((responses) => {
      const characters: Item[] = [];

      responses.forEach((response) => {
        characters.push(...response.data.results);
      });

      setItems(characters);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsLoading(false);
    });
}

function fetchAllCharacters(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setItems: (results: Item[]) => void
): void {
  const limit = 100;
  const offset = 0;
  const requests = [];

  setIsLoading(true);

  for (let letter = 'a'.charCodeAt(0); letter <= 'z'.charCodeAt(0); letter += 1) {
    const letterChar = String.fromCharCode(letter);
    requests.push(getCharactersList(letterChar, limit, offset));
  }

  handleRequestsAndResults(requests, setIsLoading, setItems);
}

export function handleSearch(
  inputValue: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setItems: (results: Item[]) => void
): void {
  const limit = 100;
  const totalCharacters = 200;
  const requests = [];
  const trimmedInputValue = inputValue.trim();

  if (trimmedInputValue === '') {
    setItems([]);
    return;
  }

  localStorage.setItem('searchQuery', trimmedInputValue);
  setIsLoading(true);

  for (let offset = 0; offset < totalCharacters; offset += limit) {
    requests.push(getCharactersList(trimmedInputValue, limit, offset));
  }

  handleRequestsAndResults(requests, setIsLoading, setItems);
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
  isExistItems,
}: SearchInputProps): JSX.Element {
  const { setItems } = useContext(Context);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [inputValue, setInputValue] = useState(localStorage.getItem('searchQuery') || '');
  const contextInputValue = useMemo(() => ({ inputValue, setInputValue }), [inputValue]);

  useEffect(() => {
    if (!isExistItems && !isLoading) {
      if (inputValue !== '') {
        handleSearch(inputValue, setIsLoading, setItems);
      } else {
        fetchAllCharacters(setIsLoading, setItems);
      }
    }
  }, [setItems, setIsLoading]);

  return (
    <InputValueContext.Provider value={contextInputValue}>
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
          onClick={(): void => handleSearch(inputValue, setIsLoading, setItems)}
          disabled={isLoading}
        />
      </div>
    </InputValueContext.Provider>
  );
}
