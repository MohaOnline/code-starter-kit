// 'use client'
//
// export default function AudioExample() {
//   async function detectTailSilence(audioUrl, silenceThreshold = 0.01) {
//     try {
//       // 创建音频上下文
//       const audioContext = new AudioContext();
//
//       // 获取音频文件
//       const response = await fetch(audioUrl);
//       const arrayBuffer = await response.arrayBuffer();
//       const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
//
//       // 获取音频数据（单声道）
//       const sampleRate = audioBuffer.sampleRate;            // 采样率 44100 数据点/秒
//       const channelData = audioBuffer.getChannelData(0);    // 采样音频数据
//       // 从音频末尾开始向前检查
//       let silenceCount = 0;
//       for (let i = channelData.length - 1; i >= 0; i--) {
//         if (Math.abs(channelData[i]) < silenceThreshold) {
//           silenceCount++;
//         } else {
//           console.log('sound detected:', channelData[i]);
//           // 遇到非静音样本，结束计数
//           break;
//         }
//       }
//       const silenceTime = silenceCount / sampleRate;
//       return {
//         hasSilence: true,
//         silenceDuration: silenceTime,
//         message: `音频尾部检测到 ${silenceTime.toFixed(2)} 秒的静音`
//       };
//
//       // return {
//       //   hasSilence: false,
//       //   silenceDuration: 0,
//       //   message: "音频尾部未检测到明显的静音"
//       // };
//     } catch (error) {
//       console.error("错误:", error);
//       return {
//         hasSilence: false,
//         silenceDuration: 0,
//         message: "处理音频时发生错误"
//       };
//     }
//   }
//
//   // 示例使用
//   const audioUrl = '/refs/voices/en-GB-RyanNeural/3/3d22ed4e-7bdc-4e60-85db-36c93a6c906b.wav'; // 替换为实际音频文件路径
//   detectTailSilence(audioUrl, 0.01, 0.5).then(result => {
//     console.log(result.message);
//   });
//
//
//   return (
//     <div>
//     </div>
//   );
// }