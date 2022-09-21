import React, { lazy, Suspense, ExoticComponent } from 'react';
import { Navigate, RouteObject } from 'react-router';
import { Controls } from './containers/Controls';
import { SuspenseLoader } from './components/SuspenseLoader';

const Loader = (Component: ExoticComponent) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component />
  </Suspense>
);

const OraclePairsPage = Loader(
  lazy(() =>
    import('./pages/OraclePairs').then(({ OraclePairs }) => ({
      default: OraclePairs,
    })),
  ),
);

const PriceChartsPage = Loader(
  lazy(() =>
    import('./pages/PriceCharts').then(({ PriceCharts }) => ({
      default: PriceCharts,
    })),
  ),
);

export const routes: RouteObject[] = [
  {
    path: '',
    children: [
      {
        path: '/',
        element: <Navigate to="/oracle/pairs" replace />,
      },
    ],
  },
  {
    path: 'oracle',
    element: <Controls />,
    children: [
      {
        path: 'pairs',
        element: OraclePairsPage,
      },
      {
        path: 'prices',
        element: PriceChartsPage,
      },
    ],
  },
];
