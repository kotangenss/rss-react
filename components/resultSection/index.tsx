import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ApiResp } from 'src/interfaces/api';
import SelectInput from '../selectInput';
import Button from '../button';
import styles from './index.module.scss';

export default function ResultSection({ mainData }: { mainData: ApiResp }): JSX.Element {
  const { results: items, limit, total } = mainData || {};
  const myRef = React.createRef<HTMLDivElement>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());
  const page = Number(urlSearchParams.get('page') || 1);
  const itemsPerPage = ['3', '6', '9'];
  const imageWidth = urlSearchParams.has('details') ? 297 : 396;
  const imageHeight = urlSearchParams.has('details') ? 446 : 594;
  const itemList = items?.map((item) => (
    <Link
      data-testid={`link-${item.id}`}
      href={`/?${urlSearchParams.toString()}&details=${item.id}`}
      key={`item.name-item.id-${Math.random()}`}
      className={styles['result-item']}
    >
      <h3>{item.name}</h3>
      <div className={styles['item-img']}>
        <Image
          src={`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`}
          alt={item.name}
          width={imageWidth}
          height={imageHeight}
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

  if (itemCounts === 0) {
    resultHeader = <h2>Nothing found</h2>;
  } else {
    resultHeader = <h2>Results ({total})</h2>;
  }

  const handleClickOnPrevButton = (): void => {
    urlSearchParams.set('limit', '3');
    urlSearchParams.set('page', String(page - 1));
    router.push(`?${urlSearchParams.toString()}`);
  };
  const handleClickOnNextButton = (): void => {
    urlSearchParams.set('limit', '3');
    urlSearchParams.set('page', String(page + 1));
    router.push(`?${urlSearchParams.toString()}`);
  };
  const handleItemCountChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    urlSearchParams.set('limit', event.target.value);
    urlSearchParams.set('page', '1');
    router.push(`?${urlSearchParams.toString()}`);
  };

  return (
    <div ref={myRef} className={styles['result-section']}>
      {resultHeader}
      <SelectInput
        onSelectChange={handleItemCountChange}
        options={itemsPerPage}
        value={String(limit)}
      />
      <div className={styles['result-container']}>{itemList}</div>
      <div className={styles['result-pagination']}>
        <Button name="Prev" onClick={handleClickOnPrevButton} disabled={page === 1} />
        {pagesnumberOfPages}
        <Button
          name="Next"
          onClick={handleClickOnNextButton}
          disabled={page === Math.ceil(total / limit) || itemCounts === 0}
        />
      </div>
    </div>
  );
}
