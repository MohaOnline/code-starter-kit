import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT * FROM notebooks_notes WHERE id = ?',
      [id]
    );

    await connection.end();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const connection = await mysql.createConnection(dbConfig);

    // Extract fields from body with default values
    const {
      nbid,
      tid,
      title = '',
      body: noteBody = '',
      question = '',
      answer = '',
      figures = '',
      body_script = '',
      body_extra = '',
      note = '',
      note_extra = '',
      deleted = false
    } = body;

    const [result] = await connection.execute(
      `UPDATE notebooks_notes SET 
        nbid = ?, tid = ?, title = ?, body = ?, question = ?, answer = ?,
        figures = ?, body_script = ?, body_extra = ?, note = ?, note_extra = ?,
        deleted = ?, updated = NOW()
       WHERE id = ?`,
      [
        nbid, tid, title, noteBody, question, answer,
        figures, body_script, body_extra, note, note_extra,
        deleted, id
      ]
    );

    await connection.end();

    // Check if update was successful
    if (!result || !('affectedRows' in result) || result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Note updated successfully'
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update note' },
      { status: 500 }
    );
  }
}