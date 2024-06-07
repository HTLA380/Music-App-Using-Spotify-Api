import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/providers/AuthSessionProvider';
import { getServerSession } from 'next-auth';
import RecoilContextProvider from '@/components/providers/recoilContextProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Api | Music App',
  description: 'Music App integrating with Spotify Api',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  console.log(session);

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
