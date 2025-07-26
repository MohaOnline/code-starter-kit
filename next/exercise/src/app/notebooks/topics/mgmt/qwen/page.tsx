'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Topic {
  id: number;
  pid: number;
  title: string;
  note: string;
  weight: string;
  type_id?: number;
  created?: string;
  updated?: string;
  children?: Topic[];
}

const TopicsEditor: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedTopic, setDraggedTopic] = useState<Topic | null>(null);

  // 获取所有 topics
  const fetchTopics = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching topics...');
      const res = await fetch('/api/notebooks/topics/qwen');
      const data = await res.json();
      
      console.log('API Response:', data);
      
      if (data.success) {
        // 转换数据类型
        const convertedTopics = data.data.map((topic: any) => ({
          ...topic,
          id: Number(topic.id),
          pid: Number(topic.pid),
          type_id: topic.type_id ? Number(topic.type_id) : 0
        }));
        
        console.log('Converted topics:', convertedTopics);
        setTopics(convertedTopics);
      } else {
        setError(data.error || 'Failed to fetch topics');
      }
    } catch (err) {
      setError('Failed to fetch topics');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  // 保存当前 topic
  const saveCurrentTopic = async () => {
    if (!currentTopic) return;

    try {
      const res = await fetch('/api/notebooks/topics/qwen/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: currentTopic.id,
          title: currentTopic.title,
          note: currentTopic.note,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        // 更新本地状态
        setTopics(topics.map(topic => 
          topic.id === currentTopic.id ? currentTopic : topic
        ));
        alert('Topic saved successfully');
      } else {
        setError(data.error || 'Failed to save topic');
      }
    } catch (err) {
      setError('Failed to save topic');
      console.error(err);
    }
  };

  // 添加新 topic
  const addNewTopic = async (position: 'before' | 'after' | 'child') => {
    if (!currentTopic && topics.length > 0) {
      setError('Please select a topic first');
      return;
    }

    try {
      const res = await fetch('/api/notebooks/topics/qwen/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: position === 'child' ? (currentTopic?.id || 0) : (currentTopic?.pid || 0),
          title: 'New Topic',
          note: '',
          position,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        // 添加到列表
        fetchTopics(); // 重新获取完整的列表
        alert('New topic created');
      } else {
        setError(data.error || 'Failed to add topic');
      }
    } catch (err) {
      setError('Failed to add topic');
      console.error(err);
    }
  };

  // 更新 topics 位置
  const updatePositions = async (updatedTopics: Topic[]) => {
    try {
      const res = await fetch('/api/notebooks/topics/qwen/updatePositions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: updatedTopics.map(t => ({
            id: t.id,
            pid: t.pid,
            weight: t.weight
          })),
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        setTopics(updatedTopics);
        alert('Topic positions updated');
      } else {
        setError(data.error || 'Failed to update positions');
      }
    } catch (err) {
      setError('Failed to update positions');
      console.error(err);
    }
  };

  // 构建树形结构
  const buildTree = (topicsList: Topic[], pid: number = 0): Topic[] => {
    console.log('Building tree for pid:', pid, 'from topics:', topicsList);
    return topicsList
      .filter(topic => topic.pid === pid)
      .sort((a, b) => a.weight.localeCompare(b.weight))
      .map(topic => ({
        ...topic,
        children: buildTree(topicsList, topic.id)
      }));
  };

  // 处理拖拽开始
  const handleDragStart = (e: React.DragEvent, topic: Topic) => {
    setDraggedTopic(topic);
    e.dataTransfer.effectAllowed = 'move';
  };

  // 处理拖拽进入
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // 处理放置
  const handleDrop = (e: React.DragEvent, targetTopic: Topic, position: 'above' | 'below' | 'inside') => {
    e.preventDefault();
    
    if (!draggedTopic) return;
    
    // 防止将父级拖到自己的子级中
    const isChildOfDragged = (topic: Topic): boolean => {
      if (topic.id === draggedTopic.id) return true;
      if (topic.pid === 0) return false;
      
      const parent = topics.find(t => t.id === topic.pid);
      return parent ? isChildOfDragged(parent) : false;
    };
    
    if (isChildOfDragged(targetTopic)) {
      alert('Cannot move a parent topic into its own child');
      return;
    }
    
    // 创建新的 topics 数组
    const newTopics = [...topics];
    
    // 找到被拖拽的 topic 并更新其 pid
    const draggedIndex = newTopics.findIndex(t => t.id === draggedTopic.id);
    if (draggedIndex !== -1) {
      const updatedDraggedTopic = { ...newTopics[draggedIndex] };
      
      switch (position) {
        case 'above':
        case 'below':
          updatedDraggedTopic.pid = targetTopic.pid;
          break;
        case 'inside':
          updatedDraggedTopic.pid = targetTopic.id;
          break;
      }
      
      newTopics[draggedIndex] = updatedDraggedTopic;
    }
    
    // 重新计算所有 topic 的 weight
    const sortedTopics = rebuildWeights(buildTree(newTopics));
    
    // 更新状态
    updatePositions(sortedTopics);
    setDraggedTopic(null);
  };

  // 重新构建 weight
  const rebuildWeights = (tree: Topic[], pid: number = 0): Topic[] => {
    const result: Topic[] = [];
    
    const traverse = (nodes: Topic[], parentId: number, prefix: string = '') => {
      nodes.forEach((node, index) => {
        const weight = `${prefix}${String(index + 1).padStart(3, '0')}`;
        result.push({
          ...node,
          pid: parentId,
          weight
        });
        
        if (node.children && node.children.length > 0) {
          traverse(node.children, node.id, `${weight}-`);
        }
      });
    };
    
    traverse(tree, pid);
    return result;
  };

  // 渲染 topic 树
  const renderTopicTree = (topicsList: Topic[]) => {
    console.log('Rendering topic tree with topics:', topicsList);
    const tree = buildTree(topicsList);
    console.log('Built tree:', tree);
    return tree.map(topic => renderTopic(topic, 0));
  };

  // 渲染单个 topic
  const renderTopic = (topic: Topic, level: number) => {
    console.log('Rendering topic:', topic, 'at level:', level);
    return (
      <div key={topic.id} className="ml-4">
        <div 
          className={`p-2 cursor-pointer hover:bg-gray-100 rounded mb-1 ${
            currentTopic?.id === topic.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''
          }`}
          onClick={() => setCurrentTopic(topic)}
          draggable
          onDragStart={(e) => handleDragStart(e, topic)}
          onDragOver={handleDragOver}
        >
          <div className="flex items-center">
            <div className="mr-2 text-gray-400 cursor-move">⋮⋮</div>
            <div className="flex-1">
              <div className="font-medium">{topic.title}</div>
              {topic.note && (
                <div className="text-sm text-gray-600 truncate">{topic.note}</div>
              )}
            </div>
          </div>
        </div>
        
        {/* 拖拽放置区域 */}
        <div 
          className="h-2 mx-2 rounded hover:bg-blue-200"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, topic, 'above')}
        />
        
        {/* 子 topics */}
        {topic.children && topic.children.length > 0 && (
          <div className="ml-4 border-l border-gray-200 pl-2">
            {topic.children.map(child => renderTopic(child, level + 1))}
          </div>
        )}
        
        {/* 子 topics 容器放置区域 */}
        <div 
          className="h-3 mx-4 rounded hover:bg-green-200"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, topic, 'inside')}
        >
          {topic.children && topic.children.length === 0 && (
            <div className="text-xs text-gray-400 text-center py-1">Drop here to make child</div>
          )}
        </div>
        
        {/* 下方放置区域 */}
        <div 
          className="h-2 mx-2 rounded hover:bg-blue-200"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, topic, 'below')}
        />
      </div>
    );
  };

  if (loading) {
    return <div className="p-4">Loading topics...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen">
      {/* 显示区 - 左侧 */}
      <div className="w-1/2 p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Topics</h2>
        <div className="mb-4">
          {topics.length > 0 ? (
            renderTopicTree(topics)
          ) : (
            <div className="text-gray-500">No topics found</div>
          )}
        </div>
      </div>

      {/* 操作区 - 右侧 */}
      <div className="w-1/2 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Edit Topic</h2>
        
        {currentTopic ? (
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={currentTopic.title}
                onChange={(e) => setCurrentTopic({...currentTopic, title: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Note</label>
              <textarea
                className="w-full p-2 border rounded"
                rows={4}
                value={currentTopic.note}
                onChange={(e) => setCurrentTopic({...currentTopic, note: e.target.value})}
              />
            </div>
            
            <div className="flex space-x-2 mb-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={saveCurrentTopic}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={fetchTopics}
              >
                Cancel
              </button>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Add New Topic</h3>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  onClick={() => addNewTopic('before')}
                >
                  Before
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  onClick={() => addNewTopic('after')}
                >
                  After
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  onClick={() => addNewTopic('child')}
                >
                  Child
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">Instructions</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Click on a topic to select it for editing</li>
                <li>Drag topics using the handle (⋮⋮) to reorder</li>
                <li>Drop on the blue areas to move above/below</li>
                <li>Drop on the green area to make it a child</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a topic to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicsEditor;