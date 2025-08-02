import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // 指定Next.js应用的根目录，以便加载next.config.js和.env文件
  dir: './',
});

// Jest自定义配置
const customJestConfig = {
  // 添加更多自定义配置选项
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // 处理模块路径别名
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

// createJestConfig会自动读取next.config.js并合并配置
export default createJestConfig(customJestConfig);
