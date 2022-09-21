import React, { FC, useState } from 'react';
import { Typography, Button, Grid, TextField } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface PageHeaderProps {
  onCreate: (address: string) => void;
}

export const PageHeader: FC<PageHeaderProps> = ({ onCreate }) => {
  const [address, setAddress] = useState('');

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4} zeroMinWidth>
        <Typography variant="h3" component="h3">
          Indexed Pairs
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} zeroMinWidth>
        <TextField
          required
          label="Address"
          variant="outlined"
          size="small"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={2} zeroMinWidth>
        <Button
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => onCreate(address)}
          fullWidth
        >
          Add pair
        </Button>
      </Grid>
    </Grid>
  );
};
