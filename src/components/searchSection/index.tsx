import React from 'react';
import styles from './searchSection.module.scss';
import marvelLogo from '../../assets/img/marvelLogo.svg';
import spiderMan from '../../assets/img/spiderMan.png';
import SearchInput from '../searchInput';

export default class SearchSection extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
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
              The Marvel Comics API is a tool to help developers everywhere create amazing, uncanny
              and incredible web sites and applications using data from the 70-plus years of the
              Marvel age of comics.
            </p>
          </div>
          <SearchInput type="text" placeholder="Search for characters, comics, events, etc." />
          <div className={styles['main-img']}>
            <img src={spiderMan} alt="spider man" />
          </div>
        </div>
      </div>
    );
  }
}
