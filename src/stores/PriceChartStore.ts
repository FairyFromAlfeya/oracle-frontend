import { makeAutoObservable, reaction, when } from 'mobx';
import debounce from 'lodash.debounce';
import { RootStore } from './RootStore';
import { Pair } from '../models/Pair';
import { Price } from '../models/Price';
import { Twap } from '../models/Twap';

type TwapIntervals = 300 | 600 | 900 | 1800 | null;

const THIRTY_MINUTES = 30 * 60 * 1000;

export class PriceChartStore {
  private _selectedPair: Pair | null = null;

  private _twapInterval: TwapIntervals = 1800;

  private _minTimestamp: number | null = null;

  private _maxTimestamp: number | null = null;

  private _range: number[] = [0, 0];

  private _prices: Price[] = [];

  private _twaps: Twap[] = [];

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);

    when(
      () => rootStore.pairsStore.isInitialized,
      () => this.setSelectedPair(this.rootStore.pairsStore.pairs[0]),
    );

    reaction(
      () =>
        [
          this.range,
          this.twapInterval,
          this.selectedPair,
          this.minTimestamp,
          this.maxTimestamp,
        ] as [
          number[],
          TwapIntervals,
          Pair | null,
          number | null,
          number | null,
        ],
      debounce(
        ([range, interval, pair, min, max]: [
          number[],
          TwapIntervals,
          Pair | null,
          number | null,
          number | null,
        ]) => this._requestPricesAndTwaps(pair, range, interval, min, max),
        1000,
      ),
    );
  }

  get selectedPair(): Pair | null {
    return this._selectedPair;
  }

  get selectedPairLeftTokenSymbol(): string | undefined {
    return this._selectedPair?.tokens.find(
      (token) => token.id === this._selectedPair?.leftToken,
    )?.symbol;
  }

  get selectedPairRightTokenSymbol(): string | undefined {
    return this._selectedPair?.tokens.find(
      (token) => token.id === this._selectedPair?.rightToken,
    )?.symbol;
  }

  get twapInterval(): TwapIntervals {
    return this._twapInterval;
  }

  get minTimestamp(): number | null {
    return this._minTimestamp;
  }

  get maxTimestamp(): number | null {
    return this._maxTimestamp;
  }

  get range(): number[] {
    return this._range;
  }

  get pricesSeries(): [number, number][] {
    return this._prices.map<[number, number]>((price) => [
      new Date(price.createdAt).getTime(),
      price.price0To1,
    ]);
  }

  get twapsSeries(): [number, number][] {
    return this._twapInterval
      ? this._twaps.map<[number, number]>((twap) => [
          new Date(twap.createdAt).getTime(),
          twap.price0To1,
        ])
      : [];
  }

  setSelectedPair = (pair: Pair | null): void => {
    this._reset();
    this._selectedPair = pair;

    if (pair) {
      this._requestMinTimestamp(pair.id).catch((e) =>
        console.log('Fail to get min timestamp', e),
      );

      this._requestMaxTimestamp(pair.id).catch((e) =>
        console.log('Fail to get max timestamp', e),
      );
    }
  };

  setTwapInterval = (interval: TwapIntervals): void => {
    this._twapInterval = interval;
  };

  setRange = (range: number[], activeThumb: number): void => {
    if (this._minTimestamp && this._maxTimestamp) {
      if (range[1] - range[0] < THIRTY_MINUTES) {
        if (activeThumb === 0) {
          const clamped = Math.min(
            range[0],
            this._maxTimestamp - THIRTY_MINUTES,
          );
          this._range = [clamped, clamped + THIRTY_MINUTES];
        } else {
          const clamped = Math.max(
            range[1],
            this._minTimestamp + THIRTY_MINUTES,
          );
          this._range = [clamped - THIRTY_MINUTES, clamped];
        }
      } else {
        this._range = range;
      }
    }
  };

  private _reset = (): void => {
    this._minTimestamp = null;
    this._maxTimestamp = null;
    this._range = [0, 0];
    this._prices = [];
    this._twaps = [];
  };

  private _requestMinTimestamp = (id: string): Promise<void> =>
    this.rootStore.apiStore
      .getMinTimestamp(id)
      .then((timestamp) => this._setMinTimestamp(timestamp));

  private _requestMaxTimestamp = (id: string): Promise<void> =>
    this.rootStore.apiStore
      .getMaxTimestamp(id)
      .then((timestamp) => this._setMaxTimestamp(timestamp));

  private _setMinTimestamp = (timestamp: number): void => {
    this._minTimestamp = timestamp;

    if (this._maxTimestamp) {
      this._setMaxTimestamp(this._maxTimestamp);
    }
  };

  private _setMaxTimestamp = (timestamp: number): void => {
    this._maxTimestamp = timestamp;

    const minRange = Math.max(
      timestamp - THIRTY_MINUTES,
      this._minTimestamp || timestamp,
    );

    this._range = [minRange, timestamp];
  };

  private _setPrices = (prices: Price[]): void => {
    this._prices = prices;
  };

  private _setTwaps = (twaps: Twap[]): void => {
    this._twaps = twaps;
  };

  private _requestPricesAndTwaps = (
    pair: Pair | null,
    range: number[],
    interval: TwapIntervals,
    minTimestamp: number | null,
    maxTimestamp: number | null,
  ): void => {
    if (!!pair && !!minTimestamp && !!maxTimestamp) {
      this.rootStore.apiStore
        .listPrices(
          pair.id,
          new Date(range[0]).toISOString(),
          new Date(range[1]).toISOString(),
          0,
          10_000,
        )
        .then((response) => this._setPrices(response[0]));

      if (interval) {
        this.rootStore.apiStore
          .listTwaps(
            pair.id,
            new Date(range[0]).toISOString(),
            new Date(range[1]).toISOString(),
            interval,
            0,
            10_000,
          )
          .then((response) => this._setTwaps(response[0]));
      }
    }
  };
}
