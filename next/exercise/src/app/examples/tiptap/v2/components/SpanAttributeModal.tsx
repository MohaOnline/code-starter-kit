// import { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
//
// interface SpanAttributeModalProps {
//   attributes: {
//     'aria-label': string;
//     'data-speaker': string;
//     'data-voice-id': string;
//   };
//   onSave: (attributes: any) => void;
//   onCancel: () => void;
// }
//
// export default function SpanAttributeModal({
//   attributes,
//   onSave,
//   onCancel
// }: SpanAttributeModalProps) {
//   const [ariaLabel, setAriaLabel] = useState(attributes['aria-label'] || '');
//   const [speaker, setSpeaker] = useState(attributes['data-speaker'] || '');
//   const [voiceId, setVoiceId] = useState(attributes['data-voice-id'] || '');
//
//   useEffect(() => {
//     // 当 attributes 变化时更新内部状态
//     setAriaLabel(attributes['aria-label'] || '');
//     setSpeaker(attributes['data-speaker'] || '');
//     setVoiceId(attributes['data-voice-id'] || '');
//   }, [attributes]);
//
//   const handleSave = () => {
//     onSave({
//       'aria-label': ariaLabel,
//       'data-speaker': speaker,
//       'data-voice-id': voiceId || uuidv4()
//     });
//   };
//
//   // 阻止冒泡以防止点击模态框内部导致模态框关闭
//   const stopPropagation = (e: React.MouseEvent) => {
//     e.stopPropagation();
//   };
//
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={onCancel}
//     >
//       <div
//         className="bg-white rounded-lg p-6 w-full max-w-md"
//         onClick={stopPropagation}
//       >
//         <h3 className="text-lg font-semibold mb-4">编辑 Span 属性</h3>
//
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               aria-label (朗读文本)
//             </label>
//             <textarea
//               value={ariaLabel}
//               onChange={(e) => setAriaLabel(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows={3}
//             />
//           </div>
//
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               data-speaker (说话者)
//             </label>
//             <input
//               type="text"
//               value={speaker}
//               onChange={(e) => setSpeaker(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               data-voice-id (语音ID)
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={voiceId}
//                 onChange={(e) => setVoiceId(e.target.value)}
//                 className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="留空将自动生成UUID"
//               />
//               <button
//                 onClick={() => setVoiceId(uuidv4())}
//                 className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 生成新ID
//               </button>
//             </div>
//           </div>
//         </div>
//
//         <div className="mt-6 flex justify-end space-x-3">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 border rounded-md hover:bg-gray-100"
//           >
//             取消
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             保存
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
