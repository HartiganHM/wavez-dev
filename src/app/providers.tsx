// app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/react';

import apolloClient from 'lib/apollo';
import Nav from 'src/components/nav';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ApolloProvider client={apolloClient}>
        <Nav />
        {children}
      </ApolloProvider>
    </NextUIProvider>
  );
}
