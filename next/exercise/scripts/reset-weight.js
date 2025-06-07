import {config} from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import {LexoRank} from 'lexorank';

// 加载 .env.local 文件
config({path: path.resolve(process.cwd(), '.env.local')});

async function updateWeight() {
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
        SELECT id
        FROM notebook_words_english
        ORDER BY weight
    `);

    let t = LexoRank.parse('0|jzzzzz:');
    // 处理每条记录
    for (const row of rows) {
      const {
        id,
      } = row;
      console.log(t.format());
      console.log(id);

      await connection.execute(`
          UPDATE notebook_words_english
          SET weight = ?
          WHERE id = ?
      `, [t.format(), id]);
      t = t.genNext().genNext().genNext();
    }

    // 关闭连接
    connection.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

updateWeight().then(() => console.log('done'));
