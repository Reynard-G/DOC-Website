import 'styles/globals.scss';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#161616',
        },
      },
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <main className={spaceGrotesk.className}>
          <Component {...pageProps} />
        </main>
    </ThemeProvider>
  );
};

export default MyApp;
