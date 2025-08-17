// pages/_app.js
import {useRouter} from 'next/router';
import {routeMeta} from '@/pages/libs/route-meta';
import {withPagesExamplesLayout} from '@/pages/libs/pagesExamplesLayout'
import 'react-toastify/dist/ReactToastify.css';

function Pages({Component, pageProps}) {
  const router = useRouter();

  // 根据 URI 获取 meta 信息，没有配置时，返回预制 meta。
  const meta = routeMeta[router.pathname] || {title: 'Default'};

  // 包装 Component
  const WrappedComponent = withPagesExamplesLayout(Component, meta);

  return <WrappedComponent {...pageProps} />;
}

export default Pages;