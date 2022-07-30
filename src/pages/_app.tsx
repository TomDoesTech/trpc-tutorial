import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import type { AppProps } from 'next/app';
import superjson from 'superjson';
import { url } from '../constants';
import { UserContextProvider } from '../context/user.context';
import { AppRouter } from '../server/route/app.router';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  const { data, isLoading } = trpc.useQuery(['users.me']);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
      links,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
