import React, {
  useState,
  FC,
  createContext,
  ReactNode,
  useCallback,
} from 'react';
import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { themeCreator } from './base';

export const ThemeContext = createContext((name: string): void => {
  localStorage.setItem('appTheme', name);
});

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [name, setName] = useState(curThemeName);
  const theme = themeCreator(name);

  const setThemeName = useCallback((themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    setName(themeName);
  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};
