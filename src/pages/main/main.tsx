import React from 'react';
import SearchSection from '../../components/searchSection';
import styles from './main.module.scss';
import ResultSection from '../../components/resultSection';
import { Item } from '../../interfaces/resultSection';
import Button from '../../components/button';

export default class Main extends React.Component<
  object,
  { items: Item[]; hasError: boolean; isSearchStart: boolean }
> {
  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
      hasError: false,
      isSearchStart: false,
    };
    this.handleResultInput = this.handleResultInput.bind(this);
    this.handleStartSearch = this.handleStartSearch.bind(this);
  }

  handleResultInput(items: Item[]): void {
    this.setState({ items, isSearchStart: false });
  }

  handleStartSearch(): void {
    this.setState({ isSearchStart: true });
  }

  handleButtonClick = (): void => {
    this.setState({ hasError: true });
  };

  render(): JSX.Element {
    const { items, hasError, isSearchStart } = this.state;

    if (hasError) {
      throw new Error('Throw an error after clicking a button');
    }

    return (
      <div className={styles.container}>
        <Button
          className="simulate-button"
          name="Simulate Error"
          onClick={this.handleButtonClick}
        />
        <SearchSection
          handleResult={this.handleResultInput}
          handleStartSearch={this.handleStartSearch}
        />
        <ResultSection items={items} isSearchStart={isSearchStart} />
      </div>
    );
  }
}