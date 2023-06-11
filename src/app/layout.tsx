import { Metadata } from 'next';

import { Providers } from './providers';
import 'styles/globals.css';

export const metadata: Metadata = {
  title: 'Wavez Dev',
  description: 'All the vibes',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
