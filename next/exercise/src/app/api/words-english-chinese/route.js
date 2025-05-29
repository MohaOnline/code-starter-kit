import {use} from 'react';
import {NextResponse} from 'next/server';
import mysql from 'mysql2/promise';
import {v4 as uuid} from 'uuid';
import LexoRank from 'lexorank';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

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
    params.push(`${word}%`);

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
               notebook_words_english.note_explain
        FROM words_english_chinese_summary
                 LEFT JOIN notebook_words_english
                           on words_english_chinese_summary.chinese_id =
                              notebook_words_english.chinese_id
        WHERE word LIKE ?
        ORDER BY id
        ;
    `, params);

    const words = [];

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
              noted: !!row.wid,
              note: row.note ? row.note : '',
              note_explain: row.note_explain ? row.note_explain : '',
              deleted: !!row.chinese_deleted,
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
          noted: !!row.wid,
          note: row.note ? row.note : '',
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

      if (updateResult.affectedRows === 0) {
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

      if (insertResult.affectedRows === 0) {
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

          if (updateResult.affectedRows === 0) {
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

          if (insertResult.affectedRows === 0) {
            console.error('无法插入 words_english_chinese:', data.word);
            throw new Error('插入 words_english_chinese 失败: ' + data.word);
          } else {
            console.log('trans insert: ', insertResult);
            translation.cid = insertResult.insertId;
          }
        }
      }
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