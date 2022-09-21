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

export interface Stores {
  apiStore: ApiStore;
  pairsStore: PairsStore;
}

const rootStore = new RootStore();

const stores: Stores = {
  apiStore: rootStore.apiStore,
  pairsStore: rootStore.pairsStore,
};

export const StoreContext: Context<Stores> = createContext(stores);

export const StoreProvider: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => (
  <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
);
