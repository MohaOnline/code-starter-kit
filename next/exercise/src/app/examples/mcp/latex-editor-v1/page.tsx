// 'use client';
//
// import React, { useState, useEffect, useRef } from 'react';
//
// // 自定义元素类型定义
// interface CustomElement extends HTMLElement {
//   textContent: string;
// }
//
// // 声明自定义元素类型，避免 TypeScript 错误
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'editor-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'math-type': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'hidden-input-wrapper': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'math-edit-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'editarea': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'area-baseline': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'area-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'line': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'prefix': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'blocks': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'baselineblock': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'block': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'emptyblock': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'compositeblock': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'editarea-block': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'editarea-line': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'fraction-symbol': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'sqrt-symbol': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'sqrt-top': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'sqrt-edit': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'sqrt-symbol-line': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'integral-like-symbol': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'symbol': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'power-index-symbol-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'middle-base': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'matrix-symbol': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'base-line-indicator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'matrix': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       'inline': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//     }
//   }
// }
//
// /**
//  * LaTeX 编辑器 v1 - 基于自定义 <editarea> 元素的实现
//  *
//  * 这个组件模拟了原始 editable-area.html 中的自定义元素结构：
//  * - 使用自定义 HTML 元素如 <editarea>、<block>、<compositeblock>
//  * - 实现了数学公式的可视化编辑
//  * - 支持分数、根号、积分、矩阵等数学符号
//  * - 采用隐藏输入框系统进行输入处理
//  *
//  * 技术特点：
//  * - 自定义元素渲染：使用 React 的 JSX.IntrinsicElements 扩展支持自定义元素
//  * - 事件代理：通过隐藏输入框处理键盘输入
//  * - 精确控制：每个数学符号都有独立的编辑区域
//  * - 复杂布局：支持多层嵌套的数学结构
//  *
//  * 参考文档：
//  * - React Custom Elements: https://react.dev/reference/react-dom/components#custom-html-elements
//  * - MathML: https://developer.mozilla.org/en-US/docs/Web/MathML
//  */
// export default function LatexEditorV1() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentBlock, setCurrentBlock] = useState<string>('');
//   const hiddenInputRef = useRef<HTMLInputElement>(null);
//   const editorRef = useRef<HTMLDivElement>(null);
//
//   // 处理编辑器点击事件
//   const handleEditorClick = (e: React.MouseEvent) => {
//     const target = e.target as CustomElement;
//     if (target.tagName === 'BLOCK' || target.tagName === 'EDITAREA-BLOCK') {
//       setIsEditing(true);
//       setCurrentBlock(target.textContent || '');
//       // 聚焦到隐藏输入框
//       if (hiddenInputRef.current) {
//         hiddenInputRef.current.focus();
//       }
//     }
//   };
//
//   // 处理隐藏输入框的输入
//   const handleHiddenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setCurrentBlock(value);
//     // 这里可以添加实时更新编辑器内容的逻辑
//   };
//
//   // 处理键盘事件
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       setIsEditing(false);
//       if (hiddenInputRef.current) {
//         hiddenInputRef.current.blur();
//       }
//     }
//   };
//
//   useEffect(() => {
//     // 注册自定义元素（如果需要的话）
//     // 这里可以添加自定义元素的定义和行为
//   }, []);
//
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           LaTeX 编辑器 v1 - 自定义元素实现
//         </h1>
//
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             技术说明
//           </h2>
//           <div className="text-sm text-gray-600 space-y-2">
//             <p>• 基于原始 editable-area.html 的自定义元素结构</p>
//             <p>• 使用 &lt;editarea&gt;、&lt;block&gt;、&lt;compositeblock&gt; 等自定义元素</p>
//             <p>• 隐藏输入框系统处理用户输入</p>
//             <p>• 支持复杂的数学公式可视化编辑</p>
//           </div>
//         </div>
//
//         {/* 隐藏输入框系统 */}
//         <hidden-input-wrapper
//           style={{
//             position: 'absolute',
//             top: '-9999px',
//             left: '-9999px'
//           }}
//         >
//           <input
//             ref={hiddenInputRef}
//             type="text"
//             value={currentBlock}
//             onChange={handleHiddenInput}
//             onKeyDown={handleKeyDown}
//             autoCorrect="off"
//             autoCapitalize="off"
//             style={{ opacity: 0 }}
//           />
//         </hidden-input-wrapper>
//
//         {/* 主编辑器容器 */}
//         <editor-container
//           style={{ display: 'inline-block' }}
//           onClick={handleEditorClick}
//           ref={editorRef}
//         >
//           <math-type
//             aria-label="Editor Content"
//             className="math-type-no-print paragraph-mark enabled primary"
//             tabIndex={-1}
//             style={{
//               padding: '15px 20px 20px',
//               width: '100%',
//               minHeight: '400px',
//               border: '2px solid #e5e7eb',
//               borderRadius: '8px',
//               backgroundColor: '#ffffff'
//             }}
//           >
//             <div className="mt-sa"></div>
//
//             <math-edit-container>
//               <editarea
//                 className="root-editor"
//                 style={{
//                   fontFamily: 'Arial, Helvetica, sans-serif',
//                   fontSize: '15px'
//                 }}
//               >
//                 <area-baseline aria-hidden="true">a</area-baseline>
//
//                 <area-container>
//                   {/* 标题行 */}
//                   <line
//                     className="root text-mode align-center"
//                     style={{ lineHeight: '1.4' }}
//                   >
//                     <prefix></prefix>
//                     <blocks>
//                       <baselineblock className="inline"></baselineblock>
//                       <block
//                         style={{
//                           fontSize: '1.2em',
//                           fontWeight: 'bold',
//                           cursor: 'text',
//                           padding: '2px 4px',
//                           borderRadius: '3px'
//                         }}
//                         className="hover:bg-blue-100"
//                       >
//                         强大的数学公式编辑器
//                       </block>
//                     </blocks>
//                   </line>
//
//                   {/* 副标题行 */}
//                   <line
//                     className="root text-mode align-center"
//                     style={{ lineHeight: '1.4' }}
//                   >
//                     <prefix></prefix>
//                     <blocks>
//                       <baselineblock className="inline"></baselineblock>
//                       <block
//                         style={{
//                           textDecoration: 'underline',
//                           fontSize: '0.8em',
//                           cursor: 'text',
//                           padding: '2px 4px',
//                           borderRadius: '3px'
//                         }}
//                         className="hover:bg-blue-100"
//                       >
//                         基于自定义元素的实现方式
//                       </block>
//                     </blocks>
//                   </line>
//
//                   {/* 空行 */}
//                   <line
//                     className="root text-mode align-center"
//                     style={{ lineHeight: '1.4' }}
//                   >
//                     <prefix></prefix>
//                     <blocks>
//                       <baselineblock className="inline"></baselineblock>
//                       <emptyblock aria-label="empty line"> </emptyblock>
//                     </blocks>
//                   </line>
//
//                   {/* 内联数学公式示例 */}
//                   <line
//                     className="root text-mode align-center"
//                     style={{ lineHeight: '1.4' }}
//                   >
//                     <prefix></prefix>
//                     <blocks>
//                       <baselineblock className="inline"></baselineblock>
//                       <block
//                         style={{ cursor: 'text', padding: '2px 4px' }}
//                         className="hover:bg-blue-100"
//                       >
//                         输入数学公式：
//                       </block>
//
//                       {/* 内联数学容器 */}
//                       <compositeblock
//                         dir="ltr"
//                         className="math-container-symbol role-mathmode-area inline"
//                         style={{
//                           fontSize: '17px',
//                           border: '1px dashed #cbd5e1',
//                           padding: '4px 8px',
//                           margin: '0 4px',
//                           borderRadius: '4px',
//                           backgroundColor: '#f8fafc'
//                         }}
//                       >
//                         <editarea
//                           className="math-mode-font lazyable no-area-container"
//                           style={{ fontFamily: 'Asana-Math, Asana' }}
//                         >
//                           <line className="" style={{ lineHeight: '1.2' }}>
//                             <baselineblock></baselineblock>
//                             <block
//                               className="Normal hover:bg-yellow-100"
//                               style={{ cursor: 'text', padding: '1px 2px' }}
//                             >
//                               E
//                             </block>
//                             <block
//                               className="Relation hover:bg-yellow-100"
//                               style={{ cursor: 'text', padding: '1px 2px' }}
//                             >
//                               =
//                             </block>
//                             <block
//                               className="Normal hover:bg-yellow-100"
//                               style={{ cursor: 'text', padding: '1px 2px' }}
//                             >
//                               mc
//                             </block>
//
//                             {/* 上标 */}
//                             <compositeblock
//                               dir="ltr"
//                               className="power-index-symbol-container"
//                             >
//                               <middle-base>
//                                 <inline></inline>
//                               </middle-base>
//                               <editarea-block
//                                 className="index-value hover:bg-yellow-100"
//                                 style={{
//                                   lineHeight: '1.2',
//                                   marginTop: '-0.747899em',
//                                   cursor: 'text',
//                                   padding: '1px 2px',
//                                   fontSize: '0.8em'
//                                 }}
//                               >
//                                 2
//                               </editarea-block>
//                             </compositeblock>
//                           </line>
//                         </editarea>
//                       </compositeblock>
//                     </blocks>
//                   </line>
//
//                   {/* 分数示例 */}
//                   <line
//                     className="root text-mode full-line-block-inside"
//                     style={{ lineHeight: '1.4' }}
//                   >
//                     <prefix></prefix>
//                     <blocks>
//                       <baselineblock className="inline"></baselineblock>
//
//                       <compositeblock
//                         dir="ltr"
//                         className="math-container-symbol role-mathmode-area display"
//                         style={{
//                           fontSize: '17px',
//                           border: '1px dashed #cbd5e1',
//                           padding: '12px',
//                           margin: '8px 0',
//                           borderRadius: '8px',
//                           backgroundColor: '#f8fafc',
//                           display: 'block',
//                           textAlign: 'center'
//                         }}
//                       >
//                         <editarea
//                           className="math-mode-font lazyable no-area-container"
//                           style={{ fontFamily: 'Asana-Math, Asana' }}
//                         >
//                           <line className="taggable" style={{ lineHeight: '1.2' }}>
//                             <baselineblock></baselineblock>
//
//                             {/* 分数 */}
//                             <compositeblock
//                               dir="ltr"
//                               className="fraction-symbol smaller"
//                               style={{
//                                 display: 'inline-block',
//                                 border: '1px solid #e5e7eb',
//                                 borderRadius: '4px',
//                                 padding: '4px',
//                                 margin: '0 4px',
//                                 backgroundColor: '#ffffff'
//                               }}
//                             >
//                               {/* 分子 */}
//                               <editarea-line
//                                 className="frac-edit-area enumerator hover:bg-yellow-100"
//                                 style={{
//                                   marginTop: '-0.235294em',
//                                   lineHeight: '1.2',
//                                   marginBottom: '-0.470588em',
//                                   textAlign: 'center',
//                                   cursor: 'text',
//                                   padding: '2px 4px'
//                                 }}
//                               >
//                                 <baselineblock></baselineblock>
//                                 <block className="Normal">a + b</block>
//                               </editarea-line>
//
//                               {/* 分数线 */}
//                               <div className="frac-line">
//                                 <inline style={{
//                                   borderBottom: '1px solid #374151',
//                                   display: 'block',
//                                   margin: '2px 0'
//                                 }}></inline>
//                               </div>
//
//                               {/* 分母 */}
//                               <editarea-line
//                                 className="frac-edit-area denominator hover:bg-yellow-100"
//                                 style={{
//                                   marginBottom: '-0.176471em',
//                                   lineHeight: '1.2',
//                                   marginTop: '-0.411765em',
//                                   textAlign: 'center',
//                                   cursor: 'text',
//                                   padding: '2px 4px'
//                                 }}
//                               >
//                                 <baselineblock></baselineblock>
//                                 <block className="Normal">c + d</block>
//                               </editarea-line>
//                             </compositeblock>
//
//                             <block
//                               className="Binary hover:bg-yellow-100"
//                               style={{ cursor: 'text', padding: '2px 4px' }}
//                             >
//                               +
//                             </block>
//
//                             {/* 根号 */}
//                             <compositeblock
//                               dir="ltr"
//                               className="sqrt-symbol"
//                               style={{
//                                 paddingTop: '0.235294em',
//                                 display: 'inline-block',
//                                 border: '1px solid #e5e7eb',
//                                 borderRadius: '4px',
//                                 padding: '4px',
//                                 margin: '0 4px',
//                                 backgroundColor: '#ffffff'
//                               }}
//                             >
//                               <sqrt-top style={{ marginRight: '-0.660294em', minWidth: '0.660294em' }}>
//                                 <editarea className="no-area-container">
//                                   <line
//                                     className=""
//                                     style={{ marginBottom: '-0.168067em', lineHeight: '1.2' }}
//                                   >
//                                     <baselineblock></baselineblock>
//                                     <block
//                                       className="hover:bg-yellow-100"
//                                       style={{ cursor: 'text', padding: '1px 2px', fontSize: '0.8em' }}
//                                     >
//                                       3
//                                     </block>
//                                   </line>
//                                 </editarea>
//                               </sqrt-top>
//
//                               <sqrt-edit>
//                                 <editarea-line
//                                   className="edit-area hover:bg-yellow-100"
//                                   style={{
//                                     lineHeight: '1.2',
//                                     marginTop: '0.117647em',
//                                     cursor: 'text',
//                                     padding: '2px 4px'
//                                   }}
//                                 >
//                                   <baselineblock></baselineblock>
//                                   <block className="Normal">x + y</block>
//                                 </editarea-line>
//
//                                 <sqrt-symbol-line>
//                                   <svg style={{ stroke: 'none', width: '100%', height: '20px' }}>
//                                     <polygon
//                                       points="0.35,10.29 4.79,7.92 9.66,18.24 16.36,0.00 50.56,0.00 50.56,1.05 17.09,1.05 9.18,22.59 3.10,9.85 0.64,10.77"
//                                       fill="#374151"
//                                     >
//                                     </polygon>
//                                   </svg>
//                                 </sqrt-symbol-line>
//                               </sqrt-edit>
//                             </compositeblock>
//                           </line>
//                         </editarea>
//                       </compositeblock>
//                     </blocks>
//                   </line>
//
//                   {/* 说明文字 */}
//                   <line
//                     className="root text-mode align-center"
//                     style={{ lineHeight: '1.4' }}
//                   >
//                     <prefix></prefix>
//                     <blocks>
//                       <baselineblock className="inline"></baselineblock>
//                       <block
//                         style={{
//                           fontSize: '0.9em',
//                           color: '#6b7280',
//                           cursor: 'text',
//                           padding: '2px 4px'
//                         }}
//                         className="hover:bg-blue-100"
//                       >
//                         点击任意数学元素进行编辑
//                       </block>
//                     </blocks>
//                   </line>
//                 </area-container>
//               </editarea>
//             </math-edit-container>
//           </math-type>
//         </editor-container>
//
//         {/* 调试信息 */}
//         {isEditing && (
//           <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <h3 className="text-lg font-semibold text-blue-800 mb-2">编辑模式</h3>
//             <p className="text-blue-700">
//               当前编辑内容: <span className="font-mono bg-white px-2 py-1 rounded">{currentBlock}</span>
//             </p>
//             <p className="text-sm text-blue-600 mt-2">
//               按 Enter 键完成编辑
//             </p>
//           </div>
//         )}
//
//         {/* 功能说明 */}
//         <div className="mt-8 bg-gray-100 rounded-lg p-6">
//           <h3 className="text-lg font-semibold mb-4 text-gray-800">实现特点</h3>
//           <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
//             <div>
//               <h4 className="font-medium text-gray-700 mb-2">自定义元素</h4>
//               <ul className="space-y-1">
//                 <li>• &lt;editarea&gt; - 主编辑区域</li>
//                 <li>• &lt;block&gt; - 基本文本块</li>
//                 <li>• &lt;compositeblock&gt; - 复合数学结构</li>
//                 <li>• &lt;editarea-block&gt; - 可编辑数学块</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-700 mb-2">编辑机制</h4>
//               <ul className="space-y-1">
//                 <li>• 隐藏输入框处理键盘输入</li>
//                 <li>• 点击激活编辑模式</li>
//                 <li>• 实时视觉反馈</li>
//                 <li>• 精确的光标定位</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }