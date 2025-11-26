import {use} from 'react';
import {NextResponse} from 'next/server';
import mysql from 'mysql2/promise';
import {v4 as uuid} from 'uuid';
import {LexoRank} from 'lexorank';
import path from 'path';
import fs from 'fs/promises';
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig, ResultReason, SpeechSynthesisOutputFormat,
} from 'microsoft-cognitiveservices-speech-sdk';

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// 配置 Azure TTS
const speechConfig = SpeechConfig.fromSubscription(
    process.env.SPEECH_KEY,
    process.env.SPEECH_REGION,
);
speechConfig.speechSynthesisVoiceName = process.env.NEXT_PUBLIC_SPEECH_VOICE;
speechConfig.speechSynthesisLanguage = process.env.NEXT_PUBLIC_SPEECH_VOICE.slice(
    0, 5);
speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm;

function generateSSML(word, phonetic_us, phonetic_uk) {
  const phonetic = phonetic_us || phonetic_uk || ''; // 优先使用 phonetic_us，否则用 phonetic_uk
  const textToSpeak = word; // word 或 script 已在上层处理
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${process.env.NEXT_PUBLIC_SPEECH_VOICE.slice(
      0, 5)}">
      <voice name="${process.env.NEXT_PUBLIC_SPEECH_VOICE}">
        ${textToSpeak}
      </voice>
    </speak>
  `;
}

async function fetchAzureTTS(
    word, script, voice_id_us, phonetic_us, phonetic_uk) {

  const textToSpeak = script || word; // 优先使用 script，否则用 word

  const firstChar = voice_id_us[0].toLowerCase(); // UUID 第一个字符
  const filePath = path.resolve(
      process.cwd(),
      `./public/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${voice_id_us}.wav`,
  );

  // 检查文件是否存在
  try {
    await fs.access(filePath, fs.constants.F_OK);
  } catch (error) {
    // 文件不存在，生成 TTS
    console.log(`Generating TTS for UUID ${voice_id_us}: ${textToSpeak}`);

    // 创建目录（如果不存在）
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, {recursive: true});

    // 生成 SSML
    const ssml = generateSSML(textToSpeak, phonetic_us, phonetic_uk);
    console.log(ssml);

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
      return result.errorDetails;
    }
  }

  return '';
}


function generateSSMLTranslation(translation) {
  const textToSpeak = translation; // word 或 script 已在上层处理
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE.slice(
      0, 5)}">
      <voice name="${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}">
        ${textToSpeak}
      </voice>
    </speak>
  `;
}

async function fetchAzureTTSTranslation(
    translation, script, voice_id) {

  const textToSpeak = script || translation; // 优先使用 script，否则用 word

  const firstChar = voice_id[0].toLowerCase(); // UUID 第一个字符
  const filePath = path.resolve(
      process.cwd(),
      `./public/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}/${firstChar}/${voice_id}.wav`,
  );

  // 检查文件是否存在
  try {
    await fs.access(filePath, fs.constants.F_OK);
  } catch (error) {
    // 文件不存在，生成 TTS
    console.log(`Generating TTS for UUID ${voice_id}: ${textToSpeak}`);

    // 创建目录（如果不存在）
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, {recursive: true});

    // 生成 SSML
    const ssml = generateSSMLTranslation(textToSpeak);
    console.log(ssml);

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
      return result.errorDetails;
    }
  }

  return '';
}

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

