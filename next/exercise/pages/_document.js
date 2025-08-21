import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 在这里添加全局样式链接 */}
        <link rel="stylesheet" href="/fonts/local.css"/>
        {/*/!* 字体和样式预加载 *!/*/}
        {/*<link rel="preconnect" href="https://fonts.googleapis.com"/>*/}
        {/*<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>*/}
        <link rel="icon" href="/favicon.ico"/>

      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  );
}
