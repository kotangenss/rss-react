import marvelLogo from 'public/img/marvelLogo.svg';
import spiderMan from 'public/img/spiderMan.png';
import Image from 'next/image';
import styles from './index.module.scss';
import SearchInput from '../searchInput';

export default function SearchSection(): JSX.Element {
  return (
    <div className={styles['search-section']}>
      <a
        className={styles['marvel-logo']}
        target="_blank"
        href="https://developer.marvel.com/"
        rel="noreferrer"
      >
        {' '}
        <Image src={marvelLogo.src} alt="marvel logo" width={109} height={40} />
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
        <SearchInput type="text" placeholder="Search..." />
        <div className={styles['main-img']}>
          <Image src={spiderMan.src} alt="spider man" width={400} height={805} />
        </div>
      </div>
    </div>
  );
}
