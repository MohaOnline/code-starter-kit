import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from './ErrorBoundary';

// 动态导入Framework7组件，禁用SSR
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