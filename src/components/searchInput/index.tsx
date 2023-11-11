import React, { Dispatch, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import styles from './input.module.scss';
import Button from '../button';
import { Result, SearchInputProps } from '../../interfaces/searchInput';
import { Item } from '../../interfaces/resultSection';
import handleApiUrl from '../../helpers/handleApiUrl';
import { Context } from '../contexts';
import { Data } from '../../interfaces/contexts';
import { RootState } from '../../store';
import { DispatchSearch, saveSearchValue } from '../../store/searchSlice';
import { setIsLoadingMainValue } from '../../store/isLoadingSlice';

function getAllCharactersList(limit: number, offset: number): Promise<Result> {
  const key = import.meta.env.VITE_API_KEY;
  const hash = import.meta.env.VITE_HASH;
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1&limit=${limit}&apikey=${key}&hash=${hash}&offset=${offset}`;

  return handleApiUrl(apiUrl);
}

function getCharactersList(value: string, limit: number, offset: number): Promise<Result> {
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
  dispatch: Dispatch<AnyAction>,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>
): Promise<void> {
  const { limit, page } = data;
  const offset = page * limit - limit;

  dispatch(setIsLoadingMainValue(true));

  const request = getAllCharactersList(limit, offset);
  const { items, total } = await handleRequest(request);

  setData({ items, page, limit, total });
  dispatch(setIsLoadingMainValue(false));
}

async function fetchCharactersByName(
  inputValue: string,
  dispatch: Dispatch<AnyAction>,
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
  dispatch(setIsLoadingMainValue(true));

  const request = getCharactersList(trimmedInputValue, limit, offset);

  const { items, total } = await handleRequest(request);

  setData({ items, page, limit, total });
  dispatch(setIsLoadingMainValue(false));
}

function runLoadindCharacters(
  inputValue: string,
  dispatch: Dispatch<AnyAction>,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>
): void {
  if (inputValue !== '') {
    fetchCharactersByName(inputValue, dispatch, data, setData);
  } else {
    fetchAllCharacters(dispatch, data, setData);
  }
}

export default function SearchInput({
  type,
  placeholder,
  isExistItems,
}: SearchInputProps): JSX.Element {
  const { data, setData } = useContext(Context);
  const getSearchValue = (state: RootState): string => state.search.value;
  const searchValue = useSelector(getSearchValue);
  const getIsLoadingValue = (state: RootState): boolean => state.isLoading.main;
  const isLoadingValue = useSelector(getIsLoadingValue);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isExistItems && !isLoadingValue) {
      runLoadindCharacters(searchValue, dispatch, data, setData);
    }
  }, [data]);

  return (
    <div className={styles['search-input']}>
      <input
        id="input"
        type={type}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e): DispatchSearch => dispatch(saveSearchValue(e.target.value))}
      />
      <Button
        name="Search"
        onClick={(): Promise<void> => fetchCharactersByName(searchValue, dispatch, data, setData)}
        disabled={isLoadingValue}
      />
    </div>
  );
}
