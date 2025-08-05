"use client"

import React from 'react';
import 'framework7/css/bundle';

import Framework7 from 'framework7/lite/bundle';
import Framework7React from 'framework7-react';
import { App, Panel, View, theme } from 'framework7-react';
import routes from './routes.js';
import store from './store.js';
// import './css/app.css';
import Script from "next/script";

export default () => {

  Framework7.use(Framework7React);
  // let theme = 'auto';
  let theme = 'ios';
  // if (document.location.search.indexOf('theme=') >= 0) {
  //   theme = document.location.search.split('theme=')[1].split('&')[0];
  // }
  // const needsBrowserHistory = document.location.href.includes('example-preview');
  const needsBrowserHistory = false;

  return (
    <App
      theme={theme}
      routes={routes}
      store={store}
      popup={{ closeOnEscape: true }}
      sheet={{ closeOnEscape: true }}
      popover={{ closeOnEscape: true }}
      actions={{ closeOnEscape: true }}
    >
      <link rel="stylesheet" href="/css/framework7.css" />
      <Panel left floating resizable>
        <View url="/panel-left/" linksView=".view-main" />
      </Panel>
      <Panel right floating resizable>
        <View url="/panel-right/" />
      </Panel>
      <View
        url="/"
        main
        className="safe-areas"
        masterDetailBreakpoint={768}
        browserHistory={needsBrowserHistory}
        browserHistoryRoot={needsBrowserHistory ? '/kitchen-sink/react/dist/' : ''}
        preloadPreviousPage={!needsBrowserHistory}
        iosSwipeBack={!needsBrowserHistory}
      />
    </App>
  );
};
