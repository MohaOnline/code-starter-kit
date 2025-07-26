import { prisma, jsonResponse } from '@/lib/prisma';
import { handleBigInt } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// 获取所有 topics / 根据 type_id 过滤 topics
// GET /api/notebooks/topics/claude?type_id=1
export async function GET(req: NextRequest) {
  try {
    console.log('🔍 [Claude Topics API] GET request received');
    
    const { searchParams } = new URL(req.url);
    const typeId = searchParams.get('type_id');
    
    console.log('📋 [Claude Topics API] Query params - type_id:', typeId);

    let whereClause = {};
    if (typeId && typeId !== '0') {
      whereClause = { type_id: Number(typeId) };
      console.log('🎯 [Claude Topics API] Filtering by type_id:', typeId);
    }

    const topics = await prisma.notebooks_topics.findMany({
      where: whereClause,
      orderBy: [
        { pid: 'asc' },
        { weight: 'asc' }
      ]
    });

    console.log('📊 [Claude Topics API] Found topics count:', topics.length);

    // 处理 BigInt 类型 / Handle BigInt types
    const processedTopics = handleBigInt(topics);

    return jsonResponse({ 
      success: true, 
      data: processedTopics 
    });
  } catch (error) {
    console.error('❌ [Claude Topics API] Failed to fetch topics:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to fetch topics' 
    }, 500);
  }
}

// 创建新 topic
// POST /api/notebooks/topics/claude
export async function POST(req: NextRequest) {
  try {
    console.log('➕ [Claude Topics API] POST request received');
    
    const body = await req.json();
    const { title, note, type_id, pid, weight } = body;
    
    console.log('📝 [Claude Topics API] Creating topic with data:', {
      title,
      note: note?.substring(0, 50) + '...',
      type_id,
      pid,
      weight
    });

    if (!title) {
      console.warn('⚠️ [Claude Topics API] Title is required');
      return jsonResponse({ 
        success: false, 
        error: 'Title is required' 
      }, 400);
    }

    const newTopic = await prisma.notebooks_topics.create({
      data: {
        title: title,
        note: note || '',
        type_id: type_id ? Number(type_id) : 0,
        pid: pid ? Number(pid) : 0,
        weight: weight || '1000000'
      }
    });

    console.log('✅ [Claude Topics API] Topic created with ID:', newTopic.id);

    const processedTopic = handleBigInt(newTopic);

    return jsonResponse({ 
      success: true, 
      data: processedTopic,
      message: 'Topic created successfully'
    });
  } catch (error) {
    console.error('❌ [Claude Topics API] Failed to create topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to create topic' 
    }, 500);
  }
}

// 更新 topic
// PUT /api/notebooks/topics/claude
export async function PUT(req: NextRequest) {
  try {
    console.log('✏️ [Claude Topics API] PUT request received');
    
    const body = await req.json();
    const { id, title, note, type_id } = body;
    
    console.log('📝 [Claude Topics API] Updating topic:', {
      id,
      title,
      note: note?.substring(0, 50) + '...',
      type_id
    });

    if (!id) {
      console.warn('⚠️ [Claude Topics API] Topic ID is required');
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

    console.log('✅ [Claude Topics API] Topic updated successfully');

    const processedTopic = handleBigInt(updatedTopic);

    return jsonResponse({ 
      success: true, 
      data: processedTopic,
      message: 'Topic updated successfully'
    });
  } catch (error) {
    console.error('❌ [Claude Topics API] Failed to update topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to update topic' 
    }, 500);
  }
}

// 删除 topic
// DELETE /api/notebooks/topics/claude
export async function DELETE(req: NextRequest) {
  try {
    console.log('🗑️ [Claude Topics API] DELETE request received');
    
    const body = await req.json();
    const { id } = body;
    
    console.log('🗑️ [Claude Topics API] Deleting topic ID:', id);

    if (!id) {
      console.warn('⚠️ [Claude Topics API] Topic ID is required');
      return jsonResponse({ 
        success: false, 
        error: 'Topic ID is required' 
      }, 400);
    }

    // 检查是否有子 topics / Check for child topics
    const childTopics = await prisma.notebooks_topics.findMany({
      where: { pid: Number(id) }
    });

    if (childTopics.length > 0) {
      console.warn('⚠️ [Claude Topics API] Cannot delete topic with child topics');
      return jsonResponse({ 
        success: false, 
        error: 'Cannot delete topic with child topics' 
      }, 400);
    }

    await prisma.notebooks_topics.delete({
      where: { id: Number(id) }
    });

    console.log('✅ [Claude Topics API] Topic deleted successfully');

    return jsonResponse({ 
      success: true,
      message: 'Topic deleted successfully'
    });
  } catch (error) {
    console.error('❌ [Claude Topics API] Failed to delete topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to delete topic' 
    }, 500);
  }
}