import { createContext } from 'react';
import { Item } from '../interfaces/resultSection';

export const Context = createContext<{
  items: Item[] | undefined;
  setItems: React.Dispatch<React.SetStateAction<Item[] | undefined>>;
}>({ items: undefined, setItems: (): void => {} });

export const IsLoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isLoading: false, setIsLoading: (): void => {} });

export const InputValueContext = createContext<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}>({ inputValue: '', setInputValue: (): void => {} });
