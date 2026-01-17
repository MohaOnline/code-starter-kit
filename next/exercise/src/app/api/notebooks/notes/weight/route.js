import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {getToken} from 'next-auth/jwt';

import mysql from 'mysql2/promise';

import {prisma, jsonResponse} from '@/lib/prisma';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {dbConfig} from '@/app/lib/db.js';
import {getWeight} from '@/lib/utils';

export async function POST(request) {
  const contentType = request.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return jsonResponse({success: false, error: 'Invalid invoking...'}, 403);
  }
  let result = null;

  try {
    const session = await getServerSession(authOptions);

    const data = await request.json();

    console.log('weight update:');
    console.dir(data);

    let rows;
    if (data.position === 'top' || data.position === 'bottom') {
      rows = await prisma.$queryRaw`
          SELECT id
          FROM notebooks_notes
          WHERE id = ${data.notes[0].id} AND weight = ${data.notes[0].weight}
             OR id = ${data.notes[1].id} AND weight = ${data.notes[1].weight}
      `;
    }
    else {
      rows = await prisma.$queryRaw`
          SELECT id
          FROM notebooks_notes
          WHERE id = ${data.notes[0].id} AND weight = ${data.notes[0].weight}
             OR id = ${data.notes[1].id} AND weight = ${data.notes[1].weight}
             OR id = ${data.notes[2].id} AND weight = ${data.notes[2].weight}
      `;
    }

    console.log(rows);

    if ((data.position === 'top' || data.position === 'bottom') && rows.length !== 2
        || data.position === 'between' && rows.length !== 3) {
      console.log('rows.length', rows.length);
      return jsonResponse({success: false, notesNeedUpdate: true}, 200);
    }

    let weight = '';
    console.log('org weight: ', data.notes[0].weight, `ID: ${data.notes[0].id}`);
    if (data.position === 'top') {
      weight = getWeight(data.notes[1].weight, '');
    }
    else if (data.position === 'bottom') {
      weight = getWeight('', data.notes[1].weight);
    }
    else {
      weight = getWeight(data.notes[1].weight, data.notes[2].weight);
    }
    console.log('weight: ' + weight);

    // result === 1;
    result = await prisma.$executeRaw`UPDATE notebooks_notes
                                      SET weight = ${weight}
                                      WHERE id = ${data.notes[0].id}`;

    console.log('note crud:' + JSON.stringify(result));

    if (result === 1) {
      return jsonResponse({success: true, weight: weight, notesNeedUpdate: false});
    }
    else {
      return jsonResponse({success: false, weight: weight, notesNeedUpdate: false});
    }
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({success: false, error: 'DB Error'}, 500);
  }
}