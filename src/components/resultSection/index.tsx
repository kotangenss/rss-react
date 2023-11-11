import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import styles from './resultsSection.module.scss';
import Button from '../button';
import SelectInput from '../selectInput';
import Loader from '../loader';
import { Data } from '../../interfaces/contexts';
import { RootState } from '../../store';
import { setDataValue } from '../../store/dataSlice';

function scrollToHead(myRef: React.RefObject<HTMLDivElement>): void {
  myRef.current?.scrollIntoView();
}

function goToNextPage(data: Data, dispatch: Dispatch): void {
  const { page, limit, total } = data;
  dispatch(setDataValue({ items: undefined, page: page + 1, limit, total }));
}

function goToPrevPage(data: Data, dispatch: Dispatch): void {
  const { page, limit, total } = data;
  dispatch(setDataValue({ items: undefined, page: page - 1, limit, total }));
}

function handleItemCountChange(
  event: React.ChangeEvent<HTMLSelectElement>,
  data: Data,
  dispatch: Dispatch
): void {
  const limit = parseInt(event.target.value, 10);
  const { total } = data;
  dispatch(setDataValue({ items: undefined, page: 1, limit, total }));
}

export default function ResultSection(): JSX.Element {
  const getDataValue = (state: RootState): Data => state.data.value;
  const dataValue = useSelector(getDataValue);
  const dispatch = useDispatch();
  const { items, page, total, limit } = dataValue;
  const myRef = React.createRef<HTMLDivElement>();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const itemsPerPage = ['3', '6', '9'];
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
  const getIsLoadingValue = (state: RootState): boolean => state.isLoading.main;
  const isLoadingValue = useSelector(getIsLoadingValue);
  let resultHeader;

  if (itemCounts === 0) {
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
      {!isLoadingValue && resultHeader}
      <SelectInput
        onSelectChange={(event): void => handleItemCountChange(event, dataValue, dispatch)}
        options={itemsPerPage}
        value={String(limit)}
      />
      <div className={styles['result-container']}>
        {isLoadingValue ? <Loader size="s" /> : itemList}
      </div>
      <div className={styles['result-pagination']}>
        {isLoadingValue ? (
          <p />
        ) : (
          <>
            <Button
              name="Prev"
              onClick={(): void => goToPrevPage(dataValue, dispatch)}
              disabled={page === 1}
            />
            {pagesnumberOfPages}
            <Button
              name="Next"
              onClick={(): void => goToNextPage(dataValue, dispatch)}
              disabled={page === Math.ceil(total / limit) || itemCounts === 0}
            />
          </>
        )}
      </div>
    </div>
  );
}
