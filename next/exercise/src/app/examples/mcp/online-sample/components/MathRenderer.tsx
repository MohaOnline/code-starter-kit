'use client';

import React, { useEffect, useRef, useState } from 'react';

// 高级数学公式渲染器
// 模拟 KaTeX 的渲染效果，支持复杂的 LaTeX 语法
// 参考: https://katex.org/docs/supported.html

interface MathRendererProps {
  latex: string;
  inline?: boolean;
  className?: string;
}

// LaTeX 解析器 - 处理复杂的嵌套结构
class LatexParser {
  private tokens: string[] = [];
  private position = 0;
  
  constructor(private latex: string) {
    this.tokenize();
  }
  
  // 词法分析 - 将 LaTeX 字符串分解为标记
  private tokenize() {
    const regex = /\\[a-zA-Z]+|\{|\}|\^|_|[^\\{}^_]+/g;
    this.tokens = this.latex.match(regex) || [];
  }
  
  // 解析主函数
  parse(): React.ReactNode {
    this.position = 0;
    return this.parseExpression();
  }
  
  // 解析表达式
  private parseExpression(): React.ReactNode {
    const elements: React.ReactNode[] = [];
    
    while (this.position < this.tokens.length) {
      const token = this.tokens[this.position];
      
      if (token === '}') {
        break; // 结束当前组
      }
      
      elements.push(this.parseElement());
    }
    
    return elements.length === 1 ? elements[0] : <span>{elements}</span>;
  }
  
  // 解析单个元素
  private parseElement(): React.ReactNode {
    const token = this.tokens[this.position++];
    
    if (!token) return null;
    
    // 处理 LaTeX 命令
    if (token.startsWith('\\')) {
      return this.parseCommand(token);
    }
    
    // 处理上标
    if (token === '^') {
      return this.parseSuperscript();
    }
    
    // 处理下标
    if (token === '_') {
      return this.parseSubscript();
    }
    
    // 处理组开始
    if (token === '{') {
      return this.parseGroup();
    }
    
    // 普通文本
    return this.renderText(token);
  }
  
  // 解析 LaTeX 命令
  private parseCommand(command: string): React.ReactNode {
    const cmd = command.slice(1); // 移除反斜杠
    
    switch (cmd) {
      case 'frac':
        return this.parseFraction();
      case 'sqrt':
        return this.parseSquareRoot();
      case 'sin':
      case 'cos':
      case 'tan':
      case 'cot':
      case 'sec':
      case 'csc':
        return <span className="math-function">{cmd}</span>;
      case 'pi':
        return <span className="math-symbol">π</span>;
      case 'theta':
        return <span className="math-symbol">θ</span>;
      case 'alpha':
        return <span className="math-symbol">α</span>;
      case 'beta':
        return <span className="math-symbol">β</span>;
      case 'gamma':
        return <span className="math-symbol">γ</span>;
      case 'delta':
        return <span className="math-symbol">δ</span>;
      case 'cdot':
        return <span className="math-operator">⋅</span>;
      case 'div':
        return <span className="math-operator">÷</span>;
      case 'pm':
        return <span className="math-operator">±</span>;
      case 'mp':
        return <span className="math-operator">∓</span>;
      case 'times':
        return <span className="math-operator">×</span>;
      case 'int':
        return <span className="math-operator integral">∫</span>;
      case 'sum':
        return <span className="math-operator large">∑</span>;
      case 'prod':
        return <span className="math-operator large">∏</span>;
      case 'lim':
        return <span className="math-function">lim</span>;
      case 'infty':
        return <span className="math-symbol">∞</span>;
      case 'partial':
        return <span className="math-symbol">∂</span>;
      case 'nabla':
        return <span className="math-symbol">∇</span>;
      default:
        return <span className="math-unknown">\{cmd}</span>;
    }
  }
  
  // 解析分数
  private parseFraction(): React.ReactNode {
    const numerator = this.parseGroup();
    const denominator = this.parseGroup();
    
    return (
      <span className="math-fraction">
        <span className="fraction-numerator">{numerator}</span>
        <span className="fraction-line"></span>
        <span className="fraction-denominator">{denominator}</span>
      </span>
    );
  }
  
  // 解析平方根
  private parseSquareRoot(): React.ReactNode {
    const content = this.parseGroup();
    
    return (
      <span className="math-sqrt">
        <span className="sqrt-symbol">√</span>
        <span className="sqrt-content">{content}</span>
      </span>
    );
  }
  
