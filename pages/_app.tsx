import { ApolloProvider } from '@apollo/client';
import { NextUIProvider, createTheme } from '@nextui-org/react';

import apolloClient from '../lib/apollo';

import Layout from '../components/Layout';

import type { AppProps } from 'next/app';

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {}
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </NextUIProvider>
  );
}

export default MyApp;
