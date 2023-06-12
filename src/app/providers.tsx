// app/providers.tsx
'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/react';

import apolloClient from 'lib/apollo';
import Nav from 'src/components/nav';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <NextUIProvider>
          <Nav />
          {children}
        </NextUIProvider>
      </ApolloProvider>
    </UserProvider>
  );
}
