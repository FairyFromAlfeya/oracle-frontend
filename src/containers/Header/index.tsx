import React, { useContext } from 'react';
import {
  Box,
  alpha,
  IconButton,
  Tooltip,
  styled,
  useTheme,
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { SidebarContext } from '../../contexts/SidebarContext';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
    height: ${theme.header.height};
    color: ${theme.header.textColor};
    padding: ${theme.spacing(0, 2)};
    right: 0;
    z-index: 6;
    background-color: ${alpha(theme.header.background!.toString(), 0.95)};
    backdrop-filter: blur(3px);
    position: fixed;
    justify-content: flex-end;
    width: 100%;
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      left: ${theme.sidebar.width};
      width: auto;
    }
  `,
);

export const Header = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow: `0px 2px 8px -3px ${alpha(
          theme.colors.alpha.black[100],
          0.2,
        )}, 0px 5px 22px -4px ${alpha(theme.colors.alpha.black[100], 0.1)}`,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' },
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
};
