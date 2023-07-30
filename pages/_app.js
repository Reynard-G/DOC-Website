import 'styles/globals.scss';

import React, { createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'Space Grotesk',
      'sans-serif',
    ].join(','),
  },
});

export const chartDropdownContext = createContext({
  chartDropdownOpen: false,
  setChartDropdownOpen: () => { },
});

const MyApp = ({ Component, pageProps }) => {
  const [chartDropdownOpen, setChartDropdownOpen] = React.useState(false);
  const chartDropdownState = { chartDropdownOpen, setChartDropdownOpen };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <chartDropdownContext.Provider value={chartDropdownState}>
        <Component {...pageProps} />
      </chartDropdownContext.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
