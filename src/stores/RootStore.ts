import { ApiStore } from './ApiStore';
import { PairsStore } from './PairsStore';
import { PriceChartStore } from './PriceChartStore';
import { EverWalletStore } from './EverWalletStore';

export class RootStore {
  public readonly apiStore: ApiStore;

  public readonly pairsStore: PairsStore;

  public readonly priceChartStore: PriceChartStore;

  public readonly everWalletStore: EverWalletStore;

  constructor() {
    this.apiStore = new ApiStore(this);
    this.pairsStore = new PairsStore(this);
    this.priceChartStore = new PriceChartStore(this);
    this.everWalletStore = new EverWalletStore(this);
  }
}
