import { PaginationRequest } from './PaginationRequest';

export interface TwapPaginationRequest extends PaginationRequest {
  interval: number;
  from: string;
  to: string;
}
