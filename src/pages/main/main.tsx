import React from 'react';
import SearchSection from '../../components/searchSection';
import styles from './main.module.scss';

export default class Main extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    return (
      <div className={styles.container}>
        <SearchSection />
      </div>
    );
  }
}
