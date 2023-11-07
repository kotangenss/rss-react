import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from './input.module.scss';
import Button from '../button';
import { Result, SearchInputProps } from '../../interfaces/searchInput';
import { Item } from '../../interfaces/resultSection';
import handleApiUrl from '../../helpers/handleApiUrl';
import { Context, InputValueContext, IsLoadingContext } from '../contexts';
import { Data } from '../../interfaces/contexts';

function getAllCharactersList(limit: number, offset: number): Promise<Result> {
  const key = import.meta.env.VITE_API_KEY;
  const hash = import.meta.env.VITE_HASH;
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&limit=${limit}&apikey=${key}&hash=${hash}&offset=${offset}`;

  return handleApiUrl(apiUrl);
}

export function getCharactersList(value: string, limit: number, offset: number): Promise<Result> {
  const key = import.meta.env.VITE_API_KEY;
  const hash = import.meta.env.VITE_HASH;
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&limit=${limit}&apikey=${key}&hash=${hash}&nameStartsWith=${value.trim()}&offset=${offset}`;

  return handleApiUrl(apiUrl);
}

function handleRequest(
  request: Promise<Result>
): Promise<{ items: Item[] | undefined; total: number }> {
  return request
    .then((response) => {
      return { items: response.data.results, total: response.data.total };
    })
    .catch((error) => {
      console.error('Error:', error);
      return { items: undefined, total: 0 };
    });
}

async function fetchAllCharacters(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>
): Promise<void> {
  const { limit, page } = data;
  const offset = page * limit - limit;

  setIsLoading(true);

  const request = getAllCharactersList(limit, offset);

  const { items, total } = await handleRequest(request);

  setData({ items, page, limit, total });
  setIsLoading(false);
}

export async function handleSearch(
  inputValue: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>
): Promise<void> {
  const { limit, page } = data;
  const offset = page * limit - limit;
  const trimmedInputValue = inputValue.trim();

  if (trimmedInputValue === '') {
    setData({ items: [], page, limit, total: 0 });
    return;
  }

  localStorage.setItem('searchQuery', trimmedInputValue);
  setIsLoading(true);

  const request = getCharactersList(trimmedInputValue, limit, offset);

  const { items, total } = await handleRequest(request);

  setData({ items, page, limit, total });
  setIsLoading(false);
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
  const { data, setData } = useContext(Context);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [inputValue, setInputValue] = useState(localStorage.getItem('searchQuery') || '');
  const contextInputValue = useMemo(() => ({ inputValue, setInputValue }), [inputValue]);

  useEffect(() => {
    if (!isExistItems && !isLoading) {
      if (inputValue !== '') {
        handleSearch(inputValue, setIsLoading, data, setData);
      } else {
        fetchAllCharacters(setIsLoading, data, setData);
      }
    }
  }, [data]);

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
          onClick={(): void => setData({ items: undefined, page: 1, limit: 3, total: 0 })}
          disabled={isLoading}
        />
      </div>
    </InputValueContext.Provider>
  );
}
