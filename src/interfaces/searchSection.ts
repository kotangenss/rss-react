import { Item } from './resultSection';

export interface SearchSectionProps {
  handleResult: (results: Item[]) => void;
  handleStartSearch: () => void;
}
