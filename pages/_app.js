import 'styles/globals.scss';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
      >
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default MyApp;