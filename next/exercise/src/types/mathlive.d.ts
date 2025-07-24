// MathLive 类型声明文件
// 为 MathLive 的 math-field 自定义元素提供 TypeScript 类型支持
// 参考文档: https://cortexjs.io/mathlive/

import * as React from 'react';

// MathfieldElement 接口定义
// 定义了 MathLive 数学输入框元素的方法和属性
export interface MathfieldElement extends HTMLElement {
  // 基本属性
  value: string;
  
  // 核心方法
  getValue(format?: 'latex' | 'ascii-math' | 'spoken' | 'mathml'): string;
  setValue(value: string, options?: { insertionMode?: 'replaceSelection' | 'replaceAll' | 'insertBefore' | 'insertAfter' }): void;
  
  // 命令执行
  executeCommand(command: string | string[]): boolean;
  
  // 选择和光标
  select(): void;
  clearSelection(): void;
  
  // 表达式计算（如果可用）
  expression?: {
    evaluate(): { latex: string; value?: number };
  };
  
  // 焦点管理
  focus(): void;
  blur(): void;
  hasFocus(): boolean;
  
  // 其他实用方法
  insert(s: string, options?: any): boolean;
  keystroke(keys: string): boolean;
}

// 全局声明，扩展 JSX 和 HTML 元素
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // MathLive 特有的属性
        value?: string;
        // 事件处理器
        onInput?: (event: Event) => void;
        onChange?: (event: Event) => void;
        onFocus?: (event: FocusEvent) => void;
        onBlur?: (event: FocusEvent) => void;
        // 其他可能的属性
        readonly?: boolean;
        disabled?: boolean;
        // ref 支持
        ref?: React.Ref<MathfieldElement>;
      };
    }
  }
  
  interface HTMLElementTagNameMap {
    'math-field': MathfieldElement;
  }
}