import { Providers } from './providers';

import './globals.css';
import { Inter } from 'next/font/google';

import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Test Aufgabe',
  description: 'Test Aufgabe ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark bg-gradient-to-r from-sky-950 to-sky-800">
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
