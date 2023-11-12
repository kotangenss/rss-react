import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './input.module.scss';
import Button from '../button';
import { SearchInputProps } from '../../interfaces/searchInput';
import { Data } from '../../interfaces/contexts';
import { RootState } from '../../store';
import { DispatchSearch, saveSearchValue } from '../../store/searchSlice';
import { setIsLoadingMainValue } from '../../store/isLoadingSlice';
import { DispatchData, setDataValue } from '../../store/dataSlice';
import { QueryParams, useGetCharactersQuery } from '../../store/marvelApi';

export default function SearchInput({
  type,
  placeholder,
  isExistItems,
}: SearchInputProps): JSX.Element {
  const getSearchValue = (state: RootState): string => state.search.value;
  const searchValue = useSelector(getSearchValue);
  const getIsLoadingValue = (state: RootState): boolean => state.isLoading.main;
  const isLoadingValue = useSelector(getIsLoadingValue);
  const getDataValue = (state: RootState): Data => state.data.value;
  const dataValue = useSelector(getDataValue);
  const dispatch = useDispatch();

  const query: QueryParams = {
    limit: String(dataValue.limit),
    offset: String(dataValue.limit * dataValue.page - dataValue.limit),
    nameStartsWith: searchValue,
  };

  const { data, isLoading } = useGetCharactersQuery(query, {
    skip: isExistItems,
  });

  useEffect(() => {
    dispatch(
      setDataValue({
        items: data?.data.results,
        limit: dataValue.limit,
        page: dataValue.page,
        total: data?.data.total,
      })
    );
    dispatch(setIsLoadingMainValue(isLoading));
  }, [dataValue.items, data, isLoading]);

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
        onClick={(): DispatchData =>
          dispatch(setDataValue({ items: undefined, page: 1, limit: 3, total: 0 }))
        }
        disabled={isLoadingValue}
      />
    </div>
  );
}
