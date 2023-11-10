import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './resultsSection.module.scss';
import Button from '../button';
import SelectInput from '../selectInput';
import Loader from '../loader';
import { Context, IsLoadingContext } from '../contexts';
import { Data } from '../../interfaces/contexts';

function scrollToHead(myRef: React.RefObject<HTMLDivElement>): void {
  myRef.current?.scrollIntoView();
}

function goToNextPage(data: Data, setData: React.Dispatch<React.SetStateAction<Data>>): void {
  const { page, limit, total } = data;
  setData({ items: undefined, page: page + 1, limit, total });
}

function goToPrevPage(data: Data, setData: React.Dispatch<React.SetStateAction<Data>>): void {
  const { page, limit, total } = data;
  setData({ items: undefined, page: page - 1, limit, total });
}

function handleItemCountChange(
  event: React.ChangeEvent<HTMLSelectElement>,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>
): void {
  const limit = parseInt(event.target.value, 10);
  const { total } = data;
  setData({ items: undefined, page: 1, limit, total });
}

export default function ResultSection(): JSX.Element {
  const { data, setData } = useContext(Context);
  const { items, page, total, limit } = data;
  const { isLoading } = useContext(IsLoadingContext);
  const myRef = React.createRef<HTMLDivElement>();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const itemList = items?.map((item) => (
    <Link
      data-testid={`link-${item.id}`}
      to={`/?page=${page}&details=${item.id}&name=${item.name}`}
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
  const itemCounts = items?.length || 0;
  const pagesnumberOfPages =
    itemCounts === 0 ? (
      <p>No pages</p>
    ) : (
      <p>
        Page&nbsp;{page}&nbsp;of&nbsp;
        {Math.ceil(total / limit)}
      </p>
    );
  let resultHeader;

  if (isLoading) {
    resultHeader = null;
  } else if (itemCounts === 0) {
    resultHeader = <h2>Nothing found</h2>;
  } else {
    resultHeader = <h2>Results ({total})</h2>;
  }

  useEffect(() => {
    if (items) {
      searchParams.set('page', String(page));
      navigate(`?${searchParams.toString()}`);
    } else {
      searchParams.delete('page');
      navigate(`?${searchParams.toString()}`);
    }

    scrollToHead(myRef);
  }, [items]);

  return (
    <div ref={myRef} className={styles['result-section']}>
      {resultHeader}
      <SelectInput
        onSelectChange={(event): void => handleItemCountChange(event, data, setData)}
        options={['3', '6', '9']}
        value={String(limit)}
      />
      <div className={styles['result-container']}>{isLoading ? <Loader size="s" /> : itemList}</div>
      <div className={styles['result-pagination']}>
        {isLoading ? (
          <p />
        ) : (
          <>
            <Button
              name="Prev"
              onClick={(): void => goToPrevPage(data, setData)}
              disabled={page === 1}
            />
            {pagesnumberOfPages}
            <Button
              name="Next"
              onClick={(): void => goToNextPage(data, setData)}
              disabled={page === Math.ceil(total / limit) || itemCounts === 0}
            />
          </>
        )}
      </div>
    </div>
  );
}
