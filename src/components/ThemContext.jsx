
import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Define MUI theme configuration for light and dark modes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode palette
                primary: {
                  main: '#1976d2',
                },
                background: {
                  default: '#f4f4f4',
                  paper: '#ffffff',
                },
              }
            : {
                // Dark mode palette
                primary: {
                  main: '#90caf9',
                },
                background: {
                  default: '#121212',
                  paper: '#1c1c1c',
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using the ThemeContext
export const useThemeContext = () => useContext(ThemeContext);