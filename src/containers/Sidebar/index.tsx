import React, { useContext } from 'react';
import { Box, Drawer, styled, useTheme, darken, Divider } from '@mui/material';
import { SidebarContext } from '../../contexts/SidebarContext';
import { Menu } from './Menu';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    min-width: ${theme.sidebar.width};
    color: ${theme.colors.alpha.trueWhite[70]};
    position: relative;
    z-index: 7;
    height: 100%;
  `,
);

export const Sidebar = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: { xs: 'none', lg: 'inline-block' },
          position: 'fixed',
          left: 0,
          top: 0,
          background: darken(theme.colors.alpha.black[100], 0.5),
          boxShadow: 'none',
        }}
      >
        <Box height={theme.header.height} />
        <Divider
          sx={{
            mx: theme.spacing(2),
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Menu />
      </SidebarWrapper>
      <Drawer
        sx={{ boxShadow: `${theme.sidebar.boxShadow}` }}
        anchor="left"
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{ background: darken(theme.colors.alpha.black[100], 0.5) }}
        >
          <Box height={theme.header.height} />
          <Divider
            sx={{
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <Menu />
        </SidebarWrapper>
      </Drawer>
    </>
  );
};
