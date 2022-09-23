import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import WalletTwoToneIcon from '@mui/icons-material/WalletTwoTone';
import SensorsOffTwoToneIcon from '@mui/icons-material/SensorsOffTwoTone';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/UseStores';

export const WalletMenu = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { everWalletStore } = useStores();
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    handleClose();
    everWalletStore.disconnect();
  };

  return everWalletStore.address ? (
    <Box display="flex" alignItems="center" minWidth={0}>
      <IconButton
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          bgcolor: theme.colors.primary.main,
          ':hover': { bgcolor: theme.colors.primary.light },
        }}
      >
        <WalletTwoToneIcon sx={{ color: theme.palette.common.white }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMenuItemClick}>
          <Typography mr={1} fontWeight="bold" color={theme.colors.error.main}>
            DISCONNECT
          </Typography>
          <SensorsOffTwoToneIcon sx={{ color: theme.colors.error.main }} />
        </MenuItem>
      </Menu>
      <Box mx={2} minWidth={0}>
        <Typography fontWeight="bold" color="text.primary" noWrap>
          {everWalletStore.address}
        </Typography>
        <Typography noWrap>{everWalletStore.balance} EVER</Typography>
      </Box>
    </Box>
  ) : null;
});
