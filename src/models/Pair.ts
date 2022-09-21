import { Token } from './Token';

export interface Pair {
  id: string;
  address: string;
  leftToken: string;
  rightToken: string;
  scale: number;
  createdAt: string;
  updatedAt: string;
  tokens: Token[];
}
