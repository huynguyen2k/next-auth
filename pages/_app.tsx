import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { axiosClient } from '../api-client/axios-client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: url => axiosClient.get(url), shouldRetryOnError: false }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
