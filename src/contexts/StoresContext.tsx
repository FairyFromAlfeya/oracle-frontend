import React, {
  FC,
  createContext,
  ReactElement,
  ReactNode,
  Context,
} from 'react';
import { ApiStore } from '../stores/ApiStore';
import { RootStore } from '../stores/RootStore';
import { PairsStore } from '../stores/PairsStore';
import { PriceChartStore } from '../stores/PriceChartStore';
import { EverWalletStore } from '../stores/EverWalletStore';

export interface Stores {
  apiStore: ApiStore;
  pairsStore: PairsStore;
  priceChartStore: PriceChartStore;
  everWalletStore: EverWalletStore;
}

const rootStore = new RootStore();

const stores: Stores = {
  apiStore: rootStore.apiStore,
  pairsStore: rootStore.pairsStore,
  priceChartStore: rootStore.priceChartStore,
  everWalletStore: rootStore.everWalletStore,
};

export const StoreContext: Context<Stores> = createContext(stores);

export const StoreProvider: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => (
  <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
);
