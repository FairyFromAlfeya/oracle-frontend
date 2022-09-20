import React from 'react';
import { RouteObject } from 'react-router';
import { Typography } from '@mui/material';
import { Controls } from './containers/Controls';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Controls />,
    children: [
      {
        path: '/',
        element: <Typography>FairyFromAlfeya</Typography>,
      },
    ],
  },
];
