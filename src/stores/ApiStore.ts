import axios, { Axios, AxiosResponse } from 'axios';
import { RootStore } from './RootStore';
import { ListPairsResponse } from '../dto/ListPairsResponse';
import { PaginationRequest } from '../dto/PaginationRequest';
import { RemovePairRequest } from '../dto/RemovePairRequest';
import { CreatePairRequest } from '../dto/CreatePairRequest';
import { ListTwapsResponse } from '../dto/ListTwapsResponse';
import { TwapPaginationRequest } from '../dto/TwapPaginationRequest';
import { ListPricesResponse } from '../dto/ListPricesResponse';
import { PricePaginationRequest } from '../dto/PricePaginationRequest';
import { Pair } from '../models/Pair';

export class ApiStore {
  private readonly client: Axios;

  constructor(private readonly rootStore: RootStore) {
    this.client = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
  }

  listPairs = (
    page = 0,
    size = 10,
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

  listTwaps = (
    id: string,
    from: string,
    to: string,
    interval = 300,
    page = 0,
    size = 10,
    sortBy = 'createdAt',
    sortDirection: 'ASC' | 'DESC' = 'DESC',
  ): Promise<ListTwapsResponse> =>
    this.client
      .get<
        ListTwapsResponse,
        AxiosResponse<ListTwapsResponse>,
        TwapPaginationRequest
      >(`twaps/${id}`, {
        params: { page, size, sortBy, sortDirection, interval, from, to },
      })
      .then((response) => response.data);

  listPrices = (
    id: string,
    from: string,
    to: string,
    page = 0,
    size = 10,
    sortBy = 'createdAt',
    sortDirection: 'ASC' | 'DESC' = 'DESC',
  ): Promise<ListPricesResponse> =>
    this.client
      .get<
        ListPricesResponse,
        AxiosResponse<ListPricesResponse>,
        PricePaginationRequest
      >(`prices/${id}`, {
        params: { page, size, sortBy, sortDirection, from, to },
      })
      .then((response) => response.data);

  getMinTimestamp = (id: string): Promise<number> =>
    this.listPrices(
      id,
      new Date(0).toISOString(),
      new Date().toISOString(),
      0,
      1,
      'createdAt',
      'ASC',
    ).then((response) =>
      response[0].length > 0
        ? new Date(response[0][0].createdAt).getTime()
        : Date.now(),
    );

  getMaxTimestamp = (id: string): Promise<number> =>
    this.listPrices(
      id,
      new Date(0).toISOString(),
      new Date().toISOString(),
      0,
      1,
    ).then((response) =>
      response[0].length > 0
        ? new Date(response[0][0].createdAt).getTime()
        : Date.now(),
    );
}
