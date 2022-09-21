import { ApiStore } from './ApiStore';
import { PairsStore } from './PairsStore';

export class RootStore {
  public readonly apiStore: ApiStore;

  public readonly pairsStore: PairsStore;

  constructor() {
    this.apiStore = new ApiStore(this);
    this.pairsStore = new PairsStore(this);
  }
}
