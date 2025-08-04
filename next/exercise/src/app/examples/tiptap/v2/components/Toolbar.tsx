// import { Editor } from '@tiptap/react';
//
// interface ToolbarProps {
//   editor: Editor;
//   onEditSpanAttributes: () => void;
//   onCreateNewSpan: () => void;
//   onSave?: () => void;
// }
//
// export default function Toolbar({
//   editor,
//   onEditSpanAttributes,
//   onCreateNewSpan,
//   onSave
// }: ToolbarProps) {
//   if (!editor) {
//     return null;
//   }
//
//   return (
//     <div className="border-b p-2 flex flex-wrap gap-2 bg-gray-50">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//         className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//       >
//         加粗
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         disabled={!editor.can().chain().focus().toggleItalic().run()}
//         className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//       >
//         斜体
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setParagraph().run()}
//         className={`px-3 py-1 rounded ${editor.isActive('paragraph') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//       >
//         段落
//       </button>
//
//       <div className="border-l mx-2"></div>
//
//       <button
//         onClick={onCreateNewSpan}
//         className="px-3 py-1 rounded bg-green-500 text-white"
//       >
//         添加新 Span
//       </button>
//       <button
//         onClick={onEditSpanAttributes}
//         disabled={!editor.isActive('customSpan')}
//         className={`px-3 py-1 rounded ${editor.isActive('customSpan') ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
//       >
//         编辑 Span 属性
//       </button>
//
//       {onSave && (
//         <button
//           onClick={onSave}
//           className="px-3 py-1 rounded ml-auto bg-blue-600 text-white"
//         >
//           保存内容
//         </button>
//       )}
//     </div>
//   );
// }
