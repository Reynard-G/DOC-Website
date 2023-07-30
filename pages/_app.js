import 'styles/globals.scss';

import React, { createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Analytics } from '@vercel/analytics/react';

import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      spaceGrotesk.style.fontFamily,
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
        <main className={spaceGrotesk.className}>
          <Component {...pageProps} />
          <Analytics />
        </main>
      </chartDropdownContext.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
