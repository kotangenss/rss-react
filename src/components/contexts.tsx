import { createContext } from 'react';
import { Data } from '../interfaces/contexts';

export const Context = createContext<{
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}>({ data: { items: undefined, page: 1, limit: 3, total: 0 }, setData: (): void => {} });

export const IsLoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isLoading: false, setIsLoading: (): void => {} });

export const InputValueContext = createContext<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}>({ inputValue: '', setInputValue: (): void => {} });