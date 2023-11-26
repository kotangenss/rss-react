import { GeneralItem } from 'src/interfaces/resultSection';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ApiResp } from 'src/interfaces/api';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Button from '../button';

function getListItems(
  defaultValue: string,
  itemId?: number,
  items?: GeneralItem[]
): string | JSX.Element[] {
  if (items && items.length > 0) {
    return items.map((item: GeneralItem) => (
      <li key={`comics-${item.name}-${itemId}-${Math.random()}`}>{item.name}</li>
    ));
  }

  return defaultValue;
}

export default function Details({ detailData }: { detailData: ApiResp | null }): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const item = detailData?.results ? detailData?.results[0] : undefined;
  const comicsList = getListItems('No comics', item?.id, item?.comics.items);
  const seriesList = getListItems('No series', item?.id, item?.series.items);

  const handleCloseClick = (): void => {
    urlSearchParams.delete('details');
    router.push(`?${urlSearchParams.toString()}`);
  };

  if (!item) return <span />;

  return (
    <div className={styles.container}>
      <div>
        <h2>Details</h2>
        <h3>
          {item.name} <span data-testid={`detailes-id-${item.id}`}>({item.id})</span>
        </h3>
        <p>{item.description}</p>
        <Image
          src={`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`}
          alt={item.name}
          width={300}
          height={450}
        />
        <ul className={styles['item-comics']}>
          <h4>Comics</h4>
          {comicsList}
        </ul>
        <ul className={styles['item-series']}>
          <h4>Series</h4>
          {seriesList}
        </ul>
        <Button className={styles['close-details']} name="x" onClick={handleCloseClick} />
      </div>
    </div>
  );
}
