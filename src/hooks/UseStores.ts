import { useContext } from 'react';
import { Stores, StoreContext } from '../contexts/StoresContext';

export const useStores = (): Stores => useContext(StoreContext);
