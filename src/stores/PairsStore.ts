import { makeAutoObservable } from 'mobx';
import { RootStore } from './RootStore';
import { Pair } from '../models/Pair';
import { ListPairsResponse } from '../dto/ListPairsResponse';

export class PairsStore {
  private _pairs: Pair[] = [];

  private _total = 0;

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);

    this._loadAllPairs().catch((e) =>
      console.log('Fail to load all pairs:', e),
    );
  }

  get pairs(): Pair[] {
    return this._pairs;
  }

  get total(): number {
    return this._total;
  }

  pushPair = (pair: Pair): void => {
    this._setPairsAndTotal([[...this._pairs, pair], this._total + 1]);
  };

  removePair = (pair: Pair): void => {
    this._setPairsAndTotal([
      this._pairs.filter((p) => p.id !== pair.id),
      this._total - 1,
    ]);
  };

  private _setPairs = (pairs: Pair[]): void => {
    this._pairs = pairs;
  };

  private _setTotal = (total: number): void => {
    this._total = total;
  };

  private _setPairsAndTotal = (response: ListPairsResponse): void => {
    this._setPairs(response[0]);
    this._setTotal(response[1]);
  };

  private _loadAllPairs = (): Promise<void> =>
    this.rootStore.apiStore
      .listPairs(0, 10_000)
      .then((response) => this._setPairsAndTotal(response));
}
