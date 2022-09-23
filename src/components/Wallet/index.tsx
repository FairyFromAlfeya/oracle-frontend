import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/UseStores';
import { GetWalletButton } from '../GetWalletButton';
import { ConnectWalletButton } from '../ConnectWalletButton';
import { WalletMenu } from '../WalletMenu';

export const Wallet = observer(() => {
  const { everWalletStore } = useStores();

  return everWalletStore.isInitialized ? (
    <>
      <GetWalletButton />
      <ConnectWalletButton />
      <WalletMenu />
    </>
  ) : null;
});