  // 解析上标
  private parseSuperscript(): React.ReactNode {
    const content = this.parseGroup() || this.parseElement();
    return <sup className="math-superscript">{content}</sup>;
  }
  
  // 解析下标
  private parseSubscript(): React.ReactNode {
    const content = this.parseGroup() || this.parseElement();
    return <sub className="math-subscript">{content}</sub>;
  }
  
  // 解析组 {}
  private parseGroup(): React.ReactNode {
    const elements: React.ReactNode[] = [];
    
    while (this.position < this.tokens.length) {
      const token = this.tokens[this.position];
      
      if (token === '}') {
        this.position++; // 跳过 }
        break;
      }
      
      elements.push(this.parseElement());
    }
    
    return elements.length === 1 ? elements[0] : <span>{elements}</span>;
  }
  
  // 渲染普通文本
  private renderText(text: string): React.ReactNode {
    // 处理数字、字母和符号
    return text.split('').map((char, index) => {
      if (/[0-9]/.test(char)) {
        return <span key={index} className="math-number">{char}</span>;
      }
      if (/[a-zA-Z]/.test(char)) {
        return <span key={index} className="math-variable">{char}</span>;
      }
      if (/[+\-=<>]/.test(char)) {
        return <span key={index} className="math-operator">{char}</span>;
      }
      if (/[()\[\]]/.test(char)) {
        return <span key={index} className="math-bracket">{char}</span>;
      }
      return <span key={index}>{char}</span>;
    });
  }
}

// 主渲染组件
export default function MathRenderer({ latex, inline = false, className = '' }: MathRendererProps) {
  const [renderedContent, setRenderedContent] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const parser = new LatexParser(latex);
      const content = parser.parse();
      setRenderedContent(content);
      setError(null);
    } catch (err) {
      setError('LaTeX 解析错误');
      console.error('LaTeX parsing error:', err);
    }
  }, [latex]);
  
  if (error) {
    return (
      <span className={`math-error ${className}`}>
        {error}: {latex}
      </span>
    );
  }
  
  return (
    <span 
      className={`math-render ${inline ? 'math-inline' : 'math-display'} ${className}`}
    >
      {renderedContent}
      
      <style jsx>{`
        .math-render {
          font-family: 'Times New Roman', 'STIX Two Math', serif;
          font-style: normal;
        }
        
        .math-inline {
          display: inline;
          vertical-align: baseline;
          font-size: 1em;
        }
        
        .math-display {
          display: block;
          text-align: center;
          font-size: 1.3em;
          margin: 1em 0;
          padding: 0.5em;
        }
        
        .math-fraction {
          display: inline-block;
          vertical-align: middle;
          text-align: center;
          margin: 0 0.2em;
        }
        
        .fraction-numerator {
          display: block;
          padding: 0 0.3em 0.1em;
          border-bottom: 1px solid currentColor;
          margin-bottom: 0.1em;
        }
        
        .fraction-denominator {
          display: block;
          padding: 0.1em 0.3em 0;
        }
        
        .fraction-line {
          display: block;
          height: 1px;
          background: currentColor;
          margin: 0;
        }
        
        .math-sqrt {
          display: inline-block;
          position: relative;
          margin: 0 0.2em;
        }
        
        .sqrt-symbol {
          font-size: 1.2em;
          margin-right: 0.1em;
        }
        
        .sqrt-content {
          border-top: 1px solid currentColor;
          padding-top: 0.1em;
          padding-left: 0.2em;
          padding-right: 0.2em;
        }
        
        .math-superscript {
          font-size: 0.75em;
          vertical-align: super;
          line-height: 0;
        }
        
        .math-subscript {
          font-size: 0.75em;
          vertical-align: sub;
          line-height: 0;
        }
        
        .math-function {
          font-style: normal;
          margin-right: 0.1em;
        }
        
        .math-symbol {
          font-style: italic;
        }
        
        .math-variable {
          font-style: italic;
        }
        
        .math-number {
          font-style: normal;
        }
        
        .math-operator {
          margin: 0 0.2em;
          font-style: normal;
        }
        
        .math-operator.large {
          font-size: 1.5em;
          vertical-align: middle;
        }
        
        .math-operator.integral {
          font-size: 1.8em;
          vertical-align: middle;
        }
        
        .math-bracket {
          font-style: normal;
          margin: 0 0.1em;
        }
        
        .math-error {
          color: #dc2626;
          background: #fef2f2;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-family: monospace;
          font-size: 0.875em;
        }
        
        .math-unknown {
          color: #dc2626;
          font-family: monospace;
        }
      `}</style>
    </span>
  );
}