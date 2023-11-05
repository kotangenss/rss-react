import React, { useState } from 'react';
import { NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchSection from '../../components/searchSection';
import styles from './main.module.scss';
import ResultSection from '../../components/resultSection';
import { Item } from '../../interfaces/resultSection';
import Button from '../../components/button';

function handleResultInput(
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[] | undefined>>,
  setIsSearchStart: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setItems(items);
  setIsSearchStart(false);
}

function handleStartSearch(setIsSearchStart: React.Dispatch<React.SetStateAction<boolean>>): void {
  setIsSearchStart(true);
}

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
  const [isSearchStart, setIsSearchStart] = useState(false);
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

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
        <SearchSection
          handleResult={(newItems): void => handleResultInput(newItems, setItems, setIsSearchStart)}
          handleStartSearch={(): void => handleStartSearch(setIsSearchStart)}
          isExistItems={!!items}
        />
        <ResultSection items={items} isSearchStart={isSearchStart} />
      </div>
      <Outlet />
    </div>
  );
}
