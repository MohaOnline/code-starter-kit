// 'use client';
//
// import React, { useState, useRef, useEffect } from 'react';
// import type { MathfieldElement } from 'mathlive';
//
// // 扩展 JSX 类型以支持 math-field 元素
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'math-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
//         value?: string;
//         onInput?: (event: Event) => void;
//         'virtual-keyboard-mode'?: string;
//         'smart-fence'?: string;
//         'smart-superscript'?: string;
//         'fonts-directory'?: string;
//         ref?: React.Ref<MathfieldElement>;
//       };
//     }
//   }
// }
//
// // MathLive React 集成示例页面
// // 使用 mathlive 原生 Web Component 实现
// // 支持受控组件模式，实现实时的数学公式编辑和预览
// export default function MathLiveReactExample() {
//   // 使用 useState 管理 LaTeX 公式状态
//   const [latex, setLatex] = useState('f(x) = \\frac{x^2 + 2x + 1}{x - 1}');
//
//   // 存储原生 Mathfield 对象的引用，用于直接操作
//   const mathfieldRef = useRef<MathfieldElement | null>(null);
//
//
//
//   // 动态加载 MathLive 库
//   useEffect(() => {
//     const loadMathLive = async () => {
//       // 检查是否已经加载过
//       if (typeof window !== 'undefined' && window.customElements && window.customElements.get('math-field')) {
//         return;
//       }
//
//       try {
//         // 在导入前设置全局配置
//         if (typeof window !== 'undefined') {
//           // 设置全局变量，MathLive 可能会检查这些
//           (window as any).ML_FONTS_DIRECTORY = '/fonts';
//           (window as any).MATHLIVE_FONTS_DIRECTORY = '/fonts';
//         }
//
//         // 动态导入 mathlive 模块
//         const mathlive = await import('mathlive');
//         const { MathfieldElement } = mathlive;
//
//         // 尝试使用 CDN 字体（空字符串表示使用 CDN）
//         MathfieldElement.fontsDirectory = '';
//
//         // 如果有默认导出，也设置
//         if (mathlive.default && typeof mathlive.default === 'object') {
//           (mathlive.default as any).fontsDirectory = '';
//         }
//
//         // 确保 Web Component 已注册
//         if (!window.customElements.get('math-field')) {
//           window.customElements.define('math-field', MathfieldElement);
//         }
//
//         console.log('MathLive loaded successfully');
//         console.log('Fonts directory:', MathfieldElement.fontsDirectory);
//       } catch (error) {
//         console.error('Failed to load MathLive:', error);
//       }
//     };
//
//     loadMathLive();
//   }, []);
//
//   // 预设的示例公式
//   const exampleFormulas = [
//     {
//       name: '二次公式',
//       latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'
//     },
//     {
//       name: '欧拉公式',
//       latex: 'e^{i\\pi} + 1 = 0'
//     },
//     {
//       name: '积分',
//       latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}'
//     },
//     {
//       name: '矩阵',
//       latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}'
//     },
//     {
//       name: '求和',
//       latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}'
//     }
//   ];
//
//   // 处理公式变化的回调函数
//   const handleLatexChange = (newLatex: string) => {
//     setLatex(newLatex);
//   };
//
//   // 设置示例公式
//   const setExampleFormula = (formula: string) => {
//     setLatex(formula);
//   };
//
//   // 清空公式
//   const clearFormula = () => {
//     setLatex('');
//   };
//
//   // 获取原生 Mathfield 对象的引用
//   const handleMathfieldRef = (mf: MathfieldElement | null) => {
//     mathfieldRef.current = mf;
//   };
//
//   // 执行原生 Mathfield 命令示例
//   const executeCommand = (command: string) => {
//     if (mathfieldRef.current) {
//       mathfieldRef.current.executeCommand(command);
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* 页面标题 */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             MathLive React 集成示例
//           </h1>
//           <p className="text-gray-600 text-lg">
//             使用 MathLive 原生 Web Component 实现的交互式数学公式编辑器
//           </p>
//         </div>
//
//         {/* 主要内容区域 */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
//           {/* 数学输入区域 */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               数学公式编辑器
//             </h2>
//             <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
//               <math-field
//                 ref={(el: MathfieldElement) => {
//                   if (el) {
//                     mathfieldRef.current = el;
//                     el.value = latex;
//                     el.addEventListener('input', (event: any) => {
//                       setLatex(event.target.value);
//                     });
//
//                     // 配置 mathfield 基本属性
//                     el.setAttribute('virtual-keyboard-mode', 'onfocus');
//                     el.setAttribute('smart-fence', 'true');
//                     el.setAttribute('smart-superscript', 'true');
//                   }
//                 }}
//                 style={{
//                   fontSize: '18px',
//                   padding: '12px',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '8px',
//                   minHeight: '60px',
//                   backgroundColor: 'white',
//                   display: 'block',
//                   width: '100%'
//                 }}
//               />
//             </div>
//           </div>
//
//           {/* LaTeX 代码显示 */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               LaTeX 代码:
//             </h3>
//             <div className="bg-gray-100 border rounded-lg p-4 font-mono text-sm">
//               <code className="text-blue-600">{latex || '(空)'}</code>
//             </div>
//           </div>
//
//           {/* 操作按钮 */}
//           <div className="flex flex-wrap gap-3 mb-6">
//             <button
//               onClick={clearFormula}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//             >
//               清空公式
//             </button>
//             <button
//               onClick={() => executeCommand('selectAll')}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               全选
//             </button>
//             <button
//               onClick={() => executeCommand('undo')}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               撤销
//             </button>
//             <button
//               onClick={() => executeCommand('redo')}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               重做
//             </button>
//           </div>
//         </div>
//
//         {/* 示例公式区域 */}
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             示例公式
//           </h2>
//           <p className="text-gray-600 mb-4">
//             点击下面的按钮来加载预设的数学公式:
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {exampleFormulas.map((formula, index) => (
//               <button
//                 key={index}
//                 onClick={() => setExampleFormula(formula.latex)}
//                 className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
//               >
//                 <div className="font-semibold text-gray-800 mb-2">
//                   {formula.name}
//                 </div>
//                 <div className="text-sm text-gray-600 font-mono">
//                   {formula.latex.length > 40
//                     ? formula.latex.substring(0, 40) + '...'
//                     : formula.latex
//                   }
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//
//         {/* 技术说明 */}
//         <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
//           <h3 className="text-lg font-semibold text-blue-800 mb-3">
//             技术特性
//           </h3>
//           <ul className="text-blue-700 space-y-2">
//             <li>• 使用 <code className="bg-blue-100 px-2 py-1 rounded">react-mathlive</code> 库进行 React 集成</li>
//             <li>• 支持受控组件模式，实现状态管理</li>
//             <li>• 提供虚拟键盘支持，适配移动设备</li>
//             <li>• 内置智能快捷键和符号输入</li>
//             <li>• 可访问原生 MathfieldElement API</li>
//             <li>• 支持 LaTeX、MathML 等多种格式输出</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }