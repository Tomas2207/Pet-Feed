import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Pet Feed</title>
        <link rel="shortcut icon" href="/logo.ico" />
        <meta
          name="google-site-verification"
          content="TBgF1YU9x9RPg7gTmZxrdaQ6lhJrtIa0YZethFZ-AGc"
        />
      </Head>

      <SessionProvider session={session}>
        <Toaster position="bottom-left" reverseOrder={false} />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
