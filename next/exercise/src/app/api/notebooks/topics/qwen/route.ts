import { prisma, jsonResponse } from '@/lib/prisma';
import { handleBigInt } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const topics = await prisma.notebooks_topics.findMany({
      orderBy: [
        { pid: 'asc' },
        { weight: 'asc' }
      ]
    });

    // 处理 BigInt 类型
    const processedTopics = handleBigInt(topics);

    return jsonResponse({ 
      success: true, 
      data: processedTopics 
    });
  } catch (error) {
    console.error('Failed to fetch topics:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to fetch topics' 
    }, 500);
  }
}