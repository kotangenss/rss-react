'use client';

import React, { useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Details from '../details';
import ResultSection from '../resultSection';
import SearchSection from '../searchSection';
import Button from '../button';
import styles from './index.module.scss';

export default function Main({
  mainData,
  detailData,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [hasError, setHasError] = useState(false);
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());
  const router = useRouter();

  if (hasError) {
    throw new Error('Throw an error after clicking a button');
  }

  const handleClickOnMain = (): void => {
    if (urlSearchParams.has('details')) {
      urlSearchParams.delete('details');
      router.push(`?${urlSearchParams.toString()}`);
    }
  };

  const handleClickOnSimulateError = (): void => {
    setHasError(true);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.main}
        onClick={handleClickOnMain}
        aria-hidden="true"
        data-testid="main"
      >
        <Button
          className="simulate-button"
          name="Simulate Error"
          onClick={handleClickOnSimulateError}
        />
        <SearchSection />
        <ResultSection mainData={mainData} />
        <p className={styles.attribution}>Data provided by Marvel. © 2014 Marvel</p>
      </div>
      <Details detailData={detailData} />
    </div>
  );
}
