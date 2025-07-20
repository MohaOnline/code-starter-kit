'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MathRenderer from './MathRenderer';

// 可视化数学公式构建器
// 模拟 Mathcha 的拖拽式编辑和可视化构建功能
// 支持嵌套结构和实时预览

interface FormulaElement {
  id: string;
  type: 'text' | 'fraction' | 'sqrt' | 'superscript' | 'subscript' | 'function' | 'symbol' | 'bracket';
  content?: string;
  children?: FormulaElement[];
  placeholder?: string;
}

interface FormulaBuilderProps {
  onFormulaChange?: (latex: string) => void;
}

// 预定义的数学元素模板
const ELEMENT_TEMPLATES: Record<string, Partial<FormulaElement>> = {
  fraction: {
    type: 'fraction',
    children: [
      { id: 'num', type: 'text', placeholder: '分子', content: '' },
      { id: 'den', type: 'text', placeholder: '分母', content: '' }
    ]
  },
  sqrt: {
    type: 'sqrt',
    children: [
      { id: 'content', type: 'text', placeholder: '被开方数', content: '' }
    ]
  },
  superscript: {
    type: 'superscript',
    children: [
      { id: 'base', type: 'text', placeholder: '底数', content: '' },
      { id: 'exp', type: 'text', placeholder: '指数', content: '' }
    ]
  },
  subscript: {
    type: 'subscript',
    children: [
      { id: 'base', type: 'text', placeholder: '底数', content: '' },
      { id: 'sub', type: 'text', placeholder: '下标', content: '' }
    ]
  },
  function: {
    type: 'function',
    content: 'sin',
    children: [
      { id: 'arg', type: 'text', placeholder: '参数', content: '' }
    ]
  }
};

// 数学符号库
const MATH_SYMBOLS = {
  greek: {
    title: '希腊字母',
    symbols: [
      { symbol: 'α', latex: '\\alpha', name: 'alpha' },
      { symbol: 'β', latex: '\\beta', name: 'beta' },
      { symbol: 'γ', latex: '\\gamma', name: 'gamma' },
      { symbol: 'δ', latex: '\\delta', name: 'delta' },
      { symbol: 'θ', latex: '\\theta', name: 'theta' },
      { symbol: 'π', latex: '\\pi', name: 'pi' },
      { symbol: 'σ', latex: '\\sigma', name: 'sigma' },
      { symbol: 'ω', latex: '\\omega', name: 'omega' }
    ]
  },
  operators: {
    title: '运算符',
    symbols: [
      { symbol: '±', latex: '\\pm', name: 'plus-minus' },
      { symbol: '∓', latex: '\\mp', name: 'minus-plus' },
      { symbol: '×', latex: '\\times', name: 'times' },
      { symbol: '÷', latex: '\\div', name: 'divide' },
      { symbol: '⋅', latex: '\\cdot', name: 'cdot' },
      { symbol: '∞', latex: '\\infty', name: 'infinity' },
      { symbol: '∂', latex: '\\partial', name: 'partial' },
      { symbol: '∇', latex: '\\nabla', name: 'nabla' }
    ]
  },
  functions: {
    title: '函数',
    symbols: [
      { symbol: 'sin', latex: '\\sin', name: 'sine' },
      { symbol: 'cos', latex: '\\cos', name: 'cosine' },
      { symbol: 'tan', latex: '\\tan', name: 'tangent' },
      { symbol: 'cot', latex: '\\cot', name: 'cotangent' },
      { symbol: 'log', latex: '\\log', name: 'logarithm' },
      { symbol: 'ln', latex: '\\ln', name: 'natural-log' },
      { symbol: 'exp', latex: '\\exp', name: 'exponential' },
      { symbol: 'lim', latex: '\\lim', name: 'limit' }
    ]
  }
};

