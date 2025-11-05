import {Html, Head, Main, NextScript} from 'next/document';
import {DocumentHeadTags, documentGetInitialProps,} from '@mui/material-nextjs/v15-pagesRouter';
import {InitColorSchemeScript} from '@mui/material';

export default function Document(props) {
  return (
    <Html>
      <Head>
        <DocumentHeadTags {...props} />
        {/* 在这里添加全局样式链接 */}
        <link rel="stylesheet" href="/fonts/local.css"/>
        {/*/!* 字体和样式预加载 *!/*/}
        {/*<link rel="preconnect" href="https://fonts.googleapis.com"/>*/}
        {/*<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>*/}
        <link rel="icon" href="/favicon.ico"/>

      </Head>
      <body>
      {/*https://mui.com/material-ui/customization/css-theme-variables/configuration/*/}
      <InitColorSchemeScript attribute="class"/>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  );
}

// Document.getInitialProps 会在服务端渲染时运行，用来收集并返回给 Document 组件需要的初始属性，
// 常见用途是注入样式（例如 MUI/Emotion 的关键 CSS），避免页面首次渲染出现“样式闪烁”（FOUC）。
Document.getInitialProps = async (ctx) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};