import { PaginationRequest } from './PaginationRequest';

export interface PricePaginationRequest extends PaginationRequest {
  from: string;
  to: string;
}
