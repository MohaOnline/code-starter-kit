// 共通化拖动修改 DB 相关表中的 weight。

import {getServerSession} from 'next-auth';
import {prisma, jsonResponse} from '@/lib/prisma';
import {Prisma} from '@/prisma/client'; // 要重启 next 应用。

import {authOptions} from '@/app/api/auth/[...nextauth]/route';
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

    let related_table = '';
    let relate_data_name_in_json = '';
    if (data.notes) { // 如果有 notes 数据就当 notes 处理
      related_table = 'notebooks_notes';
      relate_data_name_in_json = 'notes';
    }
    else {
      return jsonResponse({success: false, error: 'Unknow how to handle data...'}, 403);
    }

    let rows;
    if (data.position === 'top' || data.position === 'bottom') {
      rows = await prisma.$queryRaw`
          SELECT id
          FROM ${Prisma.raw(related_table)}
          WHERE (id = ${data[relate_data_name_in_json][0].id} AND weight = ${data[relate_data_name_in_json][0].weight})
             OR (id = ${data[relate_data_name_in_json][1].id} AND weight = ${data[relate_data_name_in_json][1].weight})
      `;
    }
    else {
      rows = await prisma.$queryRaw`
          SELECT id
          FROM ${Prisma.raw(related_table)}
          WHERE (id = ${data[relate_data_name_in_json][0].id} AND weight = ${data[relate_data_name_in_json][0].weight})
             OR (id = ${data[relate_data_name_in_json][1].id} AND weight = ${data[relate_data_name_in_json][1].weight})
             OR (id = ${data[relate_data_name_in_json][2].id} AND weight = ${data[relate_data_name_in_json][2].weight})
      `;
    }

    console.log(rows);

    if ((data.position === 'top' || data.position === 'bottom') && rows.length !== 2
        || data.position === 'between' && rows.length !== 3) {
      console.log('rows.length', rows.length);
      return jsonResponse({success: false, [`${relate_data_name_in_json}NeedUpdate`]: true}, 200);
    }

    let weight = '';
    console.log('org weight: ', data[relate_data_name_in_json][0].weight, `ID: ${data[relate_data_name_in_json][0].id}`);
    if (data.position === 'top') {
      weight = getWeight(data[relate_data_name_in_json][1].weight, '');
    }
    else if (data.position === 'bottom') {
      weight = getWeight('', data[relate_data_name_in_json][1].weight);
    }
    else {
      weight = getWeight(data[relate_data_name_in_json][1].weight, data[relate_data_name_in_json][2].weight);
    }
    console.log('weight: ' + weight);

    // result === 1;
    result = await prisma.$executeRaw`UPDATE ${Prisma.raw(related_table)}
                                      SET weight = ${weight}
                                      WHERE id = ${data[relate_data_name_in_json][0].id}`;

    console.log('note crud:' + JSON.stringify(result));

    if (result === 1) {
      return jsonResponse({success: true, weight: weight, [`${relate_data_name_in_json}NeedUpdate`]: false});
    }
    else {
      return jsonResponse({success: false, weight: weight, [`${relate_data_name_in_json}NeedUpdate`]: false});
    }
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({success: false, error: 'DB Error'}, 500);
  }
}