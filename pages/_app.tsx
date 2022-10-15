import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { persistor, store } from "../store";
import dynamic from 'next/dynamic';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {typeof window == "undefined" ? null : (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Component {...pageProps} />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      )
      }
    </>
  );
}
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