/** 打开编辑对话框时查询 */
export async function GET(request) {

  let connection;
  try {
    const {searchParams} = await new URL(request.url);
    const word = searchParams.get('word'); // 获取查询参数 word

    if (!word) {
      return NextResponse.json({
        success: true,
        data: [],
      }, {status: 200});
    }
    const params = [];
    // params.push(`${word}%`);
    params.push(`${word}`);

    const session = await getServerSession(authOptions)
    let userId = session?.user?.id;
    if (!userId) {
      userId = '6';
    }
    console.log('userId: ', userId);
    params.push(parseInt(userId, 10));

    // Create database connection
    connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    // 单纯查词接口，是否在笔记本里进攻参考。
    const [rows] = await connection.execute(`
        SELECT words_english_chinese_summary.*,
               notebook_words_english.id          as wid,
               notebook_words_english.uid,
               notebook_words_english.notebook_id as nid,
               notebook_words_english.note,
               notebook_words_english.note_explain,
               notebook_words_english.deleted,
               notebook_words_english.priority,
               notebook_words_english.weight
        FROM words_english_chinese_summary
                 LEFT JOIN notebook_words_english
                           on words_english_chinese_summary.chinese_id =
                              notebook_words_english.chinese_id
#         WHERE word LIKE ?
        WHERE word = ?
          AND (uid = ? OR uid IS NULL OR uid = '')
        ORDER BY id
        ;
    `, params);

    const words = [];

    if (Array.isArray(rows) && rows.length > 0)
    rows.map((row, index) => {
      if (words.length === 0 ||
          words[words.length - 1].eid !== row.id) {
        words.push({
          eid: row.id,
          word: row.word,
          accent: row.accent ? row.accent : '',
          script: row.script ? row.script : '',
          syllable: row.syllable ? row.syllable : '',
          translations: [
            {
              id: row.wid ? row.wid : '', // word id = note id
              nid: row.nid ? row.nid : '',
              cid: row.chinese_id ? row.chinese_id : '',
              pos: row.part_of_speech ? row.part_of_speech : '',
              phonetic_uk: row.phonetic_uk ? row.phonetic_uk : '',
              phonetic_us: row.phonetic_us ? row.phonetic_us : '',
              translation: row.translation ? row.translation : '',
              script: row.chinese_script ? row.chinese_script : '',
              voice_id_uk: row.voice_id_uk ? row.voice_id_uk : '',
              voice_id_us: row.voice_id_us ? row.voice_id_us : '',
              voice_id_translation: row.voice_id_translation
                  ? row.voice_id_translation
                  : '',
              noted: !!row.wid && !row.deleted,
              note: row.note ? row.note : '',
              weight: row.weight || '',
              note_explain: row.note_explain ? row.note_explain : '',
              deleted: !!row.chinese_deleted,
              priority: row.priority ? row.priority : 3,
            },
          ],
        });
      } else {
        words[words.length - 1].translations.push({
          id: row.wid ? row.wid : '',
          nid: row.nid ? row.nid : '',
          cid: row.chinese_id ? row.chinese_id : '',
          pos: row.part_of_speech ? row.part_of_speech : '',
          phonetic_uk: row.phonetic_uk ? row.phonetic_uk : '',
          phonetic_us: row.phonetic_us ? row.phonetic_us : '',
          translation: row.translation ? row.translation : '',
          script: row.chinese_script ? row.chinese_script : '',
          voice_id_uk: row.voice_id_uk ? row.voice_id_uk : '',
          voice_id_us: row.voice_id_us ? row.voice_id_us : '',
          voice_id_translation: row.voice_id_translation
              ? row.voice_id_translation
              : '',
          noted: !!row.wid && !row.deleted,
          note: row.note ? row.note : '',
          weight: row.weight || '',
          note_explain: row.note_explain ? row.note_explain : '',
          deleted: !!row.chinese_deleted,
        });
      }
    });

    // Return JSON response
    return NextResponse.json({
      success: true,
      data: words,
    }, {status: 200});

  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, {status: 500});
  } finally {

    // Close the connection
    await connection.end();
  }
}

