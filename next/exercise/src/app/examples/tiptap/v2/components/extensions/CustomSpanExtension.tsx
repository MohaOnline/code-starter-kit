// import {Mark, mergeAttributes} from '@tiptap/core';
//
// // 创建一个自定义 Span 标记扩展
// const CustomSpanExtension = Mark.create({
//   name:      'customSpan',
//   inclusive: true,
//   spanning:  false,
//
//   addAttributes() {
//     return {
//       'aria-label':    {
//         default:    '',
//         parseHTML:  element => element.getAttribute('aria-label') || '',
//         renderHTML: attributes => {
//           if (!attributes['aria-label']) {
//             return {};
//           }
//
//           return {
//             'aria-label': attributes['aria-label'],
//           };
//         },
//       },
//       'data-speaker':  {
//         default:    '',
//         parseHTML:  element => element.getAttribute('data-speaker') || '',
//         renderHTML: attributes => {
//           if (!attributes['data-speaker']) {
//             return {};
//           }
//
//           return {
//             'data-speaker': attributes['data-speaker'],
//           };
//         },
//       },
//       'data-voice-id': {
//         default:    '',
//         parseHTML:  element => element.getAttribute('data-voice-id') || '',
//         renderHTML: attributes => {
//           if (!attributes['data-voice-id']) {
//             return {};
//           }
//
//           return {
//             'data-voice-id': attributes['data-voice-id'],
//           };
//         },
//       }
//     };
//   },
//
//   parseHTML() {
//     return [
//       {
//         tag: 'span',
//       },
//     ];
//   },
//
//   renderHTML({HTMLAttributes}) {
//     return ['span', mergeAttributes(HTMLAttributes), 0];
//   },
//
//   addCommands() {
//     return {
//       setCustomSpan: attributes => ({chain}) => {
//         return chain()
//           .setMark(this.name, attributes)
//           .run();
//       },
//     };
//   },
// });
//
// export default CustomSpanExtension;
