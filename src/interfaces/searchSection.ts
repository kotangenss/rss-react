import { Item } from './resultSection';

export interface ButtonProps {
  name: string;
  onClick?: () => void;
}

export interface SearchInputProps {
  type: string;
  placeholder: string;
  handleResult: (results: Item[]) => void;
}