/**
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {

  let connection;

  try {
    // 检查 Content-Type
    const contentType = request.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
          {success: false, error: 'Invalid Content-Type'},
          {status: 400},
      );
    }

    // Create database connection
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();

    // 解析请求体中的 JSON 数据
    const data = await request.json();
    console.log('words-english-chinese', 'POST', data);

    let dbResult;

    if (data.eid) {
      const [updateResult] = await connection.query(
          `UPDATE words_english
           SET word     = ?,
               accent   = ?,
               syllable = ?,
               script   = ?
           WHERE id = ?`,
          [
            data.word,
            data.accent || '',
            data.syllable || '',
            data.script || '',
            data.eid,
          ],
      );

      console.log('Update words_english:', updateResult);

      if (!updateResult || !('affectedRows' in updateResult) ||
          updateResult.affectedRows === 0) {
        console.error('无法更新 words_english:', data.eid);
        throw new Error('更新 words_english 失败');
      }
      // 如果存在eid更新记录，否则插入记录。
    } else {
      const [insertResult] = await connection.query(
          `INSERT INTO words_english (word, accent, syllable, script)
           VALUES (?, ?, ?, ?)`,
          [
            data.word,
            data.accent || '',
            data.syllable || '',
            data.script || '',
          ],
      );

      console.log('Insert words_english:', insertResult);

      if (!insertResult || !('affectedRows' in insertResult) ||
          insertResult.affectedRows === 0) {
        console.error('无法插入 words_english:', data.word);
        throw new Error('更新 words_english 失败');
      } else {
        data.eid = insertResult.insertId;
      }
      // 不存在eid 插入记录。
    }

    if (data.translations?.length > 0) {
      for (const translation of data.translations) {
        console.log('Save translations:', translation);

        // 把 azure 不能识别的音标换成 IPA
        // https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-ssml-phonetic-sets
        translation.phonetic_uk = translation.phonetic_uk.replace(/'/g, 'ˈ').
            replace(/∫/g, 'ʃ').replace(/æ/g, 'æ').
            replace(/ɔ/g, 'ɒ').replace(/i(?!ː)/g, 'ɪ').replace(/\(ə\)/g, '');

        if (translation.cid) {
          const [updateResult] = await connection.query(
              `UPDATE words_english_chinese
               SET part_of_speech = ?,
                   phonetic_uk    = ?,
                   phonetic_us    = ?,
                   translation    = ?,
                   script         = ?,
                   deleted        =?
               WHERE id = ?`, // 根据 cid 或其他唯一标识符来更新
              [
                translation.pos,
                translation.phonetic_uk,
                translation.phonetic_us,
                translation.translation,
                translation.script,
                translation.deleted,
                translation.cid, // 根据 cid 找到要更新的记录
              ]);

          if (!updateResult || !('affectedRows' in updateResult) ||
              updateResult.affectedRows === 0) {
            console.error('无法更新 words_english_chinese:', data.word);
            throw new Error('更新 words_english_chinese 失败: ' + data.word);
          } else {

            console.log('trans update: ', updateResult);
          }
        } else {
          const [insertResult] = await connection.query(
              `INSERT INTO words_english_chinese (part_of_speech, english_id,
                                                  phonetic_uk, phonetic_us,
                                                  translation, script,
                                                  voice_id_uk, voice_id_us,
                                                  voice_id_translation)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                translation.pos,
                data.eid,
                translation.phonetic_uk,
                translation.phonetic_us,
                translation.translation,
                translation.script,
                translation.voice_id_uk = uuid(),
                translation.voice_id_us = uuid(),
                translation.voice_id_translation = uuid(),
              ]);

          if (!insertResult || !('affectedRows' in insertResult) ||
              insertResult.affectedRows === 0) {
            console.error('无法插入 words_english_chinese:', data.word);
            throw new Error('插入 words_english_chinese 失败: ' + data.word);
          } else {
            console.log('trans insert: ', insertResult);
            translation.cid = insertResult.insertId;
          }

          await fetchAzureTTS(data.word, data.script, translation.voice_id_uk,
              translation.phonetic_us, translation.phonetic_uk);

          await fetchAzureTTSTranslation(translation.translation, translation.script,
              translation.voice_id_translation);
        }

        // 根据 session 获取 uid。当前用户处理。
        const session = await getServerSession(authOptions)
        let userId = session?.user?.id;
        if (!userId) {
          userId = '6';
        }
        console.log('userId: ', userId);

        if (!!translation.noted && !translation.id) {
          // 计算 weight，放入 translation。
          if (!!data.weight1 && !data.weight2) {
            const lexoRank = LexoRank.parse(data.weight1);
            translation.weight = lexoRank.genPrev().format();
            data.weight1 = translation.weight;
          } else if (!data.weight1 && !!data.weight2) {
            const lexoRank = LexoRank.parse(data.weight2);
            data.weight2 = translation.weight = lexoRank.genNext().format();
          } else {
            const lexoRank1 = LexoRank.parse(data.weight1);
            const lexoRank2 = LexoRank.parse(data.weight2);
            translation.weight = lexoRank1.between(lexoRank2).format();
            data.weight1 = translation.weight;
          }

          const [insertResult] = await connection.query(
              `INSERT INTO notebook_words_english (uid,
                                                   notebook_id,
                                                   english_id,
                                                   chinese_id,
                                                   note,
                                                   weight,
                                                   note_explain)
               VALUES (?, 1, ?, ?, ?, ?, ?)`, [
                userId,
                data.eid,
                translation.cid,
                translation.note,
                translation.weight,
                '',
              ]);

          if (!insertResult || !('affectedRows' in insertResult) ||
              insertResult.affectedRows === 0) {
            console.error('无法插入 notebook_words_english:', data.word);
            throw new Error('插入 notebook_words_english 失败: ' + data.word);
          } else {
            console.log('note insert: ', insertResult);
            translation.id = insertResult.insertId;
            translation.nid = 1;
            translation.new = true;
            translation.priority = 3;
          }
        } else if (translation.id) {

          if (!translation.noted) {
            translation.weight = '';
          } else if (!!translation.noted && !translation.weight) {
            // 新添加的解释，需要设置 priority
            translation.new = true;
            translation.priority = 3;
            // 计算 weight，放入 translation。
            if (!!data.weight1 && !data.weight2) {
              const lexoRank = LexoRank.parse(data.weight1);
              translation.weight = lexoRank.genPrev().format();
              data.weight1 = translation.weight;
            } else if (!data.weight1 && !!data.weight2) {
              const lexoRank = LexoRank.parse(data.weight2);
              data.weight2 = translation.weight = lexoRank.genNext().format();
            } else {
              const lexoRank1 = LexoRank.parse(data.weight1);
              const lexoRank2 = LexoRank.parse(data.weight2);
              translation.weight = lexoRank1.between(lexoRank2).format();
              data.weight1 = translation.weight;
            }
          }

          const [updateResult] = await connection.query(
              `UPDATE notebook_words_english
               SET note_explain = ?,
                   note         = ?,
                   deleted = ?,
                   weight  =?
               WHERE id = ?`, // 根据 cid 或其他唯一标识符来更新
              [
                '',
                translation.note || '',
                !translation.noted,
                translation.noted ? translation.weight : '',
                translation.id, // 根据 id 找到要更新的记录
              ]);

          if (!updateResult || !('affectedRows' in updateResult) ||
              updateResult.affectedRows === 0) {
            console.error('无法更新 notebook_words_english:', translation.id);
            throw new Error(
                '更新 notebook_words_english 失败: ' + translation.id);
          } else {
            console.log('note update: ', updateResult);
          }
        } // end if 插入单词笔记本

      } // 循环结束 for (const translation of data.translations)
    }



    await connection.commit();
    return NextResponse.json({success: true, data: data}, {status: 200});

  } catch (error) {
    await connection.rollback();
    console.error('Database update error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
    }, {status: 500});
  } finally {
    // Close the connection
    await connection.end();
  }
}