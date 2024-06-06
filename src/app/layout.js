import { Inter } from 'next/font/google';
import './globals.css';
import AuthSessionProvider from '@/components/providers/AuthSessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Api | Music App',
  description: 'Music App integrating with Spotify Api',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthSessionProvider>
          <div className='h-screen overflow-hidden bg-black'>{children}</div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
