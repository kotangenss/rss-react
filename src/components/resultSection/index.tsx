import React from 'react';
import styles from './resultsSection.module.scss';
import { Item } from '../../interfaces/resultSection';

interface Props {
  items: Item[];
}

export default class ResultSection extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { items } = this.props;

    console.log('result items', items);
    return (
      <div className={styles['result-section']}>
        <h2>Results</h2>
        <div className={styles['result-container']}>
          {items.map((item) => (
            <div key={item.name + item.id} className={styles['result-item']}>
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
                  <li key={`comics-${comicItem.name}-${item.id}`}>{comicItem.name}</li>
                ))}
              </ul>
              <ul className={styles['item-series']}>
                <h4>Series</h4>
                {item.series.items.map((seriesItem) => (
                  <li key={`series-${seriesItem.name}-${Math.random()}`}>{seriesItem.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
