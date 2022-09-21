import axios, { Axios, AxiosResponse } from 'axios';
import { RootStore } from './RootStore';
import { ListPairsResponse } from '../dto/ListPairsResponse';
import { PaginationRequest } from '../dto/PaginationRequest';
import { RemovePairRequest } from '../dto/RemovePairRequest';
import { CreatePairRequest } from '../dto/CreatePairRequest';
import { Pair } from '../models/Pair';

export class ApiStore {
  private readonly client: Axios;

  constructor(private readonly rootStore: RootStore) {
    this.client = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
  }

  listPairs = (
    page = 0,
    size = 0,
    sortBy = 'createdAt',
    sortDirection: 'ASC' | 'DESC' = 'DESC',
  ): Promise<ListPairsResponse> =>
    this.client
      .get<
        ListPairsResponse,
        AxiosResponse<ListPairsResponse>,
        PaginationRequest
      >('pairs', {
        params: { page, size, sortBy, sortDirection },
      })
      .then((response) => response.data);

  removePair = (id: string): Promise<Pair> =>
    this.client
      .delete<Pair, AxiosResponse<Pair>, RemovePairRequest>('pairs', {
        data: { id },
      })
      .then((response) => response.data);

  createPair = (address: string): Promise<Pair> =>
    this.client
      .post<Pair, AxiosResponse<Pair>, CreatePairRequest>('pairs', { address })
      .then((response) => response.data);
}
