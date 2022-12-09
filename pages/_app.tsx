import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Header } from '../components/Header.components';
import { Footer } from '../components/Footer.components';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import { LoaderSpinner } from '../components/LoaderSpinner.components';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

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
        <title>Doodlezilla</title>
      </Head>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <ThemeProvider enableSystem={true} attribute="class">
          <div className="min-h-screen min-w-screen flex flex-col">
            <Header />
            <main className="flex flex-col flex-grow">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
