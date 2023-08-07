import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="og:title" content="The Department of Commerce" />
          <meta name="og:description"
            content="The Department of Commerce fosters economic growth, innovation, and job
            creation through promoting trade, technology advancement, and data-driven policies." />
          <meta name="og:image" content="https://imgs.milklegend.xyz/dept_commerce-256x256.png" />
          <meta name="og:url" content="https://doc.milklegend.xyz" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="The Department of Commerce" />
          <meta name="og:locale" content="en_US" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="The Department of Commerce" />
          <meta name="twitter:description"
            content="The Department of Commerce fosters economic growth, innovation, and job
            creation through promoting trade, technology advancement, and data-driven policies." />
          <meta name="twitter:image" content="https://imgs.milklegend.xyz/dept_commerce.png" />
          <meta name="twitter:image:alt" content="The Department of Commerce" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}