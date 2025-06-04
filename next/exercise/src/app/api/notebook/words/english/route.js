import {dbConfig} from '@/app/lib/db.js';
import {NextResponse} from 'next/server';
import {LexoRank} from 'lexorank';
import mysql from 'mysql2/promise';

export async function POST(request) {

  const contentType = request.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return NextResponse.json(
        {success: false, error: 'Invalid invoking...'},
        {status: 403},
    );
  }

  let dbConnection = null;
  let responseData = null;

  try {
    dbConnection = await mysql.createConnection(dbConfig);
    await dbConnection.beginTransaction();

    const {action, word} = await request.json();

    // 验证输入
    if (!action || !word || !word.id) {
      throw new Error('Invalid request: action or word.id is missing');
    }

    if (action === 'put_end') {
      //
      const [rows] = await dbConnection.query(
          `SELECT MAX(weight) as weight
           FROM notebook_words_english;`,
          [],
      );
      console.log(rows);
      if (!rows || !rows[0]?.weight) {
        throw new Error('No weight found in notebook_words_english');
      }
      const weight = rows[0].weight;
      const lexoRank = LexoRank.parse(weight);
      const newWeight = lexoRank.genNext().format();

      const [updateResult] = await dbConnection.query(
          `UPDATE notebook_words_english
           SET weight = ?
           WHERE id = ?`,
          [newWeight, word.id],
      );

      if (!updateResult || !('affectedRows' in updateResult) ||
          updateResult.affectedRows === 0) {
        console.error('无法更新 notebook_words_english:', word.id);
        throw new Error('更新 notebook_words_english 错误: ' + word.id);
      }

      word.weight = newWeight;
      responseData = word;

    } else if (action === 'put_top') {
      const [rows] = await dbConnection.query(
          `SELECT MIN(weight) as weight
           FROM notebook_words_english;`,
          [],
      );
      console.log(rows);
      if (!rows || !rows[0]?.weight) {
        throw new Error('No weight found in notebook_words_english');
      }
      const weight = rows[0].weight;
      const lexoRank = LexoRank.parse(weight);
      const newWeight = lexoRank.genPrev().format();

      const [updateResult] = await dbConnection.query(
          `UPDATE notebook_words_english
           SET weight = ?
           WHERE id = ?`,
          [newWeight, word.id],
      );

      if (!updateResult || !('affectedRows' in updateResult) ||
          updateResult.affectedRows === 0) {
        console.error('无法更新 notebook_words_english:', word.id);
        throw new Error('更新 notebook_words_english 错误: ' + word.id);
      }

      word.weight = newWeight;
      responseData = word;
    } else if (action === 'put_next') {
      // 重设密码
    } else if (action === 'put_previous') {
      // 重设密码
    }

    await dbConnection.commit();
  } catch (error) {
    if (dbConnection) {
      try {
        await dbConnection.rollback();
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError);
      }
    }
    console.error('Error:', error.message);

    return NextResponse.json(
        {success: false, error: error.message},
        {status: 500},
    );
  } finally {
    if (dbConnection) {
      try {
        await dbConnection.end();
      } catch (endError) {
        console.error('Failed to close database connection:', endError);
      }
    }
  }

  return NextResponse.json({
    success: true,
    data: responseData,
  }, {status: 200});
}
