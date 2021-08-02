import { Router } from "next/dist/client/router";
import { Layout } from "components";
import { CartProvider } from "context";
import { AnimatePresence } from "framer-motion";
import nProgress from "nprogress";
import type { AppProps } from "next/app";
import "styles/globals.css";
import "nprogress/nprogress.css";

nProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
