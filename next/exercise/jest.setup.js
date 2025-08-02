// 导入Jest DOM扩展，提供了匹配器如toBeInTheDocument()
import '@testing-library/jest-dom';

// 模拟matchMedia，在测试环境中未定义
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 如果需要，这里可以添加更多的全局模拟或设置
