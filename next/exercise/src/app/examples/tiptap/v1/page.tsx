// 'use client';
//
// import {useState, useCallback, useEffect} from 'react';
// import {useEditor, EditorContent} from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import {Node, mergeAttributes} from '@tiptap/core';
// import {Button} from '@/components/ui/button';
// import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
// import {Input} from '@/components/ui/input';
// import {Label} from '@/components/ui/label';
// import {Textarea} from '@/components/ui/textarea';
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
// import {escapeQuotes, unescapeQuotes, generateUUID} from './utils';
//
// // 自定义 Span 扩展
// const CustomSpan = Node.create({
//   name: 'customSpan',
//
//   addOptions() {
//     return {
//       HTMLAttributes: {},
//     };
//   },
//
//   inline: true,
//
//   group: 'inline',
//
//   content: 'text*',
//
//   addAttributes() {
//     return {
//       'data-speaker':  {
//         default:    '',
//         parseHTML:  element => element.getAttribute('data-speaker') || '',
//         renderHTML: attributes => {
//           if (!attributes['data-speaker']) return {};
//           return {'data-speaker': attributes['data-speaker']};
//         },
//       },
//       'aria-label':    {
//         default:    '',
//         parseHTML:  element => {
//           // 解析时处理转义的双引号
//           const ariaLabel = element.getAttribute('aria-label') || '';
//           return unescapeQuotes(ariaLabel);
//         },
//         renderHTML: attributes => {
//           if (!attributes['aria-label']) return {};
//           // 渲染时对双引号进行转义
//           return {'aria-label': escapeQuotes(attributes['aria-label'])};
//         },
//       },
//       'data-voice-id': {
//         default:    '',
//         parseHTML:  element => element.getAttribute('data-voice-id') || '',
//         renderHTML: attributes => {
//           if (!attributes['data-voice-id']) return {};
//           return {'data-voice-id': attributes['data-voice-id']};
//         },
//       },
//     };
//   },
//
//   parseHTML() {
//     return [
//       {
//         tag: 'span[data-speaker], span[aria-label], span[data-voice-id]',
//       },
//     ];
//   },
//
//   renderHTML({node, HTMLAttributes}) {
//     return [
//       'span',
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       0,
//     ];
//   },
//
//   addCommands() {
//     return {
//       setCustomSpan:    (attributes) => ({commands}) => {
//         return commands.setNode(this.name, attributes);
//       },
//       toggleCustomSpan: (attributes) => ({commands}) => {
//         return commands.toggleNode(this.name, 'paragraph', attributes);
//       },
//       updateCustomSpan: (attributes) => ({commands, tr}) => {
//         // 更新选中节点的属性
//         if (tr.selection) {
//           return commands.updateAttributes(this.name, attributes);
//         }
//         return false;
//       },
//     };
//   },
// });
//
// // 自定义容器扩展（支持 div 和 p）
// const CustomContainer = Node.create({
//   name: 'customContainer',
//
//   addOptions() {
//     return {
//       HTMLAttributes: {},
//     };
//   },
//
//   // 修改内容规则，允许包含 customSpan、paragraph 和其他内联元素
//   content: 'inline*',
//
//   group:  'block',
//   inline: false,
//
//   addAttributes() {
//     return {
//       tag: {
//         default:    'div',
//         parseHTML:  element => element.tagName.toLowerCase(),
//         renderHTML: attributes => ({tag: attributes.tag}),
//       },
//     };
//   },
//
//   parseHTML() {
//     return [
//       {tag: 'div'},
//       {tag: 'p'},
//     ];
//   },
//
//   renderHTML({node, HTMLAttributes}) {
//     const tag = node.attrs.tag || 'div';
//     return [tag, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
//   },
// });
//
// interface SpanAttributes {
//   'data-speaker': string;
//   'aria-label': string;
//   'data-voice-id': string;
// }
//
// /**
//  * TipTap 自定义编辑器组件
//  * 支持编辑带有自定义属性的 span 元素
//  */
// export default function TipTapCustomEditor() {
//   const [note, setNote] = useState<{ id: string, title: string, body: string } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [htmlContent, setHtmlContent] = useState('');
//
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentSpanAttributes, setCurrentSpanAttributes] = useState<SpanAttributes>({
//     'data-speaker':  '',
//     'aria-label':    '',
//     'data-voice-id': '',
//   });
//   const [selectedContainerTag, setSelectedContainerTag] = useState<'div' | 'p'>('div');
//
//   // 初始化编辑器
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         // 禁用默认的 paragraph，使用自定义容器
//         paragraph: false,
//       }),
//       CustomSpan,
//       CustomContainer,
//     ],
//     content:    note?.body || '<p>加载中...</p>',
//     onUpdate:   ({editor}) => {
//       const html = editor.getHTML();
//       setHtmlContent(html);
//       setNote(prev => prev ? {...prev, body: html} : null);
//     },
//     // 防止 SSR 渲染问题和水合不匹配
//     immediatelyRender: false,
//   });
//
//   // 加载初始内容
//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/examples/tiptap/note');
//         const data = await response.json();
//         setNote(data);
//         setHtmlContent(data.body || '');
//         editor?.commands.setContent(data.body || '');
//       } catch (error) {
//         console.error('加载笔记时出错:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchNote();
//   }, [editor]);
//
//   // 保存内容到后台
//   const handleSave = useCallback(async () => {
//     if (!editor || !note) return;
//
//     try {
//       setLoading(true);
//       const response = await fetch('/api/examples/tiptap/note', {
//         method:  'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body:    JSON.stringify({id: note.id, body: htmlContent}),
//       });
//
//       if (!response.ok) {
//         throw new Error('保存笔记失败');
//       }
//
//       const updatedNote = await response.json();
//       setNote(updatedNote);
//       alert('内容已保存！');
//     } catch (error) {
//       console.error('保存笔记时出错:', error);
//       alert('保存失败，请重试。');
//     } finally {
//       setLoading(false);
//     }
//   }, [editor, note, htmlContent]);
//
//   // 添加新的 span
//   const handleAddSpan = useCallback(() => {
//     if (!editor) return;
//
//     // 创建一个新的 span 元素
//     const text = window.prompt('请输入文本内容:', '新的文本') || '新的文本';
//
//     const attributes = {
//       'data-speaker':  '',
//       'aria-label':    text,
//       'data-voice-id': generateUUID(),
//     };
//
//     // 先创建一个文本节点，再将其转换为自定义 span
//     editor.chain().focus().insertContent({
//       type: 'text',
//       text: text
//     }).run();
//
//     editor.chain().focus().setCustomSpan(attributes).run();
//   }, [editor]);
//
//   // 添加新的容器
//   const handleAddContainer = useCallback(() => {
//     if (!editor) return;
//
//     const text = window.prompt('请输入文本内容:', '新的容器内容') || '新的容器内容';
//     const voiceId = generateUUID();
//
//     // 创建自定义容器和 span
//     editor.chain().focus().insertContent({
//       type:    'customContainer',
//       attrs:   {tag: selectedContainerTag},
//       content: [{
//         type:    'customSpan',
//         attrs:   {
//           'data-speaker':  '',
//           'aria-label':    text,
//           'data-voice-id': voiceId,
//         },
//         content: [{type: 'text', text: text}],
//       }],
//     }).run();
//   }, [editor, selectedContainerTag]);
//
//   // 编辑当前选中的 span 属性
//   const handleEditCurrentSpan = useCallback(() => {
//     if (!editor) return;
//
//     const {selection} = editor.state;
//     const node = editor.state.doc.nodeAt(selection.from);
//
//     if (node && node.type.name === 'customSpan') {
//       // 找到了 customSpan 节点，获取其属性
//       setCurrentSpanAttributes({
//         'data-speaker':  node.attrs['data-speaker'] || '',
//         'aria-label':    node.attrs['aria-label'] || '',
//         'data-voice-id': node.attrs['data-voice-id'] || '',
//       });
//       setIsDialogOpen(true);
//     } else {
//       // 尝试向上查找父节点
//       let found = false;
//       editor.state.doc.nodesBetween(selection.from, selection.to, (node) => {
//         if (found) return false;
//         if (node.type.name === 'customSpan') {
//           setCurrentSpanAttributes({
//             'data-speaker':  node.attrs['data-speaker'] || '',
//             'aria-label':    node.attrs['aria-label'] || '',
//             'data-voice-id': node.attrs['data-voice-id'] || '',
//           });
//           found = true;
//           setIsDialogOpen(true);
//           return false;
//         }
//         return true;
//       });
//
//       if (!found) {
//         alert('请选择一个带有自定义属性的 span 元素');
//       }
//     }
//   }, [editor]);
//
//   // 更新当前 span 的属性
//   const handleUpdateSpan = useCallback(() => {
//     if (!editor) return;
//
//     const attributes = {
//       'data-speaker':  currentSpanAttributes['data-speaker'],
//       'aria-label':    currentSpanAttributes['aria-label'],
//       'data-voice-id': currentSpanAttributes['data-voice-id'],
//     };
//
//     editor.chain().focus().updateCustomSpan(attributes).run();
//     setIsDialogOpen(false);
//   }, [editor, currentSpanAttributes]);
//
//   if (!editor) {
//     return <div className="p-8 text-center">加载编辑器中...</div>;
//   }
//
//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6 text-center">TipTap 自定义 Span 属性编辑器</h1>
//
//       {/* 工具栏 */}
//       <div className="mb-4 flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
//         <Button
//           onClick={handleEditCurrentSpan}
//           variant="outline"
//           size="sm"
//         >
//           编辑选中 Span
//         </Button>
//
//         <Button
//           onClick={handleAddSpan}
//           variant="outline"
//           size="sm"
//         >
//           添加 Span
//         </Button>
//
//         <div className="flex items-center gap-2">
//           <Select value={selectedContainerTag} onValueChange={(value: 'div' | 'p') => setSelectedContainerTag(value)}>
//             <SelectTrigger className="w-24">
//               <SelectValue/>
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="div">div</SelectItem>
//               <SelectItem value="p">p</SelectItem>
//             </SelectContent>
//           </Select>
//
//           <Button
//             onClick={handleAddContainer}
//             variant="outline"
//             size="sm"
//           >
//             添加容器
//           </Button>
//         </div>
//
//         <Button
//           onClick={handleSave}
//           variant="default"
//           size="sm"
//           disabled={loading}
//         >
//           {loading ? '保存中...' : '保存内容'}
//         </Button>
//       </div>
//
//       {/* 编辑器 */}
//       <div className="border rounded-lg p-4 min-h-48 bg-white">
//         <EditorContent
//           editor={editor}
//           className="prose max-w-none focus:outline-none min-h-36"
//         />
//       </div>
//
//       {/* HTML 预览 */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-2">HTML 预览:</h3>
//         <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap break-all max-h-64 overflow-y-auto">
//           <code>{htmlContent}</code>
//         </pre>
//       </div>
//
//       {/* 编辑 Span 属性的对话框 */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>编辑 Span 属性</DialogTitle>
//           </DialogHeader>
//
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="data-speaker">data-speaker</Label>
//               <Input
//                 id="data-speaker"
//                 value={currentSpanAttributes['data-speaker']}
//                 onChange={(e) =>
//                   setCurrentSpanAttributes(prev => ({
//                     ...prev,
//                     'data-speaker': e.target.value
//                   }))
//                 }
//                 placeholder="说话者标识"
//               />
//             </div>
//
//             <div className="space-y-2">
//               <Label htmlFor="aria-label">aria-label</Label>
//               <Textarea
//                 id="aria-label"
//                 value={currentSpanAttributes['aria-label']}
//                 onChange={(e) =>
//                   setCurrentSpanAttributes(prev => ({
//                     ...prev,
//                     'aria-label': e.target.value
//                   }))
//                 }
//                 placeholder="无障碍标签文本"
//                 rows={3}
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 注意: 双引号(")将自动进行转义处理
//               </p>
//             </div>
//
//             <div className="space-y-2">
//               <Label htmlFor="data-voice-id">data-voice-id</Label>
//               <Input
//                 id="data-voice-id"
//                 value={currentSpanAttributes['data-voice-id']}
//                 onChange={(e) =>
//                   setCurrentSpanAttributes(prev => ({
//                     ...prev,
//                     'data-voice-id': e.target.value
//                   }))
//                 }
//                 placeholder="语音ID"
//               />
//             </div>
//
//             <div className="flex justify-end space-x-2 pt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => setIsDialogOpen(false)}
//               >
//                 取消
//               </Button>
//               <Button onClick={handleUpdateSpan}>
//                 更新属性
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
