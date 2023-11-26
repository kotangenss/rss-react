import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { useState } from 'react';
import { wrapper } from 'src/store';
import Loader from 'components/loader';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  const { mainData, detailData } = pageProps;

  return (
    <>
      {loading && <Loader />}
      <Component mainData={mainData} detailData={detailData} />
    </>
  );
}

export default wrapper.withRedux(App);
