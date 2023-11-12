import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { GeneralItem } from '../../interfaces/resultSection';
import styles from './details.module.scss';
import Button from '../button';
import Loader from '../loader';
import { RootState } from '../../store';
import { useGetCharacterQuery } from '../../store/marvelApi';
import { setActiveItemIdValue } from '../../store/activeItemIdSlice';
import { setIsLoadingDetailsValue } from '../../store/isLoadingSlice';

function handleCloseClick(
  searchParams: URLSearchParams,
  navigate: NavigateFunction,
  dispatch: Dispatch
): void {
  searchParams.delete('details');
  searchParams.delete('name');
  dispatch(setActiveItemIdValue(undefined));
  navigate(`?${searchParams.toString()}`);
}

function getListItems(
  itemId: number | undefined,
  items: GeneralItem[] | undefined,
  defaultValue: string
): string | JSX.Element[] {
  if (items && items.length > 0) {
    return items.map((item: GeneralItem) => (
      <li key={`comics-${item.name}-${itemId}-${Math.random()}`}>{item.name}</li>
    ));
  }

  return defaultValue;
}

export default function Details(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const getActiveItemIdValue = (state: RootState): undefined | number => state.activeItemId.value;
  const itemId = useSelector(getActiveItemIdValue);
  const getIsLoadingValue = (state: RootState): boolean => state.isLoading.details;
  const isLoading = useSelector(getIsLoadingValue);
  const dispatch = useDispatch();

  const { data, isError, error } = useGetCharacterQuery(itemId, {
    skip: itemId === undefined,
  });

  const item = itemId && data?.data.results[0].id === itemId ? data?.data.results[0] : undefined;
  const comicsList = getListItems(item?.id, item?.comics.items, 'No comics');
  const seriesList = getListItems(item?.id, item?.series.items, 'No series');

  useEffect(() => {
    if (item) {
      dispatch(setIsLoadingDetailsValue(false));
    }
  }, [data]);

  if (isError) {
    searchParams.delete('details');
    searchParams.delete('name');
    console.error('Error:', error);
    navigate(`?${searchParams.toString()}`);
  }

  if (itemId) window.scrollTo(0, 0);

  if (!isLoading && !item) return <span />;

  return (
    <div className={styles.container}>
      {!isLoading && item ? (
        <div>
          <h2>Details</h2>
          <h3>
            {item.name} <span data-testid={`detailes-id-${item.id}`}>({item.id})</span>
          </h3>
          <p>{item.description}</p>
          <img
            src={`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`}
            alt={item.name}
          />
          <ul className={styles['item-comics']}>
            <h4>Comics</h4>
            {comicsList}
          </ul>
          <ul className={styles['item-series']}>
            <h4>Series</h4>
            {seriesList}
          </ul>
          <Button
            className={styles['close-details']}
            name="x"
            onClick={(): void => handleCloseClick(searchParams, navigate, dispatch)}
          />
        </div>
      ) : (
        <Loader size="m" />
      )}
    </div>
  );
}
