import React from 'react';
import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { routes } from './Router';
import { ThemeProviderWrapper } from './theme/ThemeProvider';

export const App = () => {
  const content = useRoutes(routes);

  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      {content}
    </ThemeProviderWrapper>
  );
};
