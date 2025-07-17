import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { LexoRank } from 'lexorank';

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

export async function POST(request) {
  try {
    const { wordId, targetPosition, referenceWeights } = await request.json();
    
    if (!wordId || targetPosition === undefined) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    
    let newWeight;
    
    // Calculate new weight based on position
    if (targetPosition === 'start' && referenceWeights.after) {
      // Insert at the beginning
      const lexoRank = LexoRank.parse(referenceWeights.after);
      newWeight = lexoRank.genPrev().format();
    } else if (targetPosition === 'end' && referenceWeights.before) {
      // Insert at the end
      const lexoRank = LexoRank.parse(referenceWeights.before);
      newWeight = lexoRank.genNext().format();
    } else if (referenceWeights.before && referenceWeights.after) {
      // Insert between two items
      const lexoRank1 = LexoRank.parse(referenceWeights.before);
      const lexoRank2 = LexoRank.parse(referenceWeights.after);
      newWeight = lexoRank1.between(lexoRank2).format();
    } else {
      throw new Error('Invalid position parameters');
    }

    // Update the word's weight in database
    await connection.execute(
      'UPDATE notebook_words_english SET weight = ? WHERE id = ?',
      [newWeight, wordId]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      newWeight
    }, { status: 200 });

  } catch (error) {
    console.error('Update weight error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error'
    }, { status: 500 });
  }
}