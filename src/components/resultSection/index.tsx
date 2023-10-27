import React from 'react';
import styles from './resultsSection.module.scss';
import Button from '../button';
import { ResultSectionProps, ResultSectionState } from '../../interfaces/resultSection';

export default class ResultSection extends React.Component<ResultSectionProps, ResultSectionState> {
  constructor(props: ResultSectionProps) {
    super(props);
    const { items, isSearchStart } = this.props;
    this.state = {
      currentPage: 0,
      items,
      myRef: React.createRef(),
      isLoading: isSearchStart,
    };
  }

  componentDidMount(): void {
    this.scrollToHead();
  }

  componentDidUpdate(prevProps: ResultSectionProps): void {
    const { items, isSearchStart } = this.props;

    if (prevProps.isSearchStart !== isSearchStart) {
      this.setState({
        currentPage: 0,
        isLoading: isSearchStart,
      });
      this.scrollToHead();
    }

    if (prevProps.items !== items) {
      this.setState({
        currentPage: 0,
        items,
        isLoading: isSearchStart,
      });
      this.scrollToHead();
    }
  }

  goToNextPage = (): void => {
    this.scrollToHead();
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  goToPrevPage = (): void => {
    this.scrollToHead();
    this.setState((prevState) => ({
      currentPage: Math.max(prevState.currentPage - 1, 0),
    }));
  };

  scrollToHead = (): void => {
    const { myRef } = this.state;
    myRef.current?.scrollIntoView();
  };

  render(): JSX.Element {
    const { currentPage, myRef, isLoading } = this.state;
    const { items } = this.state;
    const itemsPerPage = 3;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = items.slice(startIndex, endIndex);

    return (
      <div ref={myRef} className={styles['result-section']}>
        {items.length === 0 ? <h2>Nothing found</h2> : <h2>Results ({items.length})</h2>}
        <div className={styles['result-container']}>
          {isLoading ? (
            <div className={styles['loading-container']}>
              <div className={styles['loading-icon']} />
              <p>Loading</p>
            </div>
          ) : (
            displayedItems.map((item) => (
              <div key={`item.name-item.id-${Math.random()}`} className={styles['result-item']}>
                <h3>{item.name}</h3>
                <div className={styles['item-img']}>
                  <img
                    src={`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`}
                    alt="hero"
                  />
                </div>
                <h4 id={styles['description-title']}>Description</h4>
                <p className={styles['item-description']}>{item.description}</p>
                <ul className={styles['item-comics']}>
                  <h4>Comics</h4>
                  {item.comics.items.map((comicItem) => (
                    <li key={`comics-${comicItem.name}-${item.id}-${Math.random()}`}>
                      {comicItem.name}
                    </li>
                  ))}
                </ul>
                <ul className={styles['item-series']}>
                  <h4>Series</h4>
                  {item.series.items.map((seriesItem) => (
                    <li key={`series-${seriesItem.name}-${Math.random()}`}>{seriesItem.name}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
        <div className={styles['result-pagination']}>
          {isLoading ? (
            <p />
          ) : (
            <>
              <Button name="Prev" onClick={this.goToPrevPage} disabled={currentPage === 0} />
              {items.length === 0 ? (
                <p>No pages</p>
              ) : (
                <p>
                  Page&nbsp;{currentPage + 1}&nbsp;of&nbsp;{Math.ceil(items.length / itemsPerPage)}
                </p>
              )}
              <Button
                name="Next"
                onClick={this.goToNextPage}
                disabled={endIndex >= items.length || items.length === 0}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
