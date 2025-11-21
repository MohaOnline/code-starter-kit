// Import Framework7
import Framework7 from 'framework7/lite-bundle';
// Import Framework7-React and components
import Framework7React, {App, Block, View, Page, Navbar} from 'framework7-react';

// Import icons and styles
import 'framework7/css/bundle';
import 'framework7-icons/css/framework7-icons.css';
import 'material-icons/iconfont/material-icons.css';

import {routes} from './_routes';
import Home from './f7/home';

// Install Framework7 React plugin for Framework7
Framework7.use(Framework7React);

export default function Framework7AppClient({ router }) {
  // 确保在浏览器环境中
  if (typeof window === 'undefined') {
    return null;
  }

  // 构建URL，使用window.location作为fallback
  const url = process.env.NEXT_PUBLIC_HOST ? `${process.env.NEXT_PUBLIC_HOST}${router.asPath}` : window.location.href;
  const uri = router.asPath ? router.asPath : window.location.pathname;

  return (
    <App url={url} routes={routes} theme="auto" darkMode="auto">
      {/* RUI: "/pages/framework7/8/kitchen-sink" */}
      <View url={uri} main browserHistory browserHistorySeparator="" browserHistoryInitialMatch={true} browserHistoryStoreHistory={false}>
        {/* View 的内容会被替换，默认页面内容 */}
        <Home/>
      </View>
    </App>
  );
}