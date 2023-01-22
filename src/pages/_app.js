import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.css';
import DefaultLayout from "../layouts/Default.jsx";
import { CartProvider } from '../modules/AppContext';

function MyApp({ Component, pageProps }) {
  return (

    <NextUIProvider>
      <CartProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </CartProvider>
    </NextUIProvider>

  );
}

export default MyApp;