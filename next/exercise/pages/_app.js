// pages/_app.js
import React from 'react';
import {useRouter} from 'next/router';
import {routeMeta} from '@/pages/libs/route-meta';
import {withPagesExamplesLayout} from '@/pages/libs/pagesExamplesLayout'
import 'react-toastify/dist/ReactToastify.css';

/**
 * A functional component that wraps a given component with a designated layout
 * based on metadata associated with the current route. It provides meta information
 * for the page and passes down props to the wrapped component.
 *
 * @param {Object} param0 - The parameters passed to the Pages component.
 * @param {React.FunctionComponent} param0.Component - The component to be rendered.
 * @param {Object} param0.pageProps - Properties passed down to the component.
 * @return {JSX.Element} The wrapped component with the layout applied and the corresponding page props.
 */
function Pages({Component, pageProps}) {
  // 根据 URI 获取 meta 信息，没有配置时，返回预制 meta。
  const router = useRouter();
  const meta = routeMeta[router.pathname] || {title: 'Default'};

  // Component:
  const WrappedComponent = withPagesExamplesLayout(Component, meta);

  console.dir(pageProps);
  return <WrappedComponent {...pageProps} />;
}

export default Pages;