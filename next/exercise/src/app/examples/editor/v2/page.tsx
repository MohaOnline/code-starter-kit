'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// MathJax 配置
const MATHJAX_CONFIG = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  },
  svg: {
    fontCache: 'global'
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
  }
};

/**
 * Mathcha 风格的所见即所得公式编辑器演示
 * 
 * 核心架构：
 * 1. MathJax 3 (SVG 输出) - 负责 LaTeX 渲染
 * 2. 透明 textarea - 处理键盘输入和光标管理
 * 3. Range API - 实现点击定位功能
 * 
 * 参考文档：https://docs.mathjax.org/en/latest/web/configuration.html
 */
export default function MathchaEditorDemo() {
  const [latex, setLatex] = useState('x^2 + y^2 = z^2'); // LaTeX 源码
  const [cursorPosition, setCursorPosition] = useState(0); // 光标位置
  const [debugInfo, setDebugInfo] = useState<{x: number, y: number, pos: number} | null>(null); // 调试信息
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mathContainerRef = useRef<HTMLDivElement>(null);
  const [mathJaxLoaded, setMathJaxLoaded] = useState(false);

  // 动态加载 MathJax
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.MathJax) {
      // 配置 MathJax
      window.MathJax = MATHJAX_CONFIG;
      
      // 加载 MathJax 脚本
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
      script.async = true;
      script.onload = () => {
        setMathJaxLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.MathJax) {
      setMathJaxLoaded(true);
    }
  }, []);

  // 重新渲染数学公式
  const renderMath = async () => {
    if (!mathJaxLoaded || !window.MathJax || !mathContainerRef.current) return;
    
    try {
      // 清除之前的渲染结果
      mathContainerRef.current.innerHTML = `$$${latex}$$`;
      
      // 重新排版
      await window.MathJax.typesetPromise([mathContainerRef.current]);
    } catch (error) {
      console.error('MathJax 渲染错误:', error);
      // 显示错误信息
      if (mathContainerRef.current) {
        mathContainerRef.current.innerHTML = `<span style="color: red;">LaTeX 语法错误: ${latex}</span>`;
      }
    }
  };

  // 当 LaTeX 内容或 MathJax 加载状态变化时重新渲染
  useEffect(() => {
    renderMath();
  }, [latex, mathJaxLoaded]);

  // 处理 textarea 输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newCursorPos = e.target.selectionStart || 0;
    
    setLatex(newValue);
    setCursorPosition(newCursorPos);
  };

  // 处理光标位置变化
  const handleSelectionChange = () => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart || 0);
    }
  };

  // 处理数学公式区域点击（精确点击定位功能）
  const handleMathClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!textareaRef.current || !mathContainerRef.current) return;
    
    // 获取点击位置相对于数学公式容器的坐标
    const rect = mathContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // 计算点击位置对应的字符索引
    const estimatedPosition = estimateCharacterPosition(clickX, clickY, latex);
    
    // 更新调试信息
    setDebugInfo({ x: Math.round(clickX), y: Math.round(clickY), pos: estimatedPosition });
    
    // 设置 textarea 光标位置
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(estimatedPosition, estimatedPosition);
    setCursorPosition(estimatedPosition);
  };
  
  /**
    * 根据点击坐标估算对应的 LaTeX 字符位置
    * 
    * 改进的算法考虑了不同字符的宽度差异和数学符号的特殊性
    * 真正的 Mathcha 会使用 MathJax 的 getBBox() 和 getCharacterData() API
    * 
    * @param clickX 点击的 X 坐标（相对于容器）
    * @param clickY 点击的 Y 坐标（相对于容器）
    * @param latexText 当前的 LaTeX 文本
    * @returns 估算的字符位置索引
    */
   const estimateCharacterPosition = (clickX: number, clickY: number, latexText: string): number => {
     // 容器内边距（与 CSS 中的 p-4 对应）
     const paddingLeft = 16;
     const paddingTop = 16;
     
     // 调整点击坐标
     const adjustedX = Math.max(0, clickX - paddingLeft);
     const adjustedY = Math.max(0, clickY - paddingTop);
     
     // 如果点击在边距区域，返回对应的边界位置
     if (adjustedX <= 0) return 0;
     if (adjustedY <= 0) return 0;
     
     // 基于字符类型的宽度估算
     const getCharWidth = (char: string, index: number): number => {
       // 特殊 LaTeX 命令的宽度估算
       if (char === '\\' && index < latexText.length - 1) {
         const nextChar = latexText[index + 1];
         if (nextChar === '\\') return 8; // 换行符
         // 常见命令的宽度
         const commands = {
           'f': 20, 'i': 15, 's': 20, 'l': 15, // \frac, \int, \sum, \lim
           'b': 25, 'e': 25, // \begin, \end
         };
         return commands[nextChar as keyof typeof commands] || 12;
       }
       
       // 数字和字母
       if (/[a-zA-Z0-9]/.test(char)) return 10;
       // 运算符
       if (/[+\-=<>]/.test(char)) return 12;
       // 括号
       if (/[()\[\]{}]/.test(char)) return 8;
       // 上下标符号
       if (/[^_]/.test(char)) return 6;
       // 空格
       if (char === ' ') return 6;
       // 其他字符
       return 10;
     };
     
     // 逐字符累计宽度，找到最接近点击位置的字符
     let currentX = 0;
     let bestPosition = 0;
     let minDistance = Infinity;
     
     for (let i = 0; i <= latexText.length; i++) {
       const distance = Math.abs(currentX - adjustedX);
       if (distance < minDistance) {
         minDistance = distance;
         bestPosition = i;
       }
       
       if (i < latexText.length) {
         currentX += getCharWidth(latexText[i], i);
       }
     }
     
     return bestPosition;
   };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mathcha 风格公式编辑器演示</h1>
        <p className="text-muted-foreground">
          基于 MathJax 3 + 透明 textarea + Range API 的所见即所得数学公式编辑器
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 编辑器区域 */}
        <Card>
          <CardHeader>
            <CardTitle>公式编辑器</CardTitle>
            <CardDescription>
              在下方输入 LaTeX 代码，实时预览渲染结果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* 透明的 textarea 输入层 */}
              <textarea
                ref={textareaRef}
                value={latex}
                onChange={handleInputChange}
                onSelect={handleSelectionChange}
                onKeyUp={handleSelectionChange}
                onClick={handleSelectionChange}
                className="w-full h-32 p-3 border rounded-md font-mono text-sm resize-none"
                placeholder="输入 LaTeX 公式，例如：x^2 + y^2 = z^2"
                spellCheck={false}
              />
              
              {/* 光标位置指示器 */}
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                <div>光标位置: {cursorPosition} / {latex.length}</div>
                {debugInfo && (
                  <div className="text-blue-600">
                    点击坐标: ({debugInfo.x}, {debugInfo.y}) → 字符位置: {debugInfo.pos}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 渲染预览区域 */}
        <Card>
          <CardHeader>
            <CardTitle>实时预览</CardTitle>
            <CardDescription>
              MathJax SVG 渲染结果（点击任意位置精确定位光标到对应的 LaTeX 字符）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              ref={mathContainerRef}
              onClick={handleMathClick}
              className="min-h-32 p-4 border rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              style={{ fontSize: '18px' }}
            >
              {!mathJaxLoaded ? (
                <div className="text-center text-muted-foreground">
                  正在加载 MathJax...
                </div>
              ) : (
                <div>点击此处查看渲染结果</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 示例公式 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>示例公式</CardTitle>
          <CardDescription>
            点击下方公式可快速插入到编辑器中
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: '二次方程', latex: 'ax^2 + bx + c = 0' },
              { name: '勾股定理', latex: 'a^2 + b^2 = c^2' },
              { name: '积分', latex: '\\int_{a}^{b} f(x) dx' },
              { name: '求和', latex: '\\sum_{i=1}^{n} x_i' },
              { name: '矩阵', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
              { name: '分数', latex: '\\frac{a}{b} + \\frac{c}{d}' }
            ].map((example) => (
              <button
                key={example.name}
                onClick={() => setLatex(example.latex)}
                className="p-3 text-left border rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">{example.name}</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  {example.latex}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 技术说明 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>技术架构说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">🎨 渲染引擎</h4>
              <p>使用 MathJax 3 的 SVG 输出模式，将 LaTeX 直接渲染为高质量的 SVG 图形</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⌨️ 输入处理</h4>
              <p>透明的 textarea 负责捕获所有键盘事件、输入法和复制粘贴操作</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 精确光标定位</h4>
              <p>改进的点击定位算法：根据字符类型估算宽度，逐字符累计距离，找到最接近点击位置的字符索引。支持实时调试信息显示。</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 实时同步</h4>
              <p>每次输入变化都会触发 MathJax 重新渲染，实现所见即所得的编辑体验</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 扩展 Window 接口以支持 MathJax
declare global {
  interface Window {
    MathJax: any;
  }
}