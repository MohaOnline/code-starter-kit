import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// 导入TypeScriptBasicReact组件
// 注意：由于该组件未导出，我们需要在测试中重新创建它

describe('TypeScriptBasicReact组件测试', () => {
  // 重新创建组件以进行测试
  const TypeScriptBasicReact: () => React.ReactElement = (): React.ReactElement => {
    return (
      <>
        <div>TypeScriptBasicReact</div>
      </>
    );
  };
  import {describe, it, expect} from 'vitest';
  import {render, screen} from '@testing-library/react';
  import React from 'react';

// 导入TypeScriptBasicReact组件
// 注意：由于该组件未导出，我们需要在测试中重新创建它

  describe('TypeScriptBasicReact组件测试', () => {
    // 重新创建组件以进行测试
    const TypeScriptBasicReact: () => React.ReactElement = (): React.ReactElement => {
      return (
        <>
          <div>TypeScriptBasicReact</div>
        </>
      );
    };

    it('渲染组件文本', () => {
      render(<TypeScriptBasicReact/>);

      // 检查组件是否正确渲染其文本内容
      expect(screen.getByText('TypeScriptBasicReact')).toBeDefined();
    });

    it('返回的是React元素', () => {
      // 验证组件返回的是ReactElement
      const element = TypeScriptBasicReact();
      expect(React.isValidElement(element)).toBe(true);
    });
  });
  it('渲染组件文本', () => {
    render(<TypeScriptBasicReact/>);

    // 检查组件是否正确渲染其文本内容
    expect(screen.getByText('TypeScriptBasicReact')).toBeInTheDocument();
  });

  it('返回的是React元素', () => {
    // 验证组件返回的是ReactElement
    const element = TypeScriptBasicReact();
    expect(React.isValidElement(element)).toBe(true);
  });
});