// 可编辑的数学元素组件
function EditableElement({ 
  element, 
  onUpdate, 
  onSelect, 
  isSelected 
}: {
  element: FormulaElement;
  onUpdate: (id: string, content: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}) {
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(element.id, e.target.value);
  };
  
  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return (
          <input
            type="text"
            value={element.content || ''}
            onChange={handleContentChange}
            placeholder={element.placeholder}
            className="border-none outline-none bg-transparent text-center min-w-[2em] max-w-[8em]"
            onClick={() => onSelect(element.id)}
          />
        );
        
      case 'fraction':
        const [numerator, denominator] = element.children || [];
        return (
          <div className="inline-block text-center mx-1">
            <div className="border-b border-black pb-1 mb-1">
              {numerator && (
                <EditableElement
                  element={numerator}
                  onUpdate={onUpdate}
                  onSelect={onSelect}
                  isSelected={false}
                />
              )}
            </div>
            <div className="pt-1">
              {denominator && (
                <EditableElement
                  element={denominator}
                  onUpdate={onUpdate}
                  onSelect={onSelect}
                  isSelected={false}
                />
              )}
            </div>
          </div>
        );
        
      case 'sqrt':
        const [sqrtContent] = element.children || [];
        return (
          <div className="inline-block mx-1">
            <span className="text-lg mr-1">√</span>
            <span className="border-t border-black pt-1">
              {sqrtContent && (
                <EditableElement
                  element={sqrtContent}
                  onUpdate={onUpdate}
                  onSelect={onSelect}
                  isSelected={false}
                />
              )}
            </span>
          </div>
        );
        
      case 'superscript':
        const [base, exponent] = element.children || [];
        return (
          <div className="inline-block mx-1">
            {base && (
              <EditableElement
                element={base}
                onUpdate={onUpdate}
                onSelect={onSelect}
                isSelected={false}
              />
            )}
            <sup className="text-sm">
              {exponent && (
                <EditableElement
                  element={exponent}
                  onUpdate={onUpdate}
                  onSelect={onSelect}
                  isSelected={false}
                />
              )}
            </sup>
          </div>
        );
        
      case 'subscript':
        const [subBase, subscript] = element.children || [];
        return (
          <div className="inline-block mx-1">
            {subBase && (
              <EditableElement
                element={subBase}
                onUpdate={onUpdate}
                onSelect={onSelect}
                isSelected={false}
              />
            )}
            <sub className="text-sm">
              {subscript && (
                <EditableElement
                  element={subscript}
                  onUpdate={onUpdate}
                  onSelect={onSelect}
                  isSelected={false}
                />
              )}
            </sub>
          </div>
        );
        
      case 'function':
        const [funcArg] = element.children || [];
        return (
          <div className="inline-block mx-1">
            <span className="font-normal mr-1">{element.content}</span>
            <span className="mx-1">(</span>
            {funcArg && (
              <EditableElement
                element={funcArg}
                onUpdate={onUpdate}
                onSelect={onSelect}
                isSelected={false}
              />
            )}
            <span className="mx-1">)</span>
          </div>
        );
        
      default:
        return <span>{element.content}</span>;
    }
  };
  
  return (
    <span 
      className={`inline-block ${isSelected ? 'bg-blue-100 border border-blue-300 rounded' : ''}`}
      onClick={() => onSelect(element.id)}
    >
      {renderElement()}
    </span>
  );
}

