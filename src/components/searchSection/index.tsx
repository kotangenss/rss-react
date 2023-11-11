import styles from './searchSection.module.scss';
import marvelLogo from '../../assets/img/marvelLogo.svg';
import spiderMan from '../../assets/img/spiderMan.png';
import SearchInput from '../searchInput';
import { SearchSectionProps } from '../../interfaces/searchSection';

export default function SearchSection({ isExistItems }: SearchSectionProps): JSX.Element {
  return (
    <div className={styles['search-section']}>
      <a
        className={styles['marvel-logo']}
        target="_blank"
        href="https://developer.marvel.com/"
        rel="noreferrer"
      >
        {' '}
        <img src={marvelLogo} alt="marvel logo" />
      </a>
      <h1>
        <span>super</span>
        <span>heroes</span>
      </h1>
      <div className={styles['search-container']}>
        <div className={styles['search-description']}>
          <p>Welcome to the world&apos;s greatest comics API!</p>
          <p>
            Enter the name of any character in the Marvel universe (for example, <span>«Hulk»</span>{' '}
            or <span>«Spider-Man»</span>, or just the first character <span>«x»</span>,{' '}
            <span>«a»</span> ) and, if available, you will receive a description of the character, a
            complete list of comics and series in which this hero. Enjoy!
          </p>
        </div>
        <SearchInput type="text" placeholder="Search..." isExistItems={isExistItems} />
        <div className={styles['main-img']}>
          <img src={spiderMan} alt="spider man" />
        </div>
      </div>
    </div>
  );
}
