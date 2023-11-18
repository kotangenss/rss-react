import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import styles from './input.module.scss';
import Button from '../button';
import { SearchInputProps } from '../../interfaces/searchInput';
import { Data } from '../../interfaces/store';
import { RootState } from '../../store';
import { DispatchSearch, saveSearchValue } from '../../store/searchSlice';
import { setIsLoadingMainValue } from '../../store/isLoadingSlice';
import { setDataValue } from '../../store/dataSlice';
import { QueryParams, useGetCharactersQuery } from '../../store/marvelApi';

function searchItems(searchValue: string, dispatch: Dispatch): void {
  dispatch(setIsLoadingMainValue(true));
  localStorage.setItem('searchQuery', searchValue);
  dispatch(setDataValue({ items: undefined, page: 1, limit: 3, total: 0 }));
}

export default function SearchInput({ type, placeholder }: SearchInputProps): JSX.Element {
  const getSearchValue = (state: RootState): string => state.search.value;
  const searchValue = useSelector(getSearchValue);
  const getIsLoadingValue = (state: RootState): boolean => state.isLoading.main;
  const isLoadingValue = useSelector(getIsLoadingValue);
  const getDataValue = (state: RootState): Data => state.data.value;
  const dataValue = useSelector(getDataValue);
  const isExistItems = !!dataValue.items;
  const dispatch = useDispatch();

  const query: QueryParams = {
    limit: String(dataValue.limit),
    offset: String(dataValue.limit * dataValue.page - dataValue.limit),
    nameStartsWith: searchValue,
  };

  const { data, isLoading, isFetching } = useGetCharactersQuery(query, {
    skip: isExistItems,
  });

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(
        setDataValue({
          items: data?.data.results,
          limit: dataValue.limit,
          page: dataValue.page,
          total: data?.data.total,
        })
      );

      dispatch(setIsLoadingMainValue(isLoading));
    }
  }, [data, isLoadingValue, isLoading]);

  return (
    <div className={styles['search-input']}>
      <input
        id="input"
        data-testid="input-search"
        type={type}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e): DispatchSearch => dispatch(saveSearchValue(e.target.value))}
      />
      <Button
        name="Search"
        testid="button-search"
        onClick={(): void => searchItems(searchValue, dispatch)}
        disabled={isLoadingValue}
      />
    </div>
  );
}
