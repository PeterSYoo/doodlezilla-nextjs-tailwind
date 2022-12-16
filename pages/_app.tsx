import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Open_Sans } from '@next/font/google';
import { Footer } from '../components/Footer.components';
import { LoaderSpinner } from '../components/LoaderSpinner.components';
import { LoaderSpinnerLogin } from '../components/LoaderSpinnerLogin.components';
import { NavBar } from '../components/NavBar.components';
import { FeedRightBar } from '../components/feed/FeedRightBar.components';
import { HeaderCompressed } from '../components/HeaderCompressed.components';
import { Header } from '../components/Header.components';
import { CreateFooter } from '../components/create/CreateFooter.components';
import { ProfileRightBar } from '../components/profile/ProfileRightBar.components';
import { ProfileOtherUsersRightBar } from '../components/profile/ProfileOtherUsersRightBar.components';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-openSans',
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /* Grabs URL Pathname */
  const isLoginPage = router.asPath === '/';
  const isSignupPage = router.asPath === '/signup';
  const isProfilePage = router.asPath === '/profile';
  const isFeedPage = router.asPath === '/feed';
  const isCreatePage = router.asPath === '/create';
  const isUsernamePage = router.pathname === '/profile/[username]';
  /*  */

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
        <>
          {isLoginPage || isSignupPage ? (
            <LoaderSpinnerLogin />
          ) : (
            <LoaderSpinner />
          )}
        </>
      ) : (
        <div className={`${openSans.variable} font-openSans`}>
          <ThemeProvider enableSystem={true} attribute="class">
            <div className="min-h-screen min-w-screen flex flex-col">
              {isLoginPage || isSignupPage ? (
                <div className="flex flex-col flex-grow">
                  <Component {...pageProps} />
                </div>
              ) : (
                <div className="flex flex-col flex-grow">
                  {isFeedPage || isProfilePage || isUsernamePage ? (
                    <HeaderCompressed />
                  ) : (
                    <Header />
                  )}
                  <NavBar />
                  {isFeedPage ? <FeedRightBar /> : null}
                  {isProfilePage ? <ProfileRightBar /> : null}
                  {isUsernamePage ? <ProfileOtherUsersRightBar /> : null}
                  <Component {...pageProps} />
                  {isCreatePage ? <CreateFooter /> : null}
                </div>
              )}
              {isLoginPage || isSignupPage ? null : (
                <div className="flex md:hidden">
                  <Footer />
                </div>
              )}
            </div>
          </ThemeProvider>
        </div>
      )}
    </>
  );
}
