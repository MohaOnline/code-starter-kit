import {NextResponse} from 'next/server';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

/**  */
export async function GET() {
  try {
    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    const [rows] = await connection.execute(`
        SELECT *
        FROM notebook_words_english_summary
        WHERE deleted <> true
        ORDER BY weight;
    `);

    // Close the connection
    await connection.end();

    // Return JSON response
    return NextResponse.json({
      success: true,
      data: rows,
    }, {status: 200});

  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, {status: 500});
  }
}