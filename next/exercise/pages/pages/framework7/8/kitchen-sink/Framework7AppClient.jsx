// Import Framework7
import Framework7 from 'framework7/lite-bundle';
// Import Framework7-React and components
import Framework7React, {App, Block, View, Page, Navbar} from 'framework7-react';

// Import icons and styles
import 'framework7/css/bundle';
import 'framework7-icons/css/framework7-icons.css';
import 'material-icons/iconfont/material-icons.css';

import {routes} from './_routes';

// Install Framework7 React plugin for Framework7
Framework7.use(Framework7React);

export default function Framework7AppClient({ router }) {
  // 确保在浏览器环境中
  if (typeof window === 'undefined') {
    return null;
  }

  // 构建URL，使用window.location作为fallback
  const url = process.env.NEXT_PUBLIC_HOST 
    ? `${process.env.NEXT_PUBLIC_HOST}${router.asPath}` 
    : window.location.href;

  return (
    <App url={url} routes={routes}
         // 添加一些Framework7 8.x的配置
         theme="auto" darkMode="auto">
      <View url="/pages/framework7/8/kitchen-sink" main
            browserHistory
            browserHistorySeparator=""
            browserHistoryInitialMatch={true}
            browserHistoryStoreHistory={false}>
        {/* 默认页面内容 */}
        <Page>
          <Navbar title="Framework7 Next.js" />
          <Block>
            <p>Framework7 is loading...</p>
          </Block>
        </Page>
      </View>
    </App>
  );
}