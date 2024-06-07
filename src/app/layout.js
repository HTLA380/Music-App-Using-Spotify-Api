import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/providers/AuthSessionProvider';
import RecoilContextProvider from '@/components/providers/recoilContextProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';

const inter = Inter({ subsets: ['latin'] });

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
