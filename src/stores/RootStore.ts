import { ApiStore } from './ApiStore';
import { PairsStore } from './PairsStore';
import { PriceChartStore } from './PriceChartStore';

export class RootStore {
  public readonly apiStore: ApiStore;

  public readonly pairsStore: PairsStore;

  public readonly priceChartStore: PriceChartStore;

  constructor() {
    this.apiStore = new ApiStore(this);
    this.pairsStore = new PairsStore(this);
    this.priceChartStore = new PriceChartStore(this);
  }
}
