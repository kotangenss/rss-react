import React from 'react';
import SearchSection from '../../components/searchSection';
import styles from './main.module.scss';
import ResultSection from '../../components/resultSection';
import { Item } from '../../interfaces/resultSection';

export default class Main extends React.Component<object, { items: Item[] }> {
  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
    };
    this.handleResultInput = this.handleResultInput.bind(this);
  }

  handleResultInput(items: Item[]): void {
    this.setState({ items });
  }

  render(): JSX.Element {
    const { items } = this.state;

    return (
      <div className={styles.container}>
        <SearchSection handleResult={this.handleResultInput} />
        <ResultSection items={items} />
      </div>
    );
  }
}
