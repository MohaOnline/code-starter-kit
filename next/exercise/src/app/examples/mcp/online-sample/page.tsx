'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MathRenderer from './components/MathRenderer';
import FormulaBuilder from './components/FormulaBuilder';

// 数学公式编辑器组件
// 参考 Mathcha 编辑器功能: https://www.mathcha.io/documentation/
// 支持文本模式、内联数学公式和数学容器
interface MathBlock {
  id: string;
  type: 'text' | 'inline-math' | 'math-container';
  content: string;
  latex?: string;
}

// LaTeX 符号映射表
const LATEX_SYMBOLS = {
  // 基础运算符
  '+': '+',
  '-': '-',
  '*': '\\cdot',
  '/': '\\div',
  '=': '=',
  
  // 希腊字母
  'alpha': '\\alpha',
  'beta': '\\beta',
  'gamma': '\\gamma',
  'delta': '\\delta',
  'theta': '\\theta',
  'pi': '\\pi',
  'sigma': '\\sigma',
  'omega': '\\omega',
  
  // 三角函数
  'sin': '\\sin',
  'cos': '\\cos',
  'tan': '\\tan',
  'cot': '\\cot',
  'sec': '\\sec',
  'csc': '\\csc',
  
  // 分数和根号
  'frac': '\\frac{a}{b}',
  'sqrt': '\\sqrt{x}',
  'cbrt': '\\sqrt[3]{x}',
  
  // 上下标
  'sup': 'x^{n}',
  'sub': 'x_{n}',
  
  // 积分和求和
  'int': '\\int',
  'sum': '\\sum',
  'prod': '\\prod',
  'lim': '\\lim',
};

// 工具栏按钮组件
function ToolbarButton({ 
  symbol, 
  latex, 
  onClick, 
  children 
}: { 
  symbol: string; 
  latex: string; 
  onClick: (latex: string) => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onClick(latex)}
      className="h-8 px-2 text-xs"
      title={`插入 ${symbol}`}
    >
      {children}
    </Button>
  );
}



