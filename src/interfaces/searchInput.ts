import { Item } from './resultSection';

export interface SearchInputProps {
  type: string;
  placeholder: string;
}

export interface Result {
  data: {
    results: Item[];
    total: number;
  };
}
