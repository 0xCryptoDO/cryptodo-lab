/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { Web3Provider } from '@cryptodo/frontend-sdk';

import '@/styles/packages';
import { setupGlobalStyles } from '@/styles';
import { store } from '@/reduxStore/store';
import { Root } from '@/Root';

const MyApp = ({ Component, pageProps }: AppProps) => {
  setupGlobalStyles();

  return (
    <Provider store={store}>
      <Web3Provider>
        <Root>
          <Component {...pageProps} />
        </Root>
      </Web3Provider>
    </Provider>
  );
};

export default MyApp;