// 主构建器组件
export default function FormulaBuilder({ onFormulaChange }: FormulaBuilderProps) {
  const [elements, setElements] = useState<FormulaElement[]>([
    { id: '1', type: 'text', content: '', placeholder: '输入公式...' }
  ]);
  const [selectedElementId, setSelectedElementId] = useState<string>('1');
  const [generatedLatex, setGeneratedLatex] = useState<string>('');
  
  // 添加新元素
  const addElement = useCallback((templateKey: string) => {
    const template = ELEMENT_TEMPLATES[templateKey];
    if (!template) return;
    
    const newElement: FormulaElement = {
      id: Date.now().toString(),
      type: template.type!,
      ...template,
      children: template.children?.map((child, index) => ({
        ...child,
        id: `${Date.now()}-${index}`
      }))
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  }, []);
  
  // 插入符号
  const insertSymbol = useCallback((latex: string) => {
    const newElement: FormulaElement = {
      id: Date.now().toString(),
      type: 'text',
      content: latex
    };
    
    setElements(prev => [...prev, newElement]);
  }, []);
  
  // 更新元素内容
  const updateElement = useCallback((id: string, content: string) => {
    const updateElementRecursive = (elements: FormulaElement[]): FormulaElement[] => {
      return elements.map(element => {
        if (element.id === id) {
          return { ...element, content };
        }
        if (element.children) {
          return {
            ...element,
            children: updateElementRecursive(element.children)
          };
        }
        return element;
      });
    };
    
    setElements(prev => updateElementRecursive(prev));
  }, []);
  
  // 生成 LaTeX 代码
  const generateLatex = useCallback(() => {
    const elementToLatex = (element: FormulaElement): string => {
      switch (element.type) {
        case 'text':
          return element.content || '';
          
        case 'fraction':
          const [num, den] = element.children || [];
          return `\\frac{${num ? elementToLatex(num) : ''}}{${den ? elementToLatex(den) : ''}}`;
          
        case 'sqrt':
          const [content] = element.children || [];
          return `\\sqrt{${content ? elementToLatex(content) : ''}}`;
          
        case 'superscript':
          const [base, exp] = element.children || [];
          return `${base ? elementToLatex(base) : ''}^{${exp ? elementToLatex(exp) : ''}}`;
          
        case 'subscript':
          const [subBase, sub] = element.children || [];
          return `${subBase ? elementToLatex(subBase) : ''}_{${sub ? elementToLatex(sub) : ''}}`;
          
        case 'function':
          const [arg] = element.children || [];
          return `\\${element.content}(${arg ? elementToLatex(arg) : ''})`;
          
        case 'symbol':
          return element.content || '';
          
        default:
          return element.content || '';
      }
    };
    
    const latex = elements.map(elementToLatex).join(' ');
    setGeneratedLatex(latex);
    onFormulaChange?.(latex);
    return latex;
  }, [elements, onFormulaChange]);
  
  // 删除元素
  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
  }, []);
  
  // 清空所有元素
  const clearAll = useCallback(() => {
    setElements([{ id: Date.now().toString(), type: 'text', content: '', placeholder: '输入公式...' }]);
    setGeneratedLatex('');
  }, []);
  
  return (
    <div className="space-y-6">
      {/* 工具面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">公式构建工具</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 结构元素 */}
          <div>
            <h4 className="font-medium mb-2">结构元素</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addElement('fraction')}
                className="text-xs"
              >
                分数 a/b
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addElement('sqrt')}
                className="text-xs"
              >
                根号 √
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addElement('superscript')}
                className="text-xs"
              >
                上标 x^n
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addElement('subscript')}
                className="text-xs"
              >
                下标 x_n
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addElement('function')}
                className="text-xs"
              >
                函数 f(x)
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* 数学符号 */}
          {Object.entries(MATH_SYMBOLS).map(([key, category]) => (
            <div key={key}>
              <h4 className="font-medium mb-2">{category.title}</h4>
              <div className="flex flex-wrap gap-1">
                {category.symbols.map((symbol) => (
                  <Button
                    key={symbol.name}
                    variant="outline"
                    size="sm"
                    onClick={() => insertSymbol(symbol.latex)}
                    className="h-8 w-8 p-0 text-sm"
                    title={symbol.name}
                  >
                    {symbol.symbol}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          
          <Separator />
          
          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button onClick={generateLatex} size="sm">
              生成 LaTeX
            </Button>
            <Button onClick={clearAll} variant="outline" size="sm">
              清空
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* 可视化编辑区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">可视化编辑器</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[100px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <div className="text-lg leading-relaxed">
              {elements.map((element) => (
                <div key={element.id} className="inline-block relative group">
                  <EditableElement
                    element={element}
                    onUpdate={updateElement}
                    onSelect={setSelectedElementId}
                    isSelected={selectedElementId === element.id}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteElement(element.id)}
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full text-xs"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* LaTeX 代码和预览 */}
      {generatedLatex && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">LaTeX 代码和预览</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">LaTeX 代码</label>
              <div className="p-3 bg-gray-100 rounded-md font-mono text-sm">
                {generatedLatex}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">渲染预览</label>
              <div className="p-4 bg-white border rounded-md">
                <MathRenderer latex={generatedLatex} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}