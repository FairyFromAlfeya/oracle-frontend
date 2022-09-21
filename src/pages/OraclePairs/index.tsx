import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PairsTable } from './PairsTable';

export const OraclePairs = () => {
  return (
    <>
      <Helmet>
        <title>Oracle Pairs</title>
      </Helmet>
      <PairsTable />
    </>
  );
};
