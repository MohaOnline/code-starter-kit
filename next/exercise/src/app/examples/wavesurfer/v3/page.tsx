// 'use client';
//
// /**
//  * WaveSurfer v3 Example - 音频波形可视化
//  *
//  * 本示例演示了如何使用 WaveSurfer v7 创建一个功能完整的音频播放器：
//  * - 音频波形可视化
//  * - 播放控制（播放/暂停）
//  * - 音量控制
//  * - 进度显示和跳转
//  * - 鼠标选取音频片段并循环播放
//  *
//  * 技术背景：
//  * WaveSurfer.js 是一个基于 Web Audio API 和 Canvas 的音频可视化库
//  * 官方文档: https://wavesurfer.xyz/docs
//  *
//  * 项目约定遵循:
//  * - 使用 TypeScript 和函数式组件
//  * - 添加中文注释解释业务逻辑
//  * - 使用 Tailwind CSS 进行样式设计
//  * - 响应式设计适配不同屏幕尺寸
//  */
//
// import { useEffect, useRef, useState } from 'react';
// import type { WaveSurferOptions } from 'wavesurfer.js';
// import WaveSurfer from 'wavesurfer.js';
// import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
//
// export default function WaveSurferExample() {
//   // refs 用于存储 WaveSurfer 实例和容器元素
//   const containerRef = useRef<HTMLDivElement>(null);
//   const wavesurferRef = useRef<WaveSurfer | null>(null);
//   const regionsRef = useRef<any>(null);
//
//   // 状态管理
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [volume, setVolume] = useState(0.8); // 初始音量 80%
//   const [selectedRegion, setSelectedRegion] = useState<{ start: number; end: number } | null>(null);
//   const [isLooping, setIsLooping] = useState(false);
//   const [hoverTime, setHoverTime] = useState<number | null>(null);
//
//   // 切换播放/暂停状态
//   const togglePlayPause = () => {
//     if (wavesurferRef.current) {
//       wavesurferRef.current.playPause();
//     }
//   };
//
//   // 处理音量变化
//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (wavesurferRef.current) {
//       wavesurferRef.current.setVolume(newVolume);
//     }
//   };
//
//   // 处理进度条变化 (跳转到指定位置)
//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     if (wavesurferRef.current) {
//       wavesurferRef.current.seekTo(newTime / duration);
//     }
//   };
//
//   // 格式化时间显示 (秒转为 mm:ss 格式)
//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs.toString().padStart(2, '0')}`;
//   };
//
//   // 播放选中区域
//   const playSelectedRegion = () => {
//     console.log('Play selected region clicked, selectedRegion:', selectedRegion);
//     if (selectedRegion && wavesurferRef.current) {
//       wavesurferRef.current.seekTo(selectedRegion.start / duration);
//       wavesurferRef.current.play();
//       setIsLooping(true);
//     }
//   };
//
//   // 停止循环播放
//   const stopLooping = () => {
//     console.log('Stop looping clicked');
//     setIsLooping(false);
//   };
//
//   // 初始化 WaveSurfer
//   useEffect(() => {
//     // 确保容器元素存在
//     if (!containerRef.current) return;
//
//     console.log('Initializing WaveSurfer...');
//
//     // WaveSurfer 配置选项
//     const options: WaveSurferOptions = {
//       container: containerRef.current,
//       waveColor: '#3b82f6', // 波形颜色 (Tailwind blue-500)
//       progressColor: '#1d4ed8', // 进度颜色 (Tailwind blue-700)
//       cursorColor: '#ef4444', // 光标颜色 (Tailwind red-500)
//       cursorWidth: 2,
//       barWidth: 3,
//       barRadius: 3,
//       barGap: 2,
//       height: 120,
//       // responsive: true,
//       normalize: true,
//       // partialRender: true,
//     };
//
//     // 创建 WaveSurfer 实例
//     const ws = WaveSurfer.create(options);
//     wavesurferRef.current = ws;
//
//     console.log('Registering Regions plugin...');
//
//     // 注册 Regions 插件用于音频片段选择
//     const regions = ws.registerPlugin(RegionsPlugin.create());
//     regionsRef.current = regions;
//
//     console.log('Regions plugin registered:', regions);
//
//     console.log('Loading audio file...');
//
//     // 加载音频文件 (使用示例音频)
//     ws.load('/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0ac5f21d-d87d-4c47-a11d-e3b1f649e9d8.wav');
//
//     // 事件监听器
//     ws.on('ready', () => {
//       console.log('WaveSurfer ready, duration:', ws.getDuration());
//       setDuration(ws.getDuration());
//     });
//
//     ws.on('audioprocess', () => {
//       const currentTime = ws.getCurrentTime();
//       setCurrentTime(currentTime);
//
//       // 如果正在循环播放选中区域，检查是否需要跳转回起点
//       if (isLooping && selectedRegion) {
//         if (currentTime >= selectedRegion.end) {
//           ws.seekTo(selectedRegion.start / duration);
//           ws.play();
//         }
//       }
//     });
//
//     ws.on('play', () => {
//       console.log('WaveSurfer play event');
//       setIsPlaying(true);
//     });
//
//     ws.on('pause', () => {
//       console.log('WaveSurfer pause event');
//       setIsPlaying(false);
//     });
//
//     ws.on('seeking', () => {
//       console.log('WaveSurfer seeking event');
//       if (ws.isPlaying()) {
//         setCurrentTime(ws.getCurrentTime());
//       }
//     });
//
//     // 鼠标悬停事件，显示时间
//     const handleMouseMove = (e) => {
//       if (!ws.getDuration()) return;
//
//       const rect = containerRef.current!.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const width = rect.width;
//       const time = (x / width) * ws.getDuration();
//       setHoverTime(time);
//     };
//
//     const handleMouseLeave = () => {
//       setHoverTime(null);
//     };
//
//     containerRef.current.addEventListener('mousemove', handleMouseMove);
//     containerRef.current.addEventListener('mouseleave', handleMouseLeave);
//
//     // 区域选择事件
//     regions.on('region-created', (region) => {
//       console.log('Region created:', region);
//       setSelectedRegion({ start: region.start, end: region.end });
//
//       // 删除之前的区域，只保留最新的一个
//       const allRegions = regions.getRegions();
//       console.log('All regions:', allRegions);
//       allRegions.forEach(r => {
//         if (r !== region) {
//           console.log('Removing old region:', r);
//           r.remove();
//         }
//       });
//     });
//
//     regions.on('region-updated', (region) => {
//       console.log('Region updated:', region);
//       setSelectedRegion({ start: region.start, end: region.end });
//     });
//
//     regions.on('region-update-end', (region) => {
//       console.log('Region update end:', region);
//       setSelectedRegion({ start: region.start, end: region.end });
//     });
//
//     regions.on('region-click', (region, e) => {
//       console.log('Region clicked:', region, e);
//     });
//
//     // 清理函数
//     return () => {
//       console.log('Cleaning up WaveSurfer instance');
//       ws.destroy();
//       if (containerRef.current) {
//         containerRef.current.removeEventListener('mousemove', handleMouseMove);
//         containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, [duration, isLooping, selectedRegion]);
//
//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6">
//       <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">WaveSurfer 音频播放器</h1>
//         <p className="text-gray-600 mb-6">基于 WaveSurfer.js v7 的音频波形可视化示例</p>
//
//         {/* 调试信息显示 */}
//         <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
//           <div>调试信息:</div>
//           <div>selectedRegion: {selectedRegion ? `${selectedRegion.start.toFixed(2)}-${selectedRegion.end.toFixed(2)}` : 'null'}</div>
//           <div>isLooping: {isLooping.toString()}</div>
//           <div>hoverTime: {hoverTime !== null ? hoverTime.toFixed(2) : 'null'}</div>
//         </div>
//
//         {/* 波形可视化容器 */}
//         <div
//           ref={containerRef}
//           className="w-full bg-gray-50 rounded-lg border border-gray-200 mb-6 cursor-pointer relative"
//           onClick={togglePlayPause}
//         >
//           {/* 悬停时间显示 */}
//           {hoverTime !== null && (
//             <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//               {formatTime(hoverTime)}
//             </div>
//           )}
//         </div>
//
//         {/* 播放控制面板 */}
//         <div className="space-y-6">
//           {/* 播放/暂停按钮和时间显示 */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={togglePlayPause}
//                 className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
//                 aria-label={isPlaying ? '暂停' : '播放'}
//               >
//                 {isPlaying ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 ) : (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 )}
//               </button>
//
//               {/* 循环播放控制按钮 */}
//               {selectedRegion && (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={playSelectedRegion}
//                     className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
//                       isLooping
//                         ? 'bg-green-500 hover:bg-green-600 text-white'
//                         : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//                     }`}
//                   >
//                     循环播放选中区域
//                   </button>
//                   {isLooping && (
//                     <button
//                       onClick={stopLooping}
//                       className="px-3 py-2 rounded text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
//                     >
//                       停止循环
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span>{formatTime(currentTime)}</span>
//               <span>/</span>
//               <span>{formatTime(duration)}</span>
//             </div>
//           </div>
//
//           {/* 进度条 */}
//           <div className="space-y-2">
//             <input
//               type="range"
//               min="0"
//               max={duration || 100}
//               value={currentTime}
//               onChange={handleSeek}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
//               disabled={!duration}
//             />
//           </div>
//
//           {/* 音量控制 */}
//           <div className="flex items-center gap-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-4.5-9.5L12 3l4.5 4.5M12 2v20" />
//             </svg>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.01"
//               value={volume}
//               onChange={handleVolumeChange}
//               className="w-full max-w-xs h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
//             />
//             <span className="text-sm text-gray-600 w-10">{Math.round(volume * 100)}%</span>
//           </div>
//         </div>
//
//         {/* 功能说明 */}
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">功能说明</h2>
//           <ul className="text-gray-600 space-y-2 text-sm">
//             <li className="flex items-start">
//               <span className="text-blue-500 mr-2">•</span>
//               <span>点击波形图或播放按钮控制播放/暂停</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-blue-500 mr-2">•</span>
//               <span>拖动进度条可跳转到指定位置</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-blue-500 mr-2">•</span>
//               <span>使用音量滑块调节播放音量</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-blue-500 mr-2">•</span>
//               <span>在波形图上点击并拖动选择音频片段</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-blue-500 mr-2">•</span>
//               <span>点击"循环播放选中区域"按钮循环播放选中的音频片段</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-blue-500 mr-2">•</span>
//               <span>鼠标悬停在波形图上时显示对应的时间位置</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-blue-500 mr-2">•</span>
//               <span>响应式设计，在移动设备上也能良好显示</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }