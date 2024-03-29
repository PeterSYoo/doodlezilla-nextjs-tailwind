import '../styles/globals.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Open_Sans } from '@next/font/google';
import { Footer } from '../components/Footer.components';
import { LoaderSpinner } from '../components/LoaderSpinner.components';
import { LoaderSpinnerLogin } from '../components/LoaderSpinnerLogin.components';
import { FeedRightBar } from '../components/feed/FeedRightBar.components';
import { HeaderCompressed } from '../components/HeaderCompressed.components';
import { Header } from '../components/Header.components';
import { CreateFooter } from '../components/create/CreateFooter.components';
import { ProfileRightBar } from '../components/profile/ProfileRightBar.components';
import { CanvasProvider } from '../contexts/CanvasContext';
import { LeftNavBar } from '../components/LeftNavBar.components';
import { LoaderSpinnerPage } from '../components/LoaderSpinnerPage.components';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-openSans',
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // States ------------------------------------------------------------- ***
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Constants ----------------------------------------------------------- ***
  const isLoginPage = router.asPath === '/';
  const isSignupPage = router.asPath === '/signup';
  const isProfilePage = router.asPath === '/profile';
  const isFeedPage = router.asPath === '/feed';
  const isCreatePage = router.asPath === '/create';
  const isUsernamePage = router.pathname === '/profile/[username]';

  // Effects ------------------------------------------------------------- ***
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

  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <Head>
        <title>Nudoodle - Share doodles with your friends!</title>
        <link rel="translate" href="/static/translate.png" as="image" />
      </Head>
      {loading ? (
        <>
          {isLoginPage || isSignupPage ? (
            <LoaderSpinnerLogin />
          ) : (
            <LoaderSpinnerPage />
          )}
        </>
      ) : (
        <div className={`${openSans.variable} font-openSans`}>
          <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                  <CanvasProvider>
                    <div className="min-w-screen flex min-h-screen flex-col dark:bg-shadeDark">
                      {isLoginPage || isSignupPage ? (
                        <div className="flex flex-grow flex-col">
                          <Component {...pageProps} />
                        </div>
                      ) : (
                        <div className="flex flex-grow flex-col dark:bg-shadeDark">
                          {isFeedPage || isProfilePage || isUsernamePage ? (
                            <HeaderCompressed />
                          ) : (
                            <Header />
                          )}
                          <LeftNavBar />
                          {isFeedPage ? <FeedRightBar /> : null}
                          {isProfilePage ? <ProfileRightBar /> : null}
                          <Component {...pageProps} />
                          {isCreatePage ? <CreateFooter /> : null}
                        </div>
                      )}
                      {isLoginPage || isSignupPage ? null : (
                        <div className="flex dark:bg-shadeDark md:hidden">
                          <Footer />
                        </div>
                      )}
                    </div>
                  </CanvasProvider>
                </ThemeProvider>
              </Hydrate>
            </QueryClientProvider>
          </SessionProvider>
        </div>
      )}
    </>
  );
}
