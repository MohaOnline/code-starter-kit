'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from './components/Toast';

// Topic 接口定义 / Topic interface definition
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
  isNew?: boolean; // 标记是否为新建的临时 topic / Mark if it's a newly created temporary topic
}

// Type 接口定义 / Type interface definition
interface TopicType {
  id: number;
  pid: number;
  title: string;
  title_sub?: string;
}

const TopicsEditor: React.FC = () => {
  // Toast 钩子 / Toast hook
  const { showSuccess, showError, showWarning, ToastContainer } = useToast();

  // 状态管理 / State management
  const [topics, setTopics] = useState<Topic[]>([]);
  const [types, setTypes] = useState<TopicType[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [originalTopic, setOriginalTopic] = useState<Topic | null>(null); // 保存原始状态用于取消操作 / Save original state for cancel operation
  const [selectedTypeId, setSelectedTypeId] = useState<number>(0); // 0 表示显示所有类型 / 0 means show all types
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedTopic, setDraggedTopic] = useState<Topic | null>(null);

  // 获取所有 types / Fetch all types
  const fetchTypes = useCallback(async () => {
    try {
      const res = await fetch('/api/notebooks/types/list');
      const data = await res.json();
      
      if (data.success) {
        const convertedTypes = data.types.map((type: any) => ({
          ...type,
          id: Number(type.id),
          pid: Number(type.pid)
        }));
        setTypes(convertedTypes);
      } else {
        showError(data.error || 'Failed to fetch types');
      }
    } catch (err) {
      showError('Failed to fetch types');
      console.error('Fetch types error:', err);
    }
  }, []);

  // 获取所有 topics / Fetch all topics
  const fetchTopics = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching topics...');
      
      // 构建查询参数 / Build query parameters
      const params = new URLSearchParams();
      if (selectedTypeId > 0) {
        params.append('type_id', selectedTypeId.toString());
      }
      
      const url = `/api/notebooks/topics/augment${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      
      console.log('API Response:', data);
      
      if (data.success) {
        // 转换数据类型 / Convert data types
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
        showError(data.error || 'Failed to fetch topics');
      }
    } catch (err) {
      setError('Failed to fetch topics');
      showError('Failed to fetch topics');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedTypeId]);

  // 初始化数据 / Initialize data
  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  // 保存当前 topic / Save current topic
  const saveCurrentTopic = async () => {
    if (!currentTopic) return;

    try {
      let res;
      let data;

      if (currentTopic.isNew) {
        // 创建新 topic / Create new topic
        res = await fetch('/api/notebooks/topics/augment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pid: currentTopic.pid,
            title: currentTopic.title,
            note: currentTopic.note,
            type_id: currentTopic.type_id || 0,
          }),
        });
      } else {
        // 更新现有 topic / Update existing topic
        res = await fetch('/api/notebooks/topics/augment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentTopic.id,
            title: currentTopic.title,
            note: currentTopic.note,
            type_id: currentTopic.type_id || 0,
          }),
        });
      }

      data = await res.json();
      
      if (data.success) {
        showSuccess(data.message || 'Topic saved successfully');
        // 重新获取数据以确保同步 / Refetch data to ensure synchronization
        await fetchTopics();
        // 清除新建标记 / Clear new topic flag
        if (currentTopic.isNew) {
          setCurrentTopic({ ...currentTopic, isNew: false, id: data.data.id });
        }
        setOriginalTopic(null);
      } else {
        showError(data.error || 'Failed to save topic');
      }
    } catch (err) {
      showError('Failed to save topic');
      console.error(err);
    }
  };

  // 取消编辑 / Cancel editing
  const cancelEdit = () => {
    if (currentTopic?.isNew) {
      // 如果是新建的 topic，移除它并恢复之前的选中状态 / If it's a new topic, remove it and restore previous selection
      setTopics(topics.filter(t => !t.isNew));
      setCurrentTopic(originalTopic);
    } else if (originalTopic) {
      // 恢复原始状态 / Restore original state
      setCurrentTopic(originalTopic);
      setTopics(topics.map(t => t.id === originalTopic.id ? originalTopic : t));
    }
    setOriginalTopic(null);
  };

  // 删除当前 topic / Delete current topic
  const deleteCurrentTopic = async () => {
    if (!currentTopic || currentTopic.isNew) return;

    if (!confirm(`确定要删除 topic "${currentTopic.title}" 吗？\nAre you sure you want to delete topic "${currentTopic.title}"?`)) {
      return;
    }

    try {
      const res = await fetch('/api/notebooks/topics/augment/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: currentTopic.id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        showSuccess(data.message || 'Topic deleted successfully');
        // 重新获取数据 / Refetch data
        await fetchTopics();
        // 清除当前选中 / Clear current selection
        setCurrentTopic(null);
        setOriginalTopic(null);
      } else {
        showError(data.error || 'Failed to delete topic');
      }
    } catch (err) {
      showError('Failed to delete topic');
      console.error(err);
    }
  };

  // 选中 topic / Select topic
  const selectTopic = (topic: Topic) => {
    // 保存当前编辑状态 / Save current editing state
    if (currentTopic && !originalTopic) {
      setOriginalTopic({ ...currentTopic });
    }
    setCurrentTopic({ ...topic });
  };

  // 添加新 topic / Add new topic
  const addNewTopic = (position: 'before' | 'after' | 'child' | 'root') => {
    if (!currentTopic && topics.length > 0 && position !== 'root') {
      showError('请先选择一个 topic / Please select a topic first');
      return;
    }

    // 保存当前状态 / Save current state
    if (currentTopic && !originalTopic) {
      setOriginalTopic({ ...currentTopic });
    }

    // 生成临时 ID / Generate temporary ID
    const tempId = Date.now();
    let newPid = 0;

    switch (position) {
      case 'child':
        newPid = currentTopic?.id || 0;
        break;
      case 'before':
      case 'after':
        newPid = currentTopic?.pid || 0;
        break;
      case 'root':
        newPid = 0;
        break;
    }

    const newTopic: Topic = {
      id: tempId,
      pid: newPid,
      title: 'New Topic',
      note: '',
      weight: '999999',
      type_id: selectedTypeId > 0 ? selectedTypeId : 0,
      isNew: true
    };

    // 添加到 topics 列表 / Add to topics list
    setTopics([...topics, newTopic]);
    setCurrentTopic(newTopic);
  };

  // 构建树形结构 / Build tree structure
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

  // 处理拖拽开始 / Handle drag start
  const handleDragStart = (e: React.DragEvent, topic: Topic) => {
    setDraggedTopic(topic);
    e.dataTransfer.effectAllowed = 'move';
  };

  // 处理拖拽进入 / Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // 处理放置 / Handle drop
  const handleDrop = (e: React.DragEvent, targetTopic: Topic, position: 'above' | 'below' | 'inside') => {
    e.preventDefault();

    if (!draggedTopic) return;

    // 防止将父级拖到自己的子级中 / Prevent dragging parent into its own child
    const isChildOfDragged = (topic: Topic): boolean => {
      if (topic.id === draggedTopic.id) return true;
      if (topic.pid === 0) return false;

      const parent = topics.find(t => t.id === topic.pid);
      return parent ? isChildOfDragged(parent) : false;
    };

    if (isChildOfDragged(targetTopic)) {
      showError('不能将父级 topic 拖到其子级中 / Cannot move a parent topic into its own child');
      return;
    }

    // 创建新的 topics 数组 / Create new topics array
    const newTopics = [...topics];

    // 找到被拖拽的 topic 并更新其 pid / Find dragged topic and update its pid
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

    // 重新计算所有 topic 的 weight / Recalculate all topics' weight
    const sortedTopics = rebuildWeights(buildTree(newTopics));

    // 更新状态 / Update state
    updatePositions(sortedTopics);
    setDraggedTopic(null);
  };

  // 重新构建 weight / Rebuild weights
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

  // 更新 topics 位置 / Update topics positions
  const updatePositions = async (updatedTopics: Topic[]) => {
    try {
      const res = await fetch('/api/notebooks/topics/augment/updatePositions', {
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
        showSuccess(data.message || 'Topic positions updated');
      } else {
        showError(data.error || 'Failed to update positions');
      }
    } catch (err) {
      showError('Failed to update positions');
      console.error(err);
    }
  };

  // 渲染 topic 树 / Render topic tree
  const renderTopicTree = (topicsList: Topic[]) => {
    console.log('Rendering topic tree with topics:', topicsList);
    const tree = buildTree(topicsList);
    console.log('Built tree:', tree);

    if (tree.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">暂无 topics / No topics found</div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => addNewTopic('root')}
          >
            创建第一个 Topic / Create First Topic
          </button>
        </div>
      );
    }

    return tree.map(topic => renderTopic(topic, 0));
  };

  // 渲染单个 topic / Render single topic
  const renderTopic = (topic: Topic, level: number) => {
    console.log('Rendering topic:', topic, 'at level:', level);
    const isSelected = currentTopic?.id === topic.id;
    const isNew = topic.isNew;

    const marginClass = level === 0 ? '' : level === 1 ? 'ml-4' : level === 2 ? 'ml-8' : level === 3 ? 'ml-12' : 'ml-16';

    return (
      <div key={topic.id} className={marginClass}>
        {/* 拖拽放置区域 - 上方 / Drop zone - above */}
        <div
          className="h-2 mx-2 rounded hover:bg-blue-200 transition-colors"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, topic, 'above')}
        />

        {/* Topic 主体 / Topic main body */}
        <div
          className={`p-3 cursor-pointer hover:bg-gray-50 rounded-md mb-1 border-l-4 transition-all ${
            isSelected
              ? 'bg-blue-50 border-blue-500 shadow-sm'
              : isNew
                ? 'bg-yellow-50 border-yellow-400'
                : 'border-transparent hover:border-gray-300'
          }`}
          onClick={() => selectTopic(topic)}
          draggable={!isNew}
          onDragStart={(e) => handleDragStart(e, topic)}
          onDragOver={handleDragOver}
        >
          <div className="flex items-center">
            {!isNew && (
              <div className="mr-3 text-gray-400 cursor-move hover:text-gray-600">
                ⋮⋮
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center">
                <div className="font-medium text-gray-800">
                  {topic.title}
                  {isNew && (
                    <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                      新建 / New
                    </span>
                  )}
                </div>
                {topic.type_id && topic.type_id > 0 && (
                  <div className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    {types.find(t => t.id === topic.type_id)?.title || `Type ${topic.type_id}`}
                  </div>
                )}
              </div>
              {topic.note && (
                <div className="text-sm text-gray-600 truncate mt-1">
                  {topic.note}
                </div>
              )}
              <div className="text-xs text-gray-400 mt-1">
                ID: {topic.id} | PID: {topic.pid} | Weight: {topic.weight}
              </div>
            </div>
          </div>
        </div>

        {/* 子 topics / Child topics */}
        {topic.children && topic.children.length > 0 && (
          <div className="ml-6 border-l-2 border-gray-100 pl-2">
            {topic.children.map(child => renderTopic(child, level + 1))}
          </div>
        )}

        {/* 子 topics 容器放置区域 / Child topics container drop zone */}
        <div
          className="h-3 mx-4 rounded hover:bg-green-200 transition-colors"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, topic, 'inside')}
        >
          {(!topic.children || topic.children.length === 0) && (
            <div className="text-xs text-gray-400 text-center py-1">
              拖拽到此处成为子级 / Drop here to make child
            </div>
          )}
        </div>

        {/* 拖拽放置区域 - 下方 / Drop zone - below */}
        <div
          className="h-2 mx-2 rounded hover:bg-blue-200 transition-colors"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, topic, 'below')}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Topics 编辑器 / Topics Editor
        </h1>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">加载中... / Loading...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            错误 / Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
            {/* 左侧显示区 / Left display area */}
            <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-4 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Topics 列表 / Topics List
              </h2>
              
              {/* Type 过滤器 / Type filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-600">
                  类型过滤 / Type Filter:
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedTypeId}
                  onChange={(e) => setSelectedTypeId(Number(e.target.value))}
                >
                  <option value={0}>全部类型 / All Types</option>
                  {types.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.title} {type.title_sub && `(${type.title_sub})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topics 树形显示区域 / Topics tree display area */}
              <div className="border border-gray-200 rounded-md p-2 min-h-[400px] overflow-y-auto">
                {renderTopicTree(topics)}
              </div>
            </div>

            {/* 右侧操作区 / Right operation area */}
            <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                编辑 Topic / Edit Topic
              </h2>
              
              {currentTopic ? (
                <div className="flex-1 flex flex-col">
                  {/* 编辑表单 / Edit form */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-600">
                        标题 / Title:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={currentTopic.title}
                        onChange={(e) => setCurrentTopic({...currentTopic, title: e.target.value})}
                        placeholder="请输入标题 / Enter title"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-600">
                        类型 / Type:
                      </label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={currentTopic.type_id || 0}
                        onChange={(e) => setCurrentTopic({...currentTopic, type_id: Number(e.target.value)})}
                      >
                        <option value={0}>无类型 / No Type</option>
                        {types.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.title} {type.title_sub && `(${type.title_sub})`}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-gray-600">
                        备注 / Note:
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={6}
                        value={currentTopic.note}
                        onChange={(e) => setCurrentTopic({...currentTopic, note: e.target.value})}
                        placeholder="请输入备注 / Enter note"
                      />
                    </div>
                  </div>
                  
                  {/* 操作按钮 / Action buttons */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex space-x-3">
                      <button
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={saveCurrentTopic}
                      >
                        保存 / Save
                      </button>
                      <button
                        className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        onClick={cancelEdit}
                      >
                        取消 / Cancel
                      </button>
                    </div>

                    {/* 删除按钮 / Delete button */}
                    {currentTopic && !currentTopic.isNew && (
                      <div className="flex">
                        <button
                          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          onClick={deleteCurrentTopic}
                        >
                          删除 Topic / Delete Topic
                        </button>
                      </div>
                    )}

                    {/* 新建按钮组 / New topic buttons */}
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3 text-gray-700">
                        新建 Topic / Add New Topic:
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:bg-gray-400"
                          onClick={() => addNewTopic('before')}
                          disabled={!currentTopic}
                        >
                          之前 / Before
                        </button>
                        <button
                          className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:bg-gray-400"
                          onClick={() => addNewTopic('after')}
                          disabled={!currentTopic}
                        >
                          之后 / After
                        </button>
                        <button
                          className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:bg-gray-400"
                          onClick={() => addNewTopic('child')}
                          disabled={!currentTopic}
                        >
                          子级 / Child
                        </button>
                      </div>

                      {/* 在最前位置新增按钮 / Add at top button */}
                      {!currentTopic && (
                        <div className="mt-3">
                          <button
                            className="w-full px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                            onClick={() => addNewTopic('root')}
                          >
                            在最前位置新增 / Add at Top
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 使用说明 / Instructions */}
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-medium mb-3 text-gray-700">
                        使用说明 / Instructions:
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>点击左侧 topic 进行选中和编辑 / Click topics on the left to select and edit</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>使用 ⋮⋮ 拖拽手柄重新排序 / Use ⋮⋮ drag handle to reorder</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>拖拽到蓝色区域调整位置 / Drag to blue areas to adjust position</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>拖拽到绿色区域成为子级 / Drag to green areas to make child</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>使用类型过滤器筛选显示 / Use type filter to filter display</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-lg mb-2">请选择一个 Topic 进行编辑</div>
                    <div className="text-sm">Please select a topic to edit</div>
                    <div className="mt-4 text-xs text-gray-400">
                      或者在左侧创建第一个 Topic / Or create the first topic on the left
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast 通知容器 / Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default TopicsEditor;
