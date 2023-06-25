import 'styles/globals.scss';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import ChartDropdownContext from 'pages/context';

React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, pageProps }) => {
  const [chartDropdownOpen, setChartDropdownOpen] = React.useState(false);
  const chartDropdownState = { chartDropdownOpen, setChartDropdownOpen };

  return (
    <NextUIProvider>
      <NextThemesProvider
        forcedTheme="dark"
        attribute="class"
      >
        <ChartDropdownContext.Provider value={chartDropdownState}>
          <Component {...pageProps} />
        </ChartDropdownContext.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default MyApp;
