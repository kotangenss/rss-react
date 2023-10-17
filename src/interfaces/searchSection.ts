import { Item } from './resultSection';

export interface ButtonProps {
  name: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface SearchInputProps {
  type: string;
  placeholder: string;
  handleResult: (results: Item[]) => void;
}
