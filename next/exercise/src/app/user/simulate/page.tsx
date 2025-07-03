'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SimulateLoginPage() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleLogin = async () => {
    if (!username.trim()) {
      toast.error('请输入用户名');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        username: username.trim(),
        redirect: false
      });

      if (result?.error) {
        toast.error('用户不存在或密码错误');
      } else {
        toast.success(`登录成功！`);
        setUsername(''); // 清空输入框
      }
    } catch (error) {
      console.error('登录错误:', error);
      toast.error('网络错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setUsername('');
    toast.info('已成功登出');
  };

  // 如果用户已登录，显示已登录状态
  if (session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              已登录
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              欢迎回来！
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">当前登录用户</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {session.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  用户名: {session.user.email}
                </p>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
                size="lg"
              >
                登出
              </Button>
            </div>
          </div>
        </div>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="auto"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            用户模拟登录
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            请输入您的用户名进行登录
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              用户名
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请输入用户名"
              disabled={isLoading}
              className="w-full"
            />
          </div>
          
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </div>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>提示：只有在 users 表中存在的用户名才能成功登录</p>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="auto"
      />
    </div>
  );
}