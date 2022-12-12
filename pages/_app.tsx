import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Header } from '../components/Header.components';
import { Footer } from '../components/Footer.components';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { LoaderSpinner } from '../components/LoaderSpinner.components';
import { Open_Sans } from '@next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-openSans',
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isIndexPage = router.pathname === '/';

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Nudoodle - Share doodles with your friends!</title>
      </Head>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <main className={`${openSans.variable} font-openSans`}>
          <ThemeProvider enableSystem={true} attribute="class">
            <div className="min-h-screen min-w-screen flex flex-col">
              {!isIndexPage && <Header />}
              <main className="flex flex-col flex-grow">
                <Component {...pageProps} />
              </main>
              {!isIndexPage && (
                <div className="flex md:hidden">
                  <Footer />
                </div>
              )}
            </div>
          </ThemeProvider>
        </main>
      )}
    </>
  );
}
