import { Item } from './resultSection';

export interface Data {
  items: Item[] | undefined;
  page: number;
  limit: number;
  total: number;
}
