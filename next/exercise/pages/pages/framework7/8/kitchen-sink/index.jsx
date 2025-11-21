import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from './ErrorBoundary';

// 异步导入Framework7 React 组件，禁用SSR
// 等价于
// import Framework7App from './Framework7AppClient';
const Framework7App = dynamic(() => import('./Framework7AppClient'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div>Loading Framework7...</div>
    </div>
  )
});

export default function Framework7AppWrapper() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 只在客户端渲染Framework7
  if (!isClient) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Initializing Framework7...</div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Framework7App router={router} />
    </ErrorBoundary>
  );
}