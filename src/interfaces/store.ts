import { Item } from './resultSection';

export interface Data {
  page: number;
  limit: number;
  total: number;
  items?: Item[];
}
