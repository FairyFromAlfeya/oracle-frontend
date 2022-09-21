import React from 'react';
import { Container, Grid } from '@mui/material';
import { Chart } from './Chart';
import { Controls } from './Controls';
import { Header } from './Header';

export const Dashboard = () => (
  <Container maxWidth="lg" sx={{ mt: 3 }}>
    <Grid item xs={12} pb={2}>
      <Header />
      <Chart />
      <Controls />
    </Grid>
  </Container>
);
