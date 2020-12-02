import NextHead from "next/head";
import { DefaultSeo } from "next-seo";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Royal University of GatherContent"
        title="Royal University of GatherContent"
        description="Join some of the best students from around the globe at one of the
        world's top universities. We’ve got the perfect course just for you."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://university.bejamas.io/",
          site_name: "Royal University of GatherContent",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
