import { prisma, jsonResponse } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pid, title, note, position } = body; // position: 'before', 'after', 'child'

    // 获取当前最大的 ID 用于设置 weight
    const maxIdResult = await prisma.notebooks_topics.aggregate({
      _max: {
        id: true
      }
    });

    // 修复 BigInt 类型错误
    const maxId = maxIdResult._max.id ? Number(maxIdResult._max.id) : 0;
    const newId = maxId + 1;
    const weight = String(newId).padStart(10, '0');

    // 创建新 topic
    const newTopic = await prisma.notebooks_topics.create({
      data: {
        pid: pid ? Number(pid) : 0,
        title: title || 'New Topic',
        note: note || '',
        weight
      }
    });

    return jsonResponse({ 
      success: true, 
      data: newTopic 
    });
  } catch (error) {
    console.error('Failed to add topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to add topic' 
    }, 500);
  }
}