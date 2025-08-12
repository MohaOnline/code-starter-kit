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

    const {action, word, value} = await request.json();

    // 验证输入
    if (!action || !word || !word.id) {
      throw new Error('Invalid request: action or word.id is missing');
    }

    if (action === 'update_priority') {
      if (!value) {
        throw new Error('Invalid request: value is missing');
      }
      const [updateResult] = await dbConnection.query(
        `UPDATE notebook_words_english
         SET priority = ?
         WHERE id = ?`,
        [value, word.id],
      );
    }

    responseData = word;
    responseData.priority = value;

    console.log(word);
    console.log(responseData);

    await dbConnection.commit();
  }
  catch (error) {
    if (dbConnection) {
      try {
        await dbConnection.rollback();
      }
      catch (rollbackError) {
        console.error('Rollback failed:', rollbackError);
      }
    }
    console.error('Error:', error.message);

    return NextResponse.json(
      {success: false, error: error.message},
      {status: 500},
    );
  }
  finally {
    if (dbConnection) {
      try {
        await dbConnection.end();
      }
      catch (endError) {
        console.error('Failed to close database connection:', endError);
      }
    }
  }

  return NextResponse.json({
    success: true,
    data: responseData,
  }, {status: 200});
}
