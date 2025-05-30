// fetch-edge-tts.js
import {config} from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import mysql from 'mysql2/promise';
// import {promises as edgeTts} from 'edge-tts';

import {EdgeTTS} from '@andresaya/edge-tts';

// Initialize the EdgeTTS service
const tts = new EdgeTTS();

// 加载 .env.local 文件
config({path: path.resolve(process.cwd(), '.env.local')});
await tts.synthesize('Hello, world!', 'en-US-AriaNeural', {
  rate: '0%',       // Speech rate (range: -100% to 100%)
  volume: '0%',     // Speech volume (range: -100% to 100%)
  pitch: '0Hz',      // Voice pitch (range: -100Hz to 100Hz)
});
await tts.toFile('./output.wav');         // Get raw audio buffer

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//
// // 获取语音名称（根据环境变量配置）
// const getVoiceName = () => {
//   return process.env.NEXT_PUBLIC_SPEECH_VOICE || 'en-US-AriaNeural';
// };
//
// // 生成 SSML - Edge TTS 也支持 SSML 标记
// function generateSSML(textToSpeak) {
//   return `
//     <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${getVoiceName().
//       slice(0, 5)}">
//       <voice name="${getVoiceName()}">
//         ${textToSpeak}
//       </voice>
//     </speak>
//   `;
// }
//
// async function fetchEdgeTTS() {
//   try {
//     // 连接 MySQL 数据库
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//     });
//
//     // 查询数据
//     const [rows] = await connection.execute(`
//         SELECT word, script, phonetic_uk, phonetic_us, voice_id_uk, voice_id_us
//         FROM words_english_chinese_summary
//         -- LIMIT 1
//     `);
//
//     // 处理每条记录
//     for (const row of rows) {
//       const {
//         voice_id_us,
//         script,
//         word,
//       } = row;
//
//       const textToSpeak = script || word; // 优先使用 script，否则用 word
//
//       if (!voice_id_us) continue;
//
//       const firstChar = voice_id_us[0].toLowerCase(); // UUID 第一个字符
//       const filePath = path.resolve(
//           process.cwd(),
//           `./public/refs/voices/${getVoiceName()}/${firstChar}/${voice_id_us}.wav`,
//       );
//
//       // 检查文件是否存在
//       try {
//         await fs.access(filePath, fs.constants.F_OK);
//         console.log(
//             `File exists for UUID ${voice_id_us}: ${filePath}, skipping...`);
//         continue;
//       } catch (error) {
//         // 文件不存在，继续生成 TTS
//         console.log(`Generating TTS for UUID ${voice_id_us}: ${textToSpeak}`);
//       }
//
//       // 创建目录（如果不存在）
//       const dirPath = path.dirname(filePath);
//       await fs.mkdir(dirPath, {recursive: true});
//
//       // 生成 SSML
//       const ssml = generateSSML(textToSpeak);
//       console.log(ssml);
//
//       await delay(1000); // 可选延迟以避免请求过快
//
//       // 使用 edge-tts 生成音频
//       const tts = edgeTts.default({
//         text: textToSpeak,
//         voice: getVoiceName(),
//         rate: '+0%',
//         volume: '+0%',
//       });
//
//       // 写入文件
//       const writeStream = fs.createWriteStream(filePath);
//       await new Promise((resolve, reject) => {
//         tts.pipe(writeStream);
//         tts.on('end', resolve);
//         tts.on('error', reject);
//       });
//
//       console.log(`TTS generated and saved to ${filePath}`);
//     }
//
//     await connection.end();
//     console.log('Edge TTS processing completed');
//
//   } catch (error) {
//     console.error('Error:', error.message);
//     throw error;
//   }
// }
//
// fetchEdgeTTS().then();
