import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';

import SessionProvider from '@/components/providers/AuthSessionProvider';
import RecoilContextProvider from '@/components/providers/recoilContextProvider';
import { authOptions } from './api/auth/[...nextauth]/options';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// ====================================================

export const metadata = {
  title: 'Spotify Api | Music App',
  description: 'Music App integrating with Spotify Api',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <RecoilContextProvider>
            <div className='h-screen overflow-hidden bg-black'>{children}</div>
          </RecoilContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
