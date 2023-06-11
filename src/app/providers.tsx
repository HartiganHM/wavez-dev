// app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/react';

import apolloClient from 'lib/apollo';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </NextUIProvider>
  );
}
