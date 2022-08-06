import './styles.scss';
import './nprogress.scss';
import '@fontsource/inter';
import '@fontsource/raleway';
import '@fontsource/open-sans';

import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '../layouts/Layout';
import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getLastSegmentInPath } from '../lib/routes';

const themeWithFont = extendTheme({
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: () => ({
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        bg: '#2a384e',
      },
    }),
  },
});

type NextPageWithLayout = NextPage & {
  getLayout?: (
    page: React.ReactElement,
    pageProps: Record<string, unknown>
  ) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey, signal }) => {
        const data = await (
          await fetch(`${queryKey[0]}`, {
            signal,
          })
        ).json();

        return data;
      },
    },
  },
});

const WEBSITE_TITLE = 'Adam M. Rosenberg, PA-C';
const WEBSITE_DESCRIPTION = 'NYC Based Board Certified PA. Botox & Filler';

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const pageTitle = getLastSegmentInPath(router.pathname);
  const fullWebsiteTitle = `${WEBSITE_TITLE}${
    pageTitle ? ` | ${pageTitle.toUpperCase()}` : ''
  }`;

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  return (
    <ChakraProvider resetCSS theme={themeWithFont}>
      <Head>
        <title>{fullWebsiteTitle}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content={fullWebsiteTitle} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={'https://ssharely.joroze.com'} /> */}
        <meta property="og:title" content={fullWebsiteTitle} />
        <meta property="og:image" content={'/assets/images/actionshot.jpg'} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        {/* <meta property="twitter:url" content={metaUrl} /> */}
        <meta property="twitter:title" content={fullWebsiteTitle} />
        <meta property="twitter:description" content={WEBSITE_DESCRIPTION} />
        <meta
          property="twitter:image"
          content={'/assets/images/actionshot.jpg'}
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />, pageProps)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default CustomApp;
