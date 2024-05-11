import type { NextPage } from 'next'
import type { AppType, AppProps } from 'next/app'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appWithTranslation, SSRConfig } from 'next-i18next'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import BaseLayout from '@/components/Layouts/BaseLayout'
import { withTRPC } from '@/lib/utils/trpc'

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const I18nextAdapter = appWithTranslation<
  AppProps<SSRConfig> & { children: React.ReactNode }
>(({ children }) => <>{children}</>);

const I18nProvider = (props: AppProps) => {
  // @ts-ignore
  const _i18n = trpc.i18n.useQuery(undefined, {
    trpc: { context: { skipBatch: true } },
  });

  const locale = _i18n.data?.locale;
  const i18n = _i18n.data?.i18n;

  const passedProps = {
    ...props,
    pageProps: {
      ...props.pageProps,
      ...i18n,
    },
    router: locale ? { locale } : props.router,
  } as unknown as ComponentProps<typeof I18nextAdapter>;
  return <I18nextAdapter {...passedProps} />;
}

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>)

  return getLayout(
    <I18nProvider {...pageProps}>
      <Component {...pageProps}></Component>
      <ReactQueryDevtools initialIsOpen />
    </I18nProvider>
  )
}) as AppType

export default withTRPC(App)