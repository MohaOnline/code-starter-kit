// "use client";
//
// import { Editor } from '@tiptap/react';
//
// interface ToolbarProps {
//   editor: Editor;
//   onEditSpanAttributes: () => void;
//   onCreateNewSpan: () => void;
// }
//
// export default function Toolbar({ editor, onEditSpanAttributes, onCreateNewSpan }: ToolbarProps) {
//   if (!editor) {
//     return null;
//   }
//
//   const isSpanActive = editor.isActive('customSpan');
//
//   return (
//     <div className="border-b p-2 bg-gray-50 flex flex-wrap gap-1">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
//         title="粗体"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
//           <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
//           <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
//         </svg>
//       </button>
//
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
//         title="斜体"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
//           <line x1="19" y1="4" x2="10" y2="4"></line>
//           <line x1="14" y1="20" x2="5" y2="20"></line>
//           <line x1="15" y1="4" x2="9" y2="20"></line>
//         </svg>
//       </button>
//
//       <div className="border-r mx-1"></div>
//
//       <button
//         onClick={() => editor.chain().focus().setParagraph().run()}
//         className={`p-2 rounded ${editor.isActive('paragraph') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
//         title="段落"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
//           <path d="M13 4v16"></path>
//           <path d="M19 4v16"></path>
//           <path d="M5 4h10"></path>
//           <path d="M5 10h10"></path>
//           <path d="M5 16h10"></path>
//         </svg>
//       </button>
//
//       <div className="border-r mx-1"></div>
//
//       <button
//         onClick={onCreateNewSpan}
//         className="p-2 rounded hover:bg-gray-100"
//         title="创建新的Span"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
//           <path d="M12 5v14"></path>
//           <path d="M5 12h14"></path>
//         </svg>
//       </button>
//
//       <button
//         onClick={onEditSpanAttributes}
//         disabled={!isSpanActive}
//         className={`p-2 rounded ${!isSpanActive ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//         title="编辑Span属性"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
//           <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//           <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//         </svg>
//       </button>
//     </div>
//   );
// }
