import { Item } from './resultSection';

export interface ApiResp {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Item[];
}
