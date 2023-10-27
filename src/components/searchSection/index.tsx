import React from 'react';
import styles from './searchSection.module.scss';
import marvelLogo from '../../assets/img/marvelLogo.svg';
import spiderMan from '../../assets/img/spiderMan.png';
import SearchInput from '../searchInput';
import { SearchSectionProps } from '../../interfaces/searchSection';

export default class SearchSection extends React.Component<SearchSectionProps> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { handleResult, handleStartSearch } = this.props;

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
              Enter the name of any character in the Marvel universe (for example, «Hulk» or
              «Spider-Man») and, if available, you will receive a description of the character, a
              complete list of comics and series in which this hero appears. Enjoy!
            </p>
          </div>
          <SearchInput
            type="text"
            placeholder="Search..."
            handleResult={handleResult}
            handleStartSearch={handleStartSearch}
          />
          <div className={styles['main-img']}>
            <img src={spiderMan} alt="spider man" />
          </div>
        </div>
      </div>
    );
  }
}
