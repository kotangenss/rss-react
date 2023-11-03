import { useContext } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { GeneralItem, Item } from '../../interfaces/resultSection';
import styles from './details.module.scss';
import { DetailContext } from '../detailContext';
import Button from '../button';

function handleCloseClick(searchParams: URLSearchParams, navigate: NavigateFunction): void {
  searchParams.delete('details');
  searchParams.delete('name');
  navigate(`?${searchParams.toString()}`);
}

export default function Details(): JSX.Element {
  const item: Item | null = useContext(DetailContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const comicsList =
    item && item.comics.items.length > 0
      ? item.comics.items.map((comicItem: GeneralItem) => (
          <li key={`comics-${comicItem.name}-${item.id}-${Math.random()}`}>{comicItem.name}</li>
        ))
      : 'No comics';

  const seriesList =
    item && item.series.items.length > 0
      ? item.series.items.map((seriesItem: GeneralItem) => (
          <li key={`comics-${seriesItem.name}-${item.id}-${Math.random()}`}>{seriesItem.name}</li>
        ))
      : 'No series';

  if (!item) return <div />;

  return (
    <div className={styles.container}>
      <h2>Details</h2>
      <h3>
        <span>{item.name}</span> ({item.id})
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
