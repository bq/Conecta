import Document, { Html, Head, Main, NextScript } from "next/document";
import { Global, css } from "@emotion/core";
import baseStyles from "../base-styles";

export default class BitbloqDocument extends Document {
  public render() {
    return (
      <Html>
        <Global styles={baseStyles} />
        <Head>
          <title>Conecta</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Inter:400,500,600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
