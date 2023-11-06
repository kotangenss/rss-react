import React, { useMemo, useState } from 'react';
import { NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchSection from '../../components/searchSection';
import styles from './main.module.scss';
import ResultSection from '../../components/resultSection';
import { Item } from '../../interfaces/resultSection';
import Button from '../../components/button';
import { Context, IsLoadingContext } from '../../components/contexts';

function handleButtonClick(setHasError: React.Dispatch<React.SetStateAction<boolean>>): void {
  setHasError(true);
}

function handleClickOnMain(searchParams: URLSearchParams, navigate: NavigateFunction): void {
  if (searchParams.has('details')) {
    searchParams.delete('details');
    searchParams.delete('name');
    navigate(`?${searchParams.toString()}`);
  }
}

export default function Main(): JSX.Element {
  const [items, setItems] = useState<Item[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const contextValue = useMemo(() => ({ items, setItems }), [items]);
  const contextIsLoadingValue = useMemo(() => ({ isLoading, setIsLoading }), [isLoading]);

  if (hasError) {
    throw new Error('Throw an error after clicking a button');
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.main}
        onClick={(): void => handleClickOnMain(searchParams, navigate)}
        aria-hidden="true"
      >
        <Button
          className="simulate-button"
          name="Simulate Error"
          onClick={(): void => handleButtonClick(setHasError)}
        />
        <Context.Provider value={contextValue}>
          <IsLoadingContext.Provider value={contextIsLoadingValue}>
            <SearchSection isExistItems={!!items} />
            <ResultSection />
          </IsLoadingContext.Provider>
        </Context.Provider>
      </div>
      <Outlet />
    </div>
  );
}
