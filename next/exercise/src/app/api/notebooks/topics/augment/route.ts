import { prisma, jsonResponse } from '@/lib/prisma';
import { handleBigInt } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// 获取所有 topics / 根据 type_id 过滤 topics
// GET /api/notebooks/topics/augment?type_id=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeId = searchParams.get('type_id');

    let whereClause = {};
    if (typeId && typeId !== '0') {
      whereClause = { type_id: Number(typeId) };
    }

    const topics = await prisma.notebooks_topics.findMany({
      where: whereClause,
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

// 创建新 topic
// POST /api/notebooks/topics/augment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pid, title, note, type_id, position } = body;

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
        type_id: type_id ? Number(type_id) : 0,
        weight
      }
    });

    const processedTopic = handleBigInt(newTopic);

    return jsonResponse({ 
      success: true, 
      data: processedTopic,
      message: 'Topic created successfully'
    });
  } catch (error) {
    console.error('Failed to create topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to create topic' 
    }, 500);
  }
}

// 更新 topic
// PUT /api/notebooks/topics/augment
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, note, type_id } = body;

    if (!id) {
      return jsonResponse({ 
        success: false, 
        error: 'Topic ID is required' 
      }, 400);
    }

    const updatedTopic = await prisma.notebooks_topics.update({
      where: { id: Number(id) },
      data: {
        title: title || '',
        note: note || '',
        type_id: type_id ? Number(type_id) : 0
      }
    });

    const processedTopic = handleBigInt(updatedTopic);

    return jsonResponse({ 
      success: true, 
      data: processedTopic,
      message: 'Topic updated successfully'
    });
  } catch (error) {
    console.error('Failed to update topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to update topic' 
    }, 500);
  }
}

// 删除 topic
// DELETE /api/notebooks/topics/augment
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return jsonResponse({ 
        success: false, 
        error: 'Topic ID is required' 
      }, 400);
    }

    // 检查是否有子 topics
    const childTopics = await prisma.notebooks_topics.findMany({
      where: { pid: Number(id) }
    });

    if (childTopics.length > 0) {
      return jsonResponse({ 
        success: false, 
        error: 'Cannot delete topic with child topics' 
      }, 400);
    }

    await prisma.notebooks_topics.delete({
      where: { id: Number(id) }
    });

    return jsonResponse({ 
      success: true,
      message: 'Topic deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to delete topic' 
    }, 500);
  }
}
