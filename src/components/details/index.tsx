import { useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { GeneralItem, Item } from '../../interfaces/resultSection';
import styles from './details.module.scss';
import Button from '../button';
import { Result } from '../../interfaces/searchInput';
import Loader from '../loader';
import handleApiUrl from '../../helpers/handleApiUrl';

function handleCloseClick(searchParams: URLSearchParams, navigate: NavigateFunction): void {
  searchParams.delete('details');
  searchParams.delete('name');
  navigate(`?${searchParams.toString()}`);
}

export function getCharacter(itemId: number): Promise<Result> {
  const key = import.meta.env.VITE_API_KEY;
  const hash = import.meta.env.VITE_HASH;
  const apiUrl = `https://gateway.marvel.com/v1/public/characters/${itemId}?ts=1&apikey=${key}&hash=${hash}`;

  return handleApiUrl(apiUrl);
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
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('details');
  const comicsList = getListItems(item?.id, item?.comics.items, 'No comics');
  const seriesList = getListItems(item?.id, item?.series.items, 'No series');

  useEffect(() => {
    if (itemId) {
      setIsLoading(true);
      getCharacter(Number(itemId))
        .then((response) => {
          setItem(response.data.results[0]);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          searchParams.delete('details');
          searchParams.delete('name');
          setIsLoading(false);
          console.error('Error:', error);
          navigate(`?${searchParams.toString()}`);
        });
    } else {
      setItem(null);
      setIsLoading(false);
    }
  }, [itemId]);

  if (isLoading) {
    window.scrollTo(0, 0);
    return (
      <div className={styles.container}>
        <Loader size="m" />
      </div>
    );
  }

  if (!item) return <span />;

  return (
    <div className={styles.container}>
      <h2>Details</h2>
      <h3>
        {item.name} <span>({item.id})</span>
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
        onClick={(): void => handleCloseClick(searchParams, navigate)}
      />
    </div>
  );
}
