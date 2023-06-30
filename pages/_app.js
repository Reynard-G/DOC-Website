import 'styles/globals.scss';

import React, { createContext } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

React.useLayoutEffect = React.useEffect;

export const chartDropdownContext = createContext({
  chartDropdownOpen: false,
  setChartDropdownOpen: () => { },
});

const MyApp = ({ Component, pageProps }) => {
  const [chartDropdownOpen, setChartDropdownOpen] = React.useState(false);
  const chartDropdownState = { chartDropdownOpen, setChartDropdownOpen };

  return (
    <NextUIProvider>
      <NextThemesProvider
        forcedTheme="dark"
        attribute="class"
      >
        <chartDropdownContext.Provider value={chartDropdownState}>
          <Component {...pageProps} />
        </chartDropdownContext.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default MyApp;
