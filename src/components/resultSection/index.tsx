import React, { useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './resultsSection.module.scss';
import Button from '../button';
import { Item, ResultSectionProps } from '../../interfaces/resultSection';
import SelectInput from '../selectInput';

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

function handleItemCountChange(
  event: React.ChangeEvent<HTMLSelectElement>,
  setSelectedItemCount: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  searchParams: URLSearchParams,
  navigate: NavigateFunction
): void {
  const newSelectedItemCount = parseInt(event.target.value, 10);
  setSelectedItemCount(newSelectedItemCount);
  setCurrentPage(0);
  searchParams.set('page', '1');
  navigate(`?${searchParams.toString()}`);
}

function getActiveItem(searchParams: URLSearchParams, items: Item[]): Item | null {
  if (searchParams.has('details')) {
    const activeItem: Item | undefined = items.find(
      (item: Item) => String(item.id) === searchParams.get('details')
    );

    return activeItem || null;
  }
  return null;
}

function getPage(searchParams: URLSearchParams): number {
  const page = parseInt(searchParams.get('page') || '1', 10);
  if (Number.isNaN(page)) {
    return 1;
  }
  return page;
}

export default function ResultSection({
  items: newItems,
  isSearchStart: isLoading,
  haddleUpdateDetail,
}: ResultSectionProps): JSX.Element {
  const myRef = React.createRef<HTMLDivElement>();
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemCount, setSelectedItemCount] = useState(3);
  const startIndex = currentPage * selectedItemCount;
  const endIndex = startIndex + selectedItemCount;
  const displayedItems = items.slice(startIndex, endIndex);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const itemList = displayedItems.map((item) => (
    <Link
      to={`/?page=${currentPage + 1}&details=${item.id}&name=${item.name}`}
      key={`item.name-item.id-${Math.random()}`}
      className={styles['result-item']}
    >
      <h3>{item.name}</h3>
      <div className={styles['item-img']}>
        <img
          src={`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`}
          alt={item.name}
        />
      </div>
      <h4 id={styles['description-title']}>Description</h4>
      <p className={styles['item-description']}>
        {item.description ? item.description : 'No description'}
      </p>
    </Link>
  ));
  const pagesnumberOfPages =
    items.length === 0 ? (
      <p>No pages</p>
    ) : (
      <p>
        Page&nbsp;{currentPage + 1}&nbsp;of&nbsp;
        {Math.ceil(items.length / selectedItemCount)}
      </p>
    );
  let resultHeader;

  if (isLoading) {
    resultHeader = null;
  } else if (items.length === 0) {
    resultHeader = <h2>Nothing found</h2>;
  } else {
    resultHeader = <h2>Results ({items.length})</h2>;
  }

  useEffect(() => {
    const activeItem = getActiveItem(searchParams, items);

    haddleUpdateDetail(activeItem);

    if (newItems && items !== newItems) {
      setItems(newItems);
      setCurrentPage(0);
      searchParams.set('page', '1');
    } else if (items && items.length === 0) {
      searchParams.delete('page');
      searchParams.delete('details');
      searchParams.delete('name');
    } else {
      const page = getPage(searchParams);

      setCurrentPage(page - 1);
      searchParams.set('page', page.toString());
    }

    navigate(`?${searchParams.toString()}`);

    scrollToHead(myRef);
  }, [items, newItems, location.search]);

  return (
    <div ref={myRef} className={styles['result-section']}>
      {resultHeader}
      <SelectInput
        onSelectChange={(event): void =>
          handleItemCountChange(event, setSelectedItemCount, setCurrentPage, searchParams, navigate)
        }
        options={['3', '6', '9']}
      />
      <div className={styles['result-container']}>
        {isLoading ? (
          <div className={styles['loading-container']}>
            <div className={styles['loading-icon']} />
            <p>Please wait. Loading in progress</p>
          </div>
        ) : (
          itemList
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
            {pagesnumberOfPages}
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
