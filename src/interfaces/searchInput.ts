import { Item } from './resultSection';

export interface SearchInputProps {
  type: string;
  placeholder: string;
  handleResult: (results: Item[]) => void;
  handleStartSearch: () => void;
  isExistItems: boolean;
}

export interface Result {
  data: {
    results: Item[];
  };
}
