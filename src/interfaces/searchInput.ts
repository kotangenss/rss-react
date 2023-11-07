import { Item } from './resultSection';

export interface SearchInputProps {
  type: string;
  placeholder: string;
  isExistItems: boolean;
}

export interface Result {
  data: {
    results: Item[];
    total: number;
  };
}
