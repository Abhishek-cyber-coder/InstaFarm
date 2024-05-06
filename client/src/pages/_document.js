import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning={true}>
      <Head />
      <body className="m-0 p-0 box-border">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
