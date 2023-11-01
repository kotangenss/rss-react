import React, { useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import styles from './resultsSection.module.scss';
import Button from '../button';
import { Item, ResultSectionProps } from '../../interfaces/resultSection';

function scrollToHead(myRef: React.RefObject<HTMLDivElement>): void {
  myRef.current?.scrollIntoView();
}

function goToNextPage(
  currentPage: number,
  searchParams: URLSearchParams,
  navigate: NavigateFunction
): void {
  const nextPage = currentPage + 2;
  searchParams.set('page', nextPage.toString());
  navigate(`?${searchParams.toString()}`);
}

function goToPrevPage(
  currentPage: number,
  searchParams: URLSearchParams,
  navigate: NavigateFunction
): void {
  const prevPage = currentPage;
  searchParams.set('page', prevPage.toString());
  navigate(`?${searchParams.toString()}`);
}

export default function ResultSection({
  items: newItems,
  isSearchStart: isLoading,
}: ResultSectionProps): JSX.Element {
  const myRef = React.createRef<HTMLDivElement>();
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);
  let resultHeader;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (newItems && items !== newItems) {
      setItems(newItems);
      setCurrentPage(0);
      searchParams.set('page', '1');
    } else if (items && items.length === 0) {
      searchParams.delete('page');
    } else {
      const params = new URLSearchParams(location.search);
      const page = parseInt(params.get('page') || '1', 10);

      if (!Number.isNaN(page)) {
        setCurrentPage(page - 1);
        searchParams.set('page', page.toString());
      }
    }

    navigate(`?${searchParams.toString()}`);

    scrollToHead(myRef);
  }, [items, newItems, location.search]);

  if (!isLoading) {
    if (items.length === 0) {
      resultHeader = <h2>Nothing found</h2>;
    } else {
      resultHeader = <h2>Results ({items.length})</h2>;
    }
  } else {
    resultHeader = null;
  }

  return (
    <div ref={myRef} className={styles['result-section']}>
      {resultHeader}
      <div className={styles['result-container']}>
        {isLoading ? (
          <div className={styles['loading-container']}>
            <div className={styles['loading-icon']} />
            <p>Please wait. Loading in progress</p>
          </div>
        ) : (
          displayedItems.map((item) => (
            <div key={`item.name-item.id-${Math.random()}`} className={styles['result-item']}>
              <h3>{item.name}</h3>
              <div className={styles['item-img']}>
                <img
                  src={`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`}
                  alt="hero"
                />
              </div>
              <h4 id={styles['description-title']}>Description</h4>
              <p className={styles['item-description']}>{item.description}</p>
              <ul className={styles['item-comics']}>
                <h4>Comics</h4>
                {item.comics.items.map((comicItem) => (
                  <li key={`comics-${comicItem.name}-${item.id}-${Math.random()}`}>
                    {comicItem.name}
                  </li>
                ))}
              </ul>
              <ul className={styles['item-series']}>
                <h4>Series</h4>
                {item.series.items.map((seriesItem) => (
                  <li key={`series-${seriesItem.name}-${Math.random()}`}>{seriesItem.name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <div className={styles['result-pagination']}>
        {isLoading ? (
          <p />
        ) : (
          <>
            <Button
              name="Prev"
              onClick={(): void => goToPrevPage(currentPage, searchParams, navigate)}
              disabled={currentPage === 0}
            />
            {items.length === 0 ? (
              <p>No pages</p>
            ) : (
              <p>
                Page&nbsp;{currentPage + 1}&nbsp;of&nbsp;{Math.ceil(items.length / itemsPerPage)}
              </p>
            )}
            <Button
              name="Next"
              onClick={(): void => goToNextPage(currentPage, searchParams, navigate)}
              disabled={endIndex >= items.length || items.length === 0}
            />
          </>
        )}
      </div>
    </div>
  );
}
