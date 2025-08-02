import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

// 模拟ThemeToggle组件，因为它可能依赖于上下文提供者
jest.mock('@/app/lib/components/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle-mock">主题切换</div>,
}));

describe('基础TypeScript页面测试', () => {
  it('渲染页面标题', () => {
    render(<Page/>);

    // 检查页面标题是否正确渲染
    expect(screen.getByText('Page')).toBeInTheDocument();
  });
  import {describe, it, expect, vi} from 'vitest';
  import {render, screen} from '@testing-library/react';
  import Page from '../page';

// 模拟ThemeToggle组件，因为它可能依赖于上下文提供者
  vi.mock('@/app/lib/components/ThemeToggle', () => ({
    ThemeToggle: () => <div data-testid="theme-toggle-mock">主题切换</div>,
  }));

  describe('基础TypeScript页面测试', () => {
    it('渲染页面标题', () => {
      render(<Page/>);

      // 检查页面标题是否正确渲染
      expect(screen.getByText('Page')).toBeDefined();
    });

    it('渲染TypeScriptBasicReact组件', () => {
      render(<Page/>);

      // 检查TypeScriptBasicReact组件是否正确渲染
      expect(screen.getByText('TypeScriptBasicReact')).toBeDefined();
    });

    it('渲染主题切换按钮', () => {
      render(<Page/>);

      // 检查模拟的ThemeToggle组件是否正确渲染
      expect(screen.getByTestId('theme-toggle-mock')).toBeDefined();
    });
  });
  it('渲染TypeScriptBasicReact组件', () => {
    render(<Page/>);

    // 检查TypeScriptBasicReact组件是否正确渲染
    expect(screen.getByText('TypeScriptBasicReact')).toBeInTheDocument();
  });

  it('渲染主题切换按钮', () => {
    render(<Page/>);

    // 检查模拟的ThemeToggle组件是否正确渲染
    expect(screen.getByTestId('theme-toggle-mock')).toBeInTheDocument();
  });
});
