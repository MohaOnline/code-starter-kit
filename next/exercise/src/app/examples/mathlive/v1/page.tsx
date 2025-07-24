'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// MathLive 类型声明
interface MathfieldElement extends HTMLElement {
  value: string;
  getValue(format?: 'latex' | 'ascii-math' | 'spoken' | 'mathml'): string;
  setValue(value: string, options?: { insertionMode?: 'replaceSelection' | 'replaceAll' | 'insertBefore' | 'insertAfter' }): void;
  executeCommand(command: string | string[]): boolean;
  select(): void;
  clearSelection(): void;
  expression?: {
    evaluate(): { latex: string; value?: number };
  };
  focus(): void;
  blur(): void;
  hasFocus(): boolean;
  insert(s: string, options?: any): boolean;
  keystroke(keys: string): boolean;
}

// 扩展 JSX 类型
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        value?: string;
        onInput?: (event: Event) => void;
        onChange?: (event: Event) => void;
        onFocus?: (event: FocusEvent) => void;
        onBlur?: (event: FocusEvent) => void;
        readonly?: boolean;
        disabled?: boolean;
        ref?: React.Ref<MathfieldElement>;
      };
    }
  }
}

// MathLive 数学公式编辑器组件
// 使用 MathLive 库提供交互式数学公式输入功能
// 支持 LaTeX 语法、虚拟键盘、实时渲染等特性

export default function MathLivePage() {
  const mathfieldRef = useRef<MathfieldElement>(null);
  const [latexValue, setLatexValue] = useState('f(x) = x^2 + 2x + 1');
  const [evaluatedResult, setEvaluatedResult] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // 示例公式列表
  const exampleFormulas = [
    { name: '二次函数', latex: 'f(x) = ax^2 + bx + c' },
    { name: '求根公式', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { name: '积分', latex: '\\int_a^b f(x) dx' },
    { name: '求和', latex: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}' },
    { name: '矩阵', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
    { name: '极限', latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0' },
    { name: '导数', latex: '\\frac{d}{dx}[f(x)] = f\'(x)' },
    { name: '三角函数', latex: '\\sin^2(x) + \\cos^2(x) = 1' }
  ];

  useEffect(() => {
    // 动态加载 MathLive 库
    // 从 CDN 加载 MathLive，避免 SSR 问题
    const loadMathLive = async () => {
      try {
        // 检查是否已经加载
        if (window.customElements && window.customElements.get('math-field')) {
          setIsLoaded(true);
          return;
        }

        // 尝试多个 CDN 源
        const cdnUrls = [
          'https://cdn.jsdelivr.net/npm/mathlive@0.106.0/dist/mathlive.min.js',
          'https://unpkg.com/mathlive@0.106.0/dist/mathlive.min.js',
          'https://cdn.skypack.dev/mathlive@0.106.0'
        ];

        let loaded = false;
        for (const url of cdnUrls) {
          if (loaded) break;
          
          try {
            const script = document.createElement('script');
            script.src = url;
            script.type = 'module';
            
            await new Promise((resolve, reject) => {
              script.onload = async () => {
                loaded = true;
                setIsLoaded(true);
                // 等待自定义元素定义完成
                if (typeof customElements !== 'undefined') {
                  await customElements.whenDefined('math-field');
                }
                resolve(true);
              };
              script.onerror = reject;
              document.head.appendChild(script);
            });
            
            break;
          } catch (error) {
            console.warn(`Failed to load from ${url}:`, error);
            continue;
          }
        }
        
        if (!loaded) {
          throw new Error('All CDN sources failed');
        }
      } catch (error) {
        console.error('Error loading MathLive:', error);
      }
    };

    loadMathLive();
  }, []);

  // 设置事件监听器
  useEffect(() => {
    if (isLoaded && mathfieldRef.current) {
      const mathfield = mathfieldRef.current;
      mathfield.addEventListener('input', handleMathInput);
      
      return () => {
        mathfield.removeEventListener('input', handleMathInput);
      };
    }
  }, [isLoaded]);

  // 处理数学输入变化
  const handleMathInput = (event: Event) => {
    const target = event.target as MathfieldElement;
    if (target) {
      const newValue = target.getValue();
      setLatexValue(newValue);
      
      // 尝试计算表达式
      try {
        if (target.expression) {
          const result = target.expression.evaluate();
          setEvaluatedResult(result.latex || '');
        }
      } catch (error) {
        setEvaluatedResult('无法计算');
      }
    }
  };

  // 设置示例公式
  const setExampleFormula = (latex: string) => {
    if (mathfieldRef.current) {
      mathfieldRef.current.setValue(latex);
      setLatexValue(latex);
    }
  };

  // 清空输入
  const clearInput = () => {
    if (mathfieldRef.current) {
      mathfieldRef.current.setValue('');
      setLatexValue('');
      setEvaluatedResult('');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">MathLive 数学公式编辑器</h1>
          <p className="text-muted-foreground">
            一个强大的 Web 数学公式输入组件，支持 LaTeX 语法和实时渲染
          </p>
        </div>

        {/* 主要功能区域 */}
        <Card>
          <CardHeader>
            <CardTitle>数学公式输入</CardTitle>
            <CardDescription>
              在下方输入框中输入数学公式，支持 LaTeX 语法。可以使用键盘输入或点击虚拟键盘。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 数学输入框 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">数学公式输入框：</label>
              {isLoaded ? (
                <math-field
                  ref={mathfieldRef}
                  className="w-full p-3 border border-input rounded-md bg-background text-lg min-h-[60px] focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{
                    fontSize: '18px',
                    padding: '12px',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    backgroundColor: 'hsl(var(--background))'
                  }}
                >
                  {latexValue}
                </math-field>
              ) : (
                <div className="w-full p-3 border border-input rounded-md bg-muted text-center text-muted-foreground">
                  正在加载 MathLive...
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <Button onClick={clearInput} variant="outline">
                清空
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 输出显示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LaTeX 代码显示 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">LaTeX 代码</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                {latexValue || '暂无输入'}
              </div>
            </CardContent>
          </Card>

          {/* 计算结果显示 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">计算结果</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-muted rounded-md font-mono text-sm">
                {evaluatedResult || '暂无结果'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 示例公式 */}
        <Card>
          <CardHeader>
            <CardTitle>示例公式</CardTitle>
            <CardDescription>
              点击下方的示例公式快速体验不同类型的数学表达式
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {exampleFormulas.map((formula, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-center space-y-1"
                  onClick={() => setExampleFormula(formula.latex)}
                >
                  <Badge variant="secondary" className="text-xs">
                    {formula.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono break-all">
                    {formula.latex.length > 20 
                      ? formula.latex.substring(0, 20) + '...' 
                      : formula.latex
                    }
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* 功能说明 */}
        <Card>
          <CardHeader>
            <CardTitle>功能特性</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">输入方式</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 键盘直接输入 LaTeX 语法</li>
                  <li>• 虚拟数学键盘（点击输入框激活）</li>
                  <li>• 支持常用数学符号和函数</li>
                  <li>• 实时预览和渲染</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">支持的数学元素</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 分数、根号、指数</li>
                  <li>• 积分、求和、极限</li>
                  <li>• 矩阵和向量</li>
                  <li>• 三角函数和对数</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 技术信息 */}
        <Card>
          <CardHeader>
            <CardTitle>技术信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>库版本：</strong> MathLive (最新版本)</p>
              <p><strong>加载方式：</strong> CDN 动态导入</p>
              <p><strong>框架：</strong> Next.js 15 + React + TypeScript</p>
              <p><strong>样式：</strong> Tailwind CSS + shadcn/ui</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}