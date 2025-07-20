'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, RefreshCw, Trash2 } from 'lucide-react';

// Badge 组件内联定义，避免导入问题
const Badge = ({ children, variant = 'default', className = '' }: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}) => {
  const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const variantClasses = {
    default: 'border-transparent bg-blue-600 text-white',
    secondary: 'border-transparent bg-gray-100 text-gray-900',
    destructive: 'border-transparent bg-red-600 text-white',
    outline: 'text-gray-900 border-gray-300'
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

// 数学符号和函数的分类数据
// 参考: https://katex.org/docs/supported.html
const SYMBOL_CATEGORIES = {
  basic: {
    name: '基础运算',
    symbols: [
      { symbol: '+', latex: '+', description: '加法' },
      { symbol: '−', latex: '-', description: '减法' },
      { symbol: '×', latex: '\\times', description: '乘法' },
      { symbol: '÷', latex: '\\div', description: '除法' },
      { symbol: '=', latex: '=', description: '等于' },
      { symbol: '≠', latex: '\\neq', description: '不等于' },
      { symbol: '±', latex: '\\pm', description: '正负号' },
    ]
  },
  fractions: {
    name: '分数与根式',
    symbols: [
      { symbol: '½', latex: '\\frac{1}{2}', description: '分数' },
      { symbol: '√', latex: '\\sqrt{x}', description: '平方根' },
      { symbol: '∛', latex: '\\sqrt[3]{x}', description: '立方根' },
      { symbol: 'ⁿ√', latex: '\\sqrt[n]{x}', description: 'n次根' },
    ]
  },
  powers: {
    name: '指数与对数',
    symbols: [
      { symbol: 'x²', latex: 'x^2', description: '平方' },
      { symbol: 'xⁿ', latex: 'x^n', description: '幂' },
      { symbol: 'log', latex: '\\log', description: '对数' },
      { symbol: 'ln', latex: '\\ln', description: '自然对数' },
      { symbol: 'e', latex: 'e', description: '自然常数' },
    ]
  },
  trigonometry: {
    name: '三角函数',
    symbols: [
      { symbol: 'sin', latex: '\\sin', description: '正弦' },
      { symbol: 'cos', latex: '\\cos', description: '余弦' },
      { symbol: 'tan', latex: '\\tan', description: '正切' },
      { symbol: 'π', latex: '\\pi', description: '圆周率' },
      { symbol: '°', latex: '^\\circ', description: '度' },
    ]
  },
  calculus: {
    name: '微积分',
    symbols: [
      { symbol: '∫', latex: '\\int', description: '积分' },
      { symbol: '∑', latex: '\\sum', description: '求和' },
      { symbol: '∏', latex: '\\prod', description: '连乘' },
      { symbol: '∂', latex: '\\partial', description: '偏导数' },
      { symbol: '∞', latex: '\\infty', description: '无穷大' },
      { symbol: 'lim', latex: '\\lim', description: '极限' },
    ]
  },
  greek: {
    name: '希腊字母',
    symbols: [
      { symbol: 'α', latex: '\\alpha', description: 'alpha' },
      { symbol: 'β', latex: '\\beta', description: 'beta' },
      { symbol: 'γ', latex: '\\gamma', description: 'gamma' },
      { symbol: 'δ', latex: '\\delta', description: 'delta' },
      { symbol: 'θ', latex: '\\theta', description: 'theta' },
      { symbol: 'λ', latex: '\\lambda', description: 'lambda' },
      { symbol: 'μ', latex: '\\mu', description: 'mu' },
      { symbol: 'σ', latex: '\\sigma', description: 'sigma' },
    ]
  },
  matrices: {
    name: '矩阵与向量',
    symbols: [
      { symbol: '[]', latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}', description: '矩阵' },
      { symbol: '()', latex: '\\begin{pmatrix} a \\\\ b \\end{pmatrix}', description: '向量' },
      { symbol: '||', latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}', description: '行列式' },
    ]
  }
};

// 预设的公式模板
const FORMULA_TEMPLATES = [
  { name: '二次公式', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
  { name: '勾股定理', latex: 'a^2 + b^2 = c^2' },
  { name: '欧拉公式', latex: 'e^{i\\pi} + 1 = 0' },
  { name: '正弦定理', latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}' },
  { name: '积分公式', latex: '\\int_a^b f(x)dx = F(b) - F(a)' },
  { name: '泰勒展开', latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n' },
];

interface FormulaEditorProps {}

/**
 * 可视化公式编辑器组件
 * 
 * 功能特性：
 * 1. 实时 LaTeX 公式预览 - 使用 KaTeX 进行高质量数学公式渲染
 * 2. 分类符号面板 - 按数学领域组织的符号库
 * 3. 预设模板 - 常用数学公式的快速插入
 * 4. 历史记录 - 保存用户编辑的公式历史
 * 5. 导出功能 - 支持 LaTeX 代码和图片导出
 * 
 * 技术实现：
 * - 使用 KaTeX 库进行 LaTeX 渲染: https://katex.org/
 * - 客户端组件实现实时交互
 * - localStorage 保存用户数据
 * - 响应式设计适配移动端
 */
export default function FormulaEditor(): React.JSX.Element {
  // 当前编辑的 LaTeX 代码
  const [latexCode, setLatexCode] = useState<string>('E = mc^2');
  // 公式历史记录
  const [history, setHistory] = useState<string[]>([]);
  // 当前选中的符号分类
  const [activeCategory, setActiveCategory] = useState<string>('basic');
  // KaTeX 是否已加载
  const [isKatexLoaded, setIsKatexLoaded] = useState<boolean>(false);
  // 渲染错误状态
  const [renderError, setRenderError] = useState<string>('');

  // 动态加载 KaTeX 库
  // KaTeX 是一个快速的数学公式渲染库，比 MathJax 更轻量
  useEffect(() => {
    const loadKatex = async () => {
      try {
        // 动态导入 KaTeX CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
        document.head.appendChild(link);

        // 动态导入 KaTeX JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
        script.onload = () => setIsKatexLoaded(true);
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load KaTeX:', error);
      }
    };

    loadKatex();
  }, []);

  // 从 localStorage 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('formula-editor-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 保存历史记录到 localStorage
  useEffect(() => {
    localStorage.setItem('formula-editor-history', JSON.stringify(history));
  }, [history]);

  // 渲染 LaTeX 公式
  const renderFormula = (latex: string): { html: string; error: string } => {
    if (!isKatexLoaded || !window.katex) {
      return { html: 'Loading KaTeX...', error: '' };
    }

    try {
      const html = window.katex.renderToString(latex, {
        throwOnError: false,
        displayMode: true,
        output: 'html'
      });
      return { html, error: '' };
    } catch (error) {
      return {
        html: `<span style="color: red;">渲染错误: ${error.message}</span>`,
        error: error.message
      };
    }
  };

  // 使用 useMemo 来避免重复渲染
  const formulaResult = React.useMemo(() => {
    return renderFormula(latexCode);
  }, [latexCode, isKatexLoaded]);

  // 使用 useEffect 来更新错误状态，避免在渲染过程中更新状态
  React.useEffect(() => {
    setRenderError(formulaResult.error);
  }, [formulaResult.error]);

  // 插入符号到当前光标位置
  const insertSymbol = (latex: string): void => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = latexCode.substring(0, start) + latex + latexCode.substring(end);
      setLatexCode(newValue);
      
      // 恢复光标位置
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + latex.length, start + latex.length);
      }, 0);
    } else {
      setLatexCode(prev => prev + latex);
    }
  };

  // 保存当前公式到历史记录
  const saveToHistory = (): void => {
    if (latexCode.trim() && !history.includes(latexCode)) {
      setHistory(prev => [latexCode, ...prev.slice(0, 9)]); // 保留最近10条记录
    }
  };

  // 从历史记录加载公式
  const loadFromHistory = (formula: string): void => {
    setLatexCode(formula);
  };

  // 清空编辑器
  const clearEditor = (): void => {
    setLatexCode('');
  };

  // 复制 LaTeX 代码到剪贴板
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(latexCode);
      // 这里可以添加成功提示
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // 导出为图片 (简化实现，实际项目中可能需要更复杂的实现)
  const exportAsImage = (): void => {
    // 这里可以实现将渲染的公式导出为 PNG/SVG
    // 可以使用 html2canvas 或 KaTeX 的 SVG 输出功能
    alert('图片导出功能需要额外的库支持，如 html2canvas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            可视化公式编辑器
          </h1>
          <p className="text-gray-600">
            使用 LaTeX 语法创建和编辑数学公式，支持实时预览和符号面板
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：符号面板 */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>符号面板</span>
                  <Badge variant="secondary">LaTeX</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* 分类标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(SYMBOL_CATEGORIES).map(([key, category]) => (
                    <Button
                      key={key}
                      variant={activeCategory === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(key)}
                      className="text-xs"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* 符号网格 */}
                <div className="grid grid-cols-3 gap-2">
                  {SYMBOL_CATEGORIES[activeCategory]?.symbols.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-12 text-lg font-mono hover:bg-blue-50"
                      onClick={() => insertSymbol(item.latex)}
                      title={`${item.description} - ${item.latex}`}
                    >
                      {item.symbol}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 预设模板 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>公式模板</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {FORMULA_TEMPLATES.map((template, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => setLatexCode(template.latex)}
                    >
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500 font-mono truncate">
                          {template.latex}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中间：编辑器和预览 */}
          <div className="lg:col-span-2">
            {/* 工具栏 */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Button onClick={saveToHistory} size="sm">
                保存到历史
              </Button>
              <Button onClick={copyToClipboard} size="sm" variant="outline">
                <Copy className="w-4 h-4 mr-1" />
                复制代码
              </Button>
              <Button onClick={exportAsImage} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-1" />
                导出图片
              </Button>
              <Button onClick={clearEditor} size="sm" variant="outline">
                <Trash2 className="w-4 h-4 mr-1" />
                清空
              </Button>
            </div>

            {/* LaTeX 代码编辑器 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>LaTeX 代码编辑器</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={latexCode}
                  onChange={(e) => setLatexCode(e.target.value)}
                  placeholder="输入 LaTeX 代码，例如: E = mc^2"
                  className="font-mono text-sm min-h-[120px] resize-none"
                  spellCheck={false}
                />
                {renderError && (
                  <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    渲染错误: {renderError}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 公式预览 */}
            <Card>
              <CardHeader>
                <CardTitle>实时预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  {isKatexLoaded ? (
                    <div
                      className="text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: formulaResult.html
                      }}
                    />
                  ) : (
                    <div className="text-gray-500 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      正在加载 KaTeX...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 历史记录 */}
            {history.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>历史记录</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {history.map((formula, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => loadFromHistory(formula)}
                      >
                        <div className="font-mono text-xs truncate">
                          {formula}
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 使用说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">基本操作</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 点击左侧符号面板插入 LaTeX 代码</li>
                  <li>• 在编辑器中直接输入 LaTeX 语法</li>
                  <li>• 使用预设模板快速开始</li>
                  <li>• 保存常用公式到历史记录</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">常用语法</h4>
                <ul className="space-y-1 text-gray-600 font-mono text-xs">
                  <li>• 分数: \frac{'{分子}'}{'{分母}'}</li>
                  <li>• 上标: x^{'{指数}'}</li>
                  <li>• 下标: x_{'{下标}'}</li>
                  <li>• 根号: \sqrt{'{内容}'}</li>
                  <li>• 积分: \int_{'{下限}'}^{'{上限}'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 扩展 Window 接口以包含 katex
declare global {
  interface Window {
    katex: any;
  }
}