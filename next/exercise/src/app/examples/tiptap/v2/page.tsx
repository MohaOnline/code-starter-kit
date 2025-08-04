// "use client";
//
// import TiptapEditor from './components/TiptapEditor';
// import {useState} from 'react';
//
// export default function TiptapExample() {
//   const [initialContent, setInitialContent] = useState('');
//   const [savedContent, setSavedContent] = useState('');
//
//   const handleSave = (content: string) => {
//     setSavedContent(content);
//   };
//
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">自定义 Span 属性的 Tiptap 编辑器</h1>
//       <p className="mb-6 text-gray-600">可以编辑段落中的文本及其属性，支持 data-speaker、aria-label 和 data-voice-id 属性</p>
//
//       <div className="mb-8">
//         <TiptapEditor initialContent={initialContent} onSave={handleSave}/>
//       </div>
//
//       {savedContent && (
//         <div className="border rounded-md p-4 bg-gray-50">
//           <h2 className="text-lg font-semibold mb-2">保存的内容</h2>
//           <div className="bg-white p-4 rounded border">
//             <div dangerouslySetInnerHTML={{__html: savedContent}}/>
//           </div>
//           <pre className="mt-4 bg-gray-100 p-3 rounded text-sm overflow-auto max-h-[200px]">
//             {savedContent}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }
