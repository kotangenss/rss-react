import React, { useEffect, useState } from 'react';
import { NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import SearchSection from '../../components/searchSection';
import styles from './main.module.scss';
import ResultSection from '../../components/resultSection';
import Button from '../../components/button';
import { Data } from '../../interfaces/contexts';
import { RootState } from '../../store';
import { setActiveItemIdValue } from '../../store/activeItemIdSlice';

function handleButtonClick(setHasError: React.Dispatch<React.SetStateAction<boolean>>): void {
  setHasError(true);
}

function handleClickOnMain(
  searchParams: URLSearchParams,
  navigate: NavigateFunction,
  dispatch: Dispatch
): void {
  if (searchParams.has('details')) {
    searchParams.delete('details');
    searchParams.delete('name');
    dispatch(setActiveItemIdValue(undefined));
    navigate(`?${searchParams.toString()}`);
  }
}

export default function Main(): JSX.Element {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const getDataValue = (state: RootState): Data => state.data.value;
  const dataValue = useSelector(getDataValue);
  const getActiveItemId = (state: RootState): number | undefined => state.activeItemId.value;
  const activeItemId = useSelector(getActiveItemId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeItemId) {
      searchParams.delete('details');
      searchParams.delete('name');
      navigate(`?${searchParams.toString()}`);
    }
  }, [activeItemId]);

  if (hasError) {
    throw new Error('Throw an error after clicking a button');
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.main}
        onClick={(): void => handleClickOnMain(searchParams, navigate, dispatch)}
        aria-hidden="true"
        data-testid="main"
      >
        <Button
          className="simulate-button"
          name="Simulate Error"
          onClick={(): void => handleButtonClick(setHasError)}
        />
        <SearchSection isExistItems={!!dataValue.items} />
        <ResultSection />
        <p className={styles.attribution}>Data provided by Marvel. © 2014 Marvel</p>
      </div>
      <Outlet />
    </div>
  );
}
