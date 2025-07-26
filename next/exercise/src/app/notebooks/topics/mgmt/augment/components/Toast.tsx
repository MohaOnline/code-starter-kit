import React, { useState, useEffect } from 'react';

// Toast 消息接口 / Toast message interface
interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

// Toast 组件属性 / Toast component props
interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: number) => void;
}

// 单个 Toast 项组件 / Single toast item component
const ToastItem: React.FC<{ message: ToastMessage; onRemove: (id: number) => void }> = ({ 
  message, 
  onRemove 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(message.id);
    }, message.duration || 3000);

    return () => clearTimeout(timer);
  }, [message.id, message.duration, onRemove]);

  const getToastStyles = () => {
    const baseStyles = "mb-2 p-4 rounded-lg shadow-lg flex items-center justify-between transition-all duration-300 transform";
    
    switch (message.type) {
      case 'success':
        return `${baseStyles} bg-green-100 border border-green-400 text-green-700`;
      case 'error':
        return `${baseStyles} bg-red-100 border border-red-400 text-red-700`;
      case 'warning':
        return `${baseStyles} bg-yellow-100 border border-yellow-400 text-yellow-700`;
      case 'info':
        return `${baseStyles} bg-blue-100 border border-blue-400 text-blue-700`;
      default:
        return `${baseStyles} bg-gray-100 border border-gray-400 text-gray-700`;
    }
  };

  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📝';
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center">
        <span className="mr-2 text-lg">{getIcon()}</span>
        <span className="font-medium">{message.message}</span>
      </div>
      <button
        onClick={() => onRemove(message.id)}
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

// Toast 容器组件 / Toast container component
const Toast: React.FC<ToastProps> = ({ messages, onRemove }) => {
  if (messages.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      {messages.map((message) => (
        <ToastItem
          key={message.id}
          message={message}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

// Toast Hook / Toast 钩子
export const useToast = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastMessage['type'] = 'info', duration?: number) => {
    const id = Date.now();
    const newMessage: ToastMessage = {
      id,
      message,
      type,
      duration
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const removeToast = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const showSuccess = (message: string, duration?: number) => addToast(message, 'success', duration);
  const showError = (message: string, duration?: number) => addToast(message, 'error', duration);
  const showWarning = (message: string, duration?: number) => addToast(message, 'warning', duration);
  const showInfo = (message: string, duration?: number) => addToast(message, 'info', duration);

  return {
    messages,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    ToastContainer: () => <Toast messages={messages} onRemove={removeToast} />
  };
};

export default Toast;
