import { Item } from './resultSection';

export interface ButtonProps {
  name: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface SearchInputProps {
  type: string;
  placeholder: string;
  handleResult: (results: Item[]) => void;
}
