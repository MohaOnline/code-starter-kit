'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

/**
 * 数学公式编辑器示例页面
 * 基于 MathQuill 库实现的数学公式编辑器
 * 
 * 技术背景：
 * - MathQuill 是一个用于在网页中编辑数学公式的 JavaScript 库
 * - 它提供了类似 LaTeX 的输入体验，支持实时预览和编辑
 * - 该库广泛用于在线教育平台和数学相关的 Web 应用
 * 
 * 参考文档：
 * - MathQuill 官方文档: http://mathquill.com/
 * - API 文档: https://github.com/mathquill/mathquill
 */
export default function MathEditorPage() {
  const mathFieldRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // 确保脚本加载完成后再初始化
    const initMathEditor = () => {
      if (typeof window !== 'undefined' && 
          (window as any).MQ && 
          mathFieldRef.current && 
          !isInitialized.current) {
        
        const MQ = (window as any).MQ;
        
        // 初始化 MathQuill 编辑器
        // MathField 是 MathQuill 的核心组件，用于创建可编辑的数学公式输入框
        const mathField = MQ.MathField(mathFieldRef.current, {
          spaceBehavesLikeTab: true, // 空格键行为类似 Tab 键
          leftRightIntoCmdGoes: 'up', // 左右箭头键进入命令的行为
          restrictMismatchedBrackets: true, // 限制不匹配的括号
          sumStartsWithNEquals: true, // 求和符号以 n= 开始
          supSubsRequireOperand: true, // 上下标需要操作数
          charsThatBreakOutOfSupSub: '+-=<>', // 跳出上下标的字符
          autoSubscriptNumerals: true, // 自动下标数字
          autoCommands: 'pi theta sqrt sum prod alpha beta gamma delta epsilon zeta eta mu nu xi rho sigma tau phi chi psi omega', // 自动命令
          autoOperatorNames: 'sin cos tan sec csc cot sinh cosh tanh log ln exp lim max min', // 自动操作符名称
        });

        // 设置初始内容（可选）
        mathField.latex('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');
        
        // 监听内容变化
        mathField.config({
          handlers: {
            edit: function() {
              console.log('LaTeX:', mathField.latex());
            }
          }
        });
        
        isInitialized.current = true;
      }
    };

    // 延迟初始化，确保所有资源都已加载
    const timer = setTimeout(initMathEditor, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* 加载 jQuery - MathQuill 的依赖 */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy="beforeInteractive"
      />
      
      {/* 加载 MathQuill CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css"
      />
      
      {/* 加载 MathQuill JS */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js"
        strategy="afterInteractive"
      />

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            数学公式编辑器示例
          </h1>
          <p className="text-gray-600 mb-8">
            基于 MathQuill 库的数学公式编辑器，支持 LaTeX 语法输入
          </p>

          <div className="space-y-6">
            {/* 主要的数学编辑器区域 */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                数学公式编辑器：
              </label>
              <div 
                ref={mathFieldRef}
                id="math-field"
                className="min-h-[60px] p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{
                  fontSize: '18px',
                  fontFamily: 'Times New Roman, serif'
                }}
              />
            </div>

            {/* 使用说明 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                使用说明：
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• 直接输入数字和字母</li>
                <li>• 使用 ^ 输入上标，_ 输入下标</li>
                <li>• 输入 \sqrt 创建根号</li>
                <li>• 输入 \frac 创建分数</li>
                <li>• 输入 \sum、\int 等创建求和、积分符号</li>
                <li>• 使用方向键在公式中导航</li>
                <li>• 支持希腊字母：\alpha、\beta、\gamma 等</li>
              </ul>
            </div>

            {/* 示例公式 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                示例公式：
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>二次公式：</strong><br />
                  <code>x = \frac{'{-b \pm \sqrt{b^2 - 4ac}}'}{'{2a}'}</code>
                </div>
                <div>
                  <strong>积分：</strong><br />
                  <code>\int_0^\infty e^{'{-x^2}'} dx</code>
                </div>
                <div>
                  <strong>求和：</strong><br />
                  <code>\sum_{'{n=1}'}^\infty \frac{'{1}'}{'{n^2}'}</code>
                </div>
                <div>
                  <strong>矩阵：</strong><br />
                  <code>\begin{'{pmatrix}'} a & b \\\\ c & d \end{'{pmatrix}'}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 类型声明扩展
 * 为 window 对象添加 MQ (MathQuill) 属性的类型声明
 */
declare global {
  interface Window {
    MQ: any;
  }
}