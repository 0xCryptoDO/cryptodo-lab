import { Head, Html, Main, NextScript } from 'next/document';

import { getCssText } from '@/styles';

const Document = () => (
  <Html>
    <Head>
      {/* eslint-disable-next-line */}
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta
        property="twitter:url"
        content="https://lab.cryptodo.app"
        key="twitter:url"
      />
      <meta property="twitter:title" content="Cryptodo " key="twitter:title" />
      <meta
        property="twitter:description"
        content="No-code web3 solutions builder for business"
        key="twitter:description"
      />
      <meta
        property="twitter:image"
        content="https://i.ibb.co/0j8jFmH/Crypto-Do-26-1.png"
        key="twitter:image"
      />
      <meta name="google" content="notranslate" />
    </Head>
    <body>
      <Main />
      <NextScript />
      <script
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(89410446, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                });
              `,
        }}
      />
    </body>
  </Html>
);

export default Document;
