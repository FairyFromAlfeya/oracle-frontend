import React, { FC, ReactNode } from 'react';
import { Box, alpha, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';

interface SidebarLayoutProps {
  children?: ReactNode;
}

export const Controls: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        '.MuiPageTitle-wrapper': {
          background: theme.colors.alpha.white[50],
          marginBottom: `${theme.spacing(4)}`,
          boxShadow: `0px 2px 4px -3px ${alpha(
            theme.colors.alpha.black[100],
            0.1,
          )}, 0px 5px 12px -4px ${alpha(theme.colors.alpha.black[100], 0.05)}`,
        },
      }}
    >
      <Header />
      <Sidebar />
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          display: 'block',
          flex: 1,
          pt: `${theme.header.height}`,
          [theme.breakpoints.up('lg')]: {
            ml: `${theme.sidebar.width}`,
          },
        }}
      >
        <Box display="block">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