// 主编辑器组件
export default function MathFormulaEditor() {
  const [blocks, setBlocks] = useState<MathBlock[]>([
    { id: '1', type: 'text', content: '数学公式编辑器示例' }
  ]);
  const [activeBlockId, setActiveBlockId] = useState<string>('1');
  const [currentInput, setCurrentInput] = useState<string>('');
  const [mode, setMode] = useState<'text' | 'math'>('text');
  const [builderFormula, setBuilderFormula] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // 添加新块
  const addBlock = (type: MathBlock['type']) => {
    const newBlock: MathBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      latex: type !== 'text' ? '' : undefined
    };
    setBlocks(prev => [...prev, newBlock]);
    setActiveBlockId(newBlock.id);
    setCurrentInput('');
  };
  
  // 更新当前块内容
  const updateCurrentBlock = (content: string, latex?: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === activeBlockId 
        ? { ...block, content, latex }
        : block
    ));
    setCurrentInput(content);
  };
  
  // 插入 LaTeX 符号
  const insertLatex = (latexCode: string) => {
    const newContent = currentInput + latexCode;
    updateCurrentBlock(newContent, newContent);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // 切换模式
  const toggleMode = () => {
    setMode(prev => prev === 'text' ? 'math' : 'text');
  };
  
  // 获取当前活动块
  const activeBlock = blocks.find(block => block.id === activeBlockId);
  
  useEffect(() => {
    if (activeBlock) {
      setCurrentInput(activeBlock.content);
    }
  }, [activeBlock]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              数学公式可视化编辑器
              <Badge variant="secondary">仿 Mathcha</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600">
              支持文本模式、内联数学公式 ($...$) 和数学容器，参考 
              <a href="https://www.mathcha.io/documentation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Mathcha 文档
              </a>
            </p>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder">可视化构建器</TabsTrigger>
            <TabsTrigger value="latex">LaTeX 编辑器</TabsTrigger>
            <TabsTrigger value="examples">示例公式</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="mt-6">
            <FormulaBuilder onFormulaChange={setBuilderFormula} />
          </TabsContent>
          
          <TabsContent value="latex" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 工具栏 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">工具栏</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 模式切换 */}
              <div>
                <h4 className="font-medium mb-2">编辑模式</h4>
                <div className="flex gap-2">
                  <Button 
                    variant={mode === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMode('text')}
                  >
                    文本模式
                  </Button>
                  <Button 
                    variant={mode === 'math' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMode('math')}
                  >
                    数学模式
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              {/* 块类型 */}
              <div>
                <h4 className="font-medium mb-2">插入块</h4>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addBlock('text')}
                  >
                    文本块
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addBlock('inline-math')}
                  >
                    内联数学 ($...$)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addBlock('math-container')}
                  >
                    数学容器
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              {/* 数学符号 */}
              {mode === 'math' && (
                <div>
                  <h4 className="font-medium mb-2">数学符号</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {/* 基础运算 */}
                    <ToolbarButton symbol="分数" latex="\\frac{}{} " onClick={insertLatex}>
                      a/b
                    </ToolbarButton>
                    <ToolbarButton symbol="根号" latex="\\sqrt{} " onClick={insertLatex}>
                      √
                    </ToolbarButton>
                    <ToolbarButton symbol="上标" latex="^{} " onClick={insertLatex}>
                      x^n
                    </ToolbarButton>
                    <ToolbarButton symbol="下标" latex="_{} " onClick={insertLatex}>
                      x_n
                    </ToolbarButton>
                    
                    {/* 希腊字母 */}
                    <ToolbarButton symbol="π" latex="\\pi " onClick={insertLatex}>
                      π
                    </ToolbarButton>
                    <ToolbarButton symbol="θ" latex="\\theta " onClick={insertLatex}>
                      θ
                    </ToolbarButton>
                    <ToolbarButton symbol="α" latex="\\alpha " onClick={insertLatex}>
                      α
                    </ToolbarButton>
                    <ToolbarButton symbol="β" latex="\\beta " onClick={insertLatex}>
                      β
                    </ToolbarButton>
                    
                    {/* 三角函数 */}
                    <ToolbarButton symbol="sin" latex="\\sin " onClick={insertLatex}>
                      sin
                    </ToolbarButton>
                    <ToolbarButton symbol="cos" latex="\\cos " onClick={insertLatex}>
                      cos
                    </ToolbarButton>
                    <ToolbarButton symbol="tan" latex="\\tan " onClick={insertLatex}>
                      tan
                    </ToolbarButton>
                    <ToolbarButton symbol="cot" latex="\\cot " onClick={insertLatex}>
                      cot
                    </ToolbarButton>
                    
                    {/* 运算符 */}
                    <ToolbarButton symbol="乘" latex="\\cdot " onClick={insertLatex}>
                      ⋅
                    </ToolbarButton>
                    <ToolbarButton symbol="除" latex="\\div " onClick={insertLatex}>
                      ÷
                    </ToolbarButton>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 编辑区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">编辑器</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    当前输入 ({activeBlock?.type || 'text'})
                  </label>
                  <textarea
                    ref={inputRef}
                    value={currentInput}
                    onChange={(e) => updateCurrentBlock(e.target.value, e.target.value)}
                    className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                    placeholder={mode === 'math' ? '输入 LaTeX 代码...' : '输入文本内容...'}
                  />
                </div>
                
                {/* 实时预览 */}
                {activeBlock?.type !== 'text' && currentInput && (
                  <div>
                    <label className="block text-sm font-medium mb-2">实时预览</label>
                    <div className="p-3 border rounded-md bg-white min-h-[60px] flex items-center">
                      <MathRenderer 
                        latex={currentInput} 
                        inline={activeBlock?.type === 'inline-math'}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* 预览区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">文档预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {blocks.map((block) => (
                  <div 
                    key={block.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      block.id === activeBlockId 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveBlockId(block.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {block.type}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setBlocks(prev => prev.filter(b => b.id !== block.id));
                        }}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                    
                    {block.type === 'text' ? (
                      <div className="text-sm">{block.content || '空文本块'}</div>
                    ) : (
                      <div className="text-sm">
                        {block.content ? (
                          <MathRenderer 
                            latex={block.content} 
                            inline={block.type === 'inline-math'}
                          />
                        ) : (
                          <span className="text-gray-400">空数学块</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="mt-6">
            <div className="space-y-6">
              {/* 示例公式集合 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">经典数学公式示例</CardTitle>
                  <p className="text-sm text-gray-600">
                    这些示例展示了复杂的数学公式渲染效果，可以作为学习参考
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3 text-blue-700">复杂三角函数公式</h4>
                      <div className="p-6 bg-white border rounded-lg shadow-sm">
                        <MathRenderer 
                          latex="\\frac{\\sin(\\theta - 5\\pi)}{\\tan(3\\pi-\\theta)} \\cdot \\frac{\\cot(\\frac{\\pi}{2} - \\theta)}{\\tan(\\theta - \\frac{3\\pi}{2})} \\cdot \\frac{\\cos(8\\pi - \\theta)}{\\cos(\\theta + \\frac{\\pi}{2})}"
                        />
                      </div>
                      <details className="mt-3">
                        <summary className="text-sm font-medium cursor-pointer text-gray-700 hover:text-gray-900">
                          查看 LaTeX 代码
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono overflow-x-auto">
{`\\frac{\\sin(\\theta - 5\\pi)}{\\tan(3\\pi-\\theta)} \\cdot \\frac{\\cot(\\frac{\\pi}{2} - \\theta)}{\\tan(\\theta - \\frac{3\\pi}{2})} \\cdot \\frac{\\cos(8\\pi - \\theta)}{\\cos(\\theta + \\frac{\\pi}{2})}`}
                        </pre>
                      </details>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3 text-blue-700">二次公式</h4>
                      <div className="p-6 bg-white border rounded-lg shadow-sm">
                        <MathRenderer 
                          latex="x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}"
                        />
                      </div>
                      <details className="mt-3">
                        <summary className="text-sm font-medium cursor-pointer text-gray-700 hover:text-gray-900">
                          查看 LaTeX 代码
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono">
{`x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}`}
                        </pre>
                      </details>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3 text-blue-700">欧拉公式</h4>
                      <div className="p-6 bg-white border rounded-lg shadow-sm">
                        <MathRenderer 
                          latex="e^{i\\pi} + 1 = 0"
                        />
                      </div>
                      <details className="mt-3">
                        <summary className="text-sm font-medium cursor-pointer text-gray-700 hover:text-gray-900">
                          查看 LaTeX 代码
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono">
{`e^{i\\pi} + 1 = 0`}
                        </pre>
                      </details>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3 text-blue-700">积分公式</h4>
                      <div className="p-6 bg-white border rounded-lg shadow-sm">
                        <MathRenderer 
                          latex="\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"
                        />
                      </div>
                      <details className="mt-3">
                        <summary className="text-sm font-medium cursor-pointer text-gray-700 hover:text-gray-900">
                          查看 LaTeX 代码
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono">
{`\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}`}
                        </pre>
                      </details>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3 text-blue-700">矩阵表示</h4>
                      <div className="p-6 bg-white border rounded-lg shadow-sm">
                        <MathRenderer 
                          latex="\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}"
                        />
                      </div>
                      <details className="mt-3">
                        <summary className="text-sm font-medium cursor-pointer text-gray-700 hover:text-gray-900">
                          查看 LaTeX 代码
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono">
{`\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}`}
                        </pre>
                      </details>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 使用说明 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">使用说明</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">可视化构建器</h5>
                      <p className="text-gray-600">
                        通过点击工具栏中的结构元素和数学符号，可以可视化地构建数学公式。支持分数、根号、上下标等复杂结构。
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">LaTeX 编辑器</h5>
                      <p className="text-gray-600">
                        直接输入 LaTeX 代码来创建数学公式。支持实时预览和多种数学符号。
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">支持的功能</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>分数 (\frac{'{a}'}{'{b}'})</li>
                        <li>根号 (\sqrt{'{x}'})</li>
                        <li>上标和下标 (x^{'{n}'}, x_{'{n}'})</li>
                        <li>希腊字母 (\\alpha, \\beta, \\pi, \\theta)</li>
                        <li>三角函数 (\\sin, \\cos, \\tan)</li>
                        <li>运算符 (\\cdot, \\div, \\pm)</li>
                        <li>积分和求和符号</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}