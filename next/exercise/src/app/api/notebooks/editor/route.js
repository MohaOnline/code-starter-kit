import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { LexoRank } from 'lexorank';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

export async function POST(request) {
  try {
    const body = await request.json();
    const connection = await mysql.createConnection(dbConfig);

    // Extract fields from body
    const {
      nbid,
      tid,
      title,
      body: noteBody,
      question,
      answer,
      figures,
      body_script,
      body_extra,
      note,
      note_extra,
      deleted = false
    } = body;

    // Generate weight using LexoRank algorithm
    let newWeight;
    try {
      const [rows] = await connection.query(
        'SELECT MAX(weight) as weight FROM notebooks_notes WHERE nbid = ?',
        [nbid]
      );
      
      if (!rows || !rows[0]?.weight) {
        // First note in this notebook, use initial rank
        newWeight = LexoRank.middle().format();
      } else {
        const weight = rows[0].weight;
        const lexoRank = LexoRank.parse(weight);
        newWeight = lexoRank.genNext().format();
      }
    } catch (weightError) {
      console.error('Weight generation error:', weightError);
      // Fallback to middle rank if weight generation fails
      newWeight = LexoRank.middle().format();
    }

    // Insert new note
    const [result] = await connection.execute(
      `INSERT INTO notebooks_notes 
        (nbid, tid, title, body, question, answer, figures, body_script, 
         body_extra, note, note_extra, deleted, weight, created, updated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        nbid, tid, title, noteBody, question, answer, figures, body_script,
        body_extra, note, note_extra, deleted, newWeight
      ]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      data: {
        id: Number(result.insertId),
        weight: newWeight
      },
      message: 'Note created successfully'
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create note' },
      { status: 500 }
    );
  }
}