// 加载 .env 文件（仅在独立脚本中需要） ː  ˈ  ˌ
import {config} from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

import mysql from 'mysql2/promise';
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig, ResultReason,
} from 'microsoft-cognitiveservices-speech-sdk';

// 加载 .env.local 文件
config({path: path.resolve(process.cwd(), '.env.local')});

// 配置 Azure TTS
const speechConfig = SpeechConfig.fromSubscription(
    process.env.SPEECH_KEY,
    process.env.SPEECH_REGION,
);
// speechConfig.speechRecognitionLanguage = 'en-GB';
speechConfig.speechSynthesisVoiceName = process.env.NEXT_PUBLIC_SPEECH_VOICE;
speechConfig.speechSynthesisLanguage = process.env.NEXT_PUBLIC_SPEECH_VOICE.slice(
    0, 5);
console.log(speechConfig);

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 生成 SSML
function generateSSML(word, phonetic_us, phonetic_uk) {
  const phonetic = phonetic_us || phonetic_uk || ''; // 优先使用 phonetic_us，否则用 phonetic_uk
  const textToSpeak = word; // word 或 script 已在上层处理
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${process.env.NEXT_PUBLIC_SPEECH_VOICE.slice(
      0, 5)}">
      <voice name="${process.env.NEXT_PUBLIC_SPEECH_VOICE}">
        ${phonetic
      ? `<phoneme alphabet="ipa" ph="${phonetic}">${textToSpeak}</phoneme>`
      : textToSpeak}
      </voice>
    </speak>
  `;

  // return `
  //   <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${process.env.NEXT_PUBLIC_SPEECH_VOICE.slice(
  //     0, 5)}">
  //     <voice name="${process.env.NEXT_PUBLIC_SPEECH_VOICE}">
  //       ${textToSpeak}
  //     </voice>
  //   </speak>
  // `;
}

async function fetchAzureTTS() {
  try {

    // 连接 MySQL 数据库
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // 查询 voice_id_uk, word, script
    const [rows] = await connection.execute(`
        SELECT word, script, phonetic_uk, phonetic_us, voice_id_uk, voice_id_uk
        FROM words_english_chinese_summary
        -- LIMIT 1
    `);

    // 处理每条记录
    for (const row of rows) {
      const {
        voice_id_uk,
        script,
        word,
        phonetic_us,
        phonetic_uk,
      } = row;

      const textToSpeak = script || word; // 优先使用 script，否则用 word

      // 不同的发音都使用 us ID
      if (!voice_id_uk) continue;

      const firstChar = voice_id_uk[0].toLowerCase(); // UUID 第一个字符
      const filePath = path.resolve(
          process.cwd(),
          `./public/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${voice_id_uk}.wav`,
      );

      // 检查文件是否存在
      try {
        await fs.access(filePath, fs.constants.F_OK);
      } catch (error) {
        // 文件不存在，生成 TTS
        console.log(`Generating TTS for UUID ${voice_id_uk}: ${textToSpeak}`);

        // 创建目录（如果不存在）
        const dirPath = path.dirname(filePath);
        await fs.mkdir(dirPath, {recursive: true});

        // 生成 SSML
        const ssml = generateSSML(textToSpeak, phonetic_us, phonetic_uk);
        console.log(ssml);

        await delay(1000);

        // 配置音频输出
        const audioConfig = AudioConfig.fromAudioFileOutput(filePath);
        const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

        // 生成语音
        const result = await new Promise((resolve, reject) => {
          synthesizer.speakSsmlAsync(
              ssml,
              (result) => {
                synthesizer.close();
                resolve(result);
              },
              (error) => {

                synthesizer.close();
                reject(error);
              },
          );
        });

        if (result.reason === ResultReason.SynthesizingAudioCompleted) {
          console.log(`TTS generated and saved to ${filePath}`);
        } else {
          await fs.unlink(filePath).catch(() => {});
          console.error(
              `TTS failed for ${textToSpeak}: ${result.errorDetails}`);
        }
      }
    }

    await connection.end();
    console.log('Azure TTS processing completed');

  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }

}

fetchAzureTTS().then();
