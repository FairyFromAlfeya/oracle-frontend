import React from 'react';
import { Button, Link } from '@mui/material';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/UseStores';

export const GetWalletButton = observer(() => {
  const { everWalletStore } = useStores();

  return everWalletStore.hasExtension ? null : (
    <Button
      component={Link}
      href={process.env.REACT_APP_EVER_WALLET_URL}
      endIcon={<LinkTwoToneIcon />}
      target="_blank"
    >
      Get EVER Wallet
    </Button>
  );
});
