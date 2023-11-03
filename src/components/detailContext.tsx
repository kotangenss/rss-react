import { createContext } from 'react';
import { Item } from '../interfaces/resultSection';

export const DetailContext = createContext<Item | null>(null);
