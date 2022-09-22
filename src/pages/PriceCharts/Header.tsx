import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/UseStores';
import { Pair } from '../../models/Pair';
import { Token } from '../../models/Token';

export const Header = observer(() => {
  const { priceChartStore, pairsStore } = useStores();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getToken = (pair: Pair, isRight: boolean): Token =>
    pair.tokens.find(
      (t) => t.id === (isRight ? pair.rightToken : pair.leftToken),
    )!;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ pb: 3 }}
    >
      <Typography variant="h3">Price</Typography>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
      >
        {priceChartStore.selectedPair ? (
          <>
            {priceChartStore.selectedPairLeftTokenSymbol}-
            {priceChartStore.selectedPairRightTokenSymbol}
          </>
        ) : (
          <CircularProgress color="info" size={24.5} />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {pairsStore.pairs.map((pair) => (
          <MenuItem
            key={pair.id}
            onClick={() => {
              handleClose();
              priceChartStore.setSelectedPair(pair);
            }}
          >
            {getToken(pair, false).symbol}-{getToken(pair, true).symbol}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
});
