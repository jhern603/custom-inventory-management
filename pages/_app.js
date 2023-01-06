import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { Navbar } from '../components/Navbar';
import '../styles/imports.scss';

const clientSideEmotionCache = createEmotionCache();

function InventoryManager(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default InventoryManager;
