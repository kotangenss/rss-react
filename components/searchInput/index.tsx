import { useState } from 'react';
import { SearchInputProps } from 'src/interfaces/searchInput';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Button from '../button';
import styles from './index.module.scss';

export default function SearchInput({ type, placeholder }: SearchInputProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());
  const [searchValue, setSearchValue] = useState(urlSearchParams.get('search') || '');

  const onClick = (): void => {
    urlSearchParams.set('search', searchValue);
    urlSearchParams.set('page', '1');
    urlSearchParams.set('limit', '3');
    router.push(`?${urlSearchParams.toString()}`);
  };

  return (
    <div className={styles['search-input']}>
      <input
        id="input"
        data-testid="input-search"
        type={type}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e): void => setSearchValue(e.target.value)}
      />
      <Button name="Search" testid="button-search" onClick={onClick} />
    </div>
  );
}
