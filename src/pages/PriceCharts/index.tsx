import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Dashboard } from './Dashboard';

export const PriceCharts = () => {
  return (
    <>
      <Helmet>
        <title>Price Charts</title>
      </Helmet>
      <Dashboard />
    </>
  );
};
