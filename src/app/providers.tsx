'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';

import apolloClient from 'lib/apollo';
import Nav from 'src/components/nav';
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <NextUIProvider>
          <ToastContainer position="top-right" />
          <Nav />
          {children}
        </NextUIProvider>
      </ApolloProvider>
    </UserProvider>
  );
}
