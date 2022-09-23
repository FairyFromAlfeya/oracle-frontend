import React from 'react';
import { observer } from 'mobx-react-lite';
import SensorsTwoToneIcon from '@mui/icons-material/SensorsTwoTone';
import { Button } from '@mui/material';
import { useStores } from '../../hooks/UseStores';

export const ConnectWalletButton = observer(() => {
  const { everWalletStore } = useStores();

  return everWalletStore.hasExtension && !everWalletStore.address ? (
    <Button
      endIcon={<SensorsTwoToneIcon />}
      onClick={() => everWalletStore.connect()}
    >
      Connect Wallet
    </Button>
  ) : null;
});
