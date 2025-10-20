import React from 'react';
import './globals.css'
import ClientProvider from '@/components/ClientProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider> {children} </ClientProvider>
      </body>
    </html>
  );
}
