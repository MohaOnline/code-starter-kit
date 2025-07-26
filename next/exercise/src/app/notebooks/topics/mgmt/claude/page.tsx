"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from '@/components/ui/scroll-area'; // 组件不存在，使用普通 div 替代
import { ChevronRight, ChevronDown, Plus, Save, X, Trash2, GripVertical, FolderOpen, Folder } from "lucide-react";

// 类型定义 / Type definitions
interface Topic {
  id: string;
  pid: string;
  title: string;
  type_id: number;
  note: string;
  note_extra?: string;
  weight: string;
  children?: Topic[];
  isNew?: boolean; // 标记是否为新建的临时 topic
}

interface TopicType {
  id: number;
  pid: number;
  title: string;
  title_sub?: string;
}

interface TreeNode extends Topic {
  level: number;
  isExpanded: boolean;
  hasChildren: boolean;
}

export default function ClaudeTopicsEditor() {
  // 状态管理 / State management
  const [topics, setTopics] = useState<Topic[]>([]);
  const [types, setTypes] = useState<TopicType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>("0");
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 加载 types 数据 / Load types data
  const loadTypes = useCallback(async () => {
    try {
      console.log("🔄 [Claude Topics] Loading types...");
      const response = await fetch("/api/notebooks/types/list");
      const result = await response.json();

      if (result.success) {
        console.log("✅ [Claude Topics] Types loaded:", result.types.length);
        setTypes(result.types);
      } else {
        console.error("❌ [Claude Topics] Failed to load types:", result.error);
        toast.error("加载类型失败 / Failed to load types");
      }
    } catch (error) {
      console.error("❌ [Claude Topics] Error loading types:", error);
      toast.error("加载类型时出错 / Error loading types");
    }
  }, []);

  // 加载 topics 数据 / Load topics data
  const loadTopics = useCallback(async () => {
    try {
      setLoading(true);
      console.log("🔄 [Claude Topics] Loading topics with type_id:", selectedTypeId);

      const url =
        selectedTypeId === "0"
          ? "/api/notebooks/topics/claude"
          : `/api/notebooks/topics/claude?type_id=${selectedTypeId}`;

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        console.log("✅ [Claude Topics] Topics loaded:", result.data.length);
        const topicsWithChildren = buildTopicTree(result.data);
        setTopics(topicsWithChildren);

        // 展开所有根节点 / Expand all root nodes
        const rootIds = result.data.filter((t: Topic) => t.pid === "0").map((t: Topic) => t.id);
        console.log("✅ [Claude Topics] Raw topics:", result.data);
        setExpandedNodes(new Set(rootIds));
        console.log("✅ [Claude Topics] Expanded nodes:", rootIds);
      } else {
        console.error("❌ [Claude Topics] Failed to load topics:", result.error);
        toast.error("加载主题失败 / Failed to load topics");
      }
    } catch (error) {
      console.error("❌ [Claude Topics] Error loading topics:", error);
      toast.error("加载主题时出错 / Error loading topics");
    } finally {
      setLoading(false);
    }
  }, [selectedTypeId]);

  // 构建主题树结构 / Build topic tree structure
  const buildTopicTree = (flatTopics: Topic[]): Topic[] => {
    const topicMap = new Map<string, Topic>();
    const rootTopics: Topic[] = [];

    // 创建映射 / Create mapping
    flatTopics.forEach(topic => {
      topicMap.set(topic.id, { ...topic, children: [] });
    });

    // 构建树结构 / Build tree structure
    flatTopics.forEach(topic => {
      const topicNode = topicMap.get(topic.id)!;

      if (topic.pid === "0") {
        rootTopics.push(topicNode);
      } else {
        const parent = topicMap.get(topic.pid);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(topicNode);
        }
      }
    });

    return rootTopics;
  };

  // 将树结构转换为平铺列表用于显示 / Convert tree to flat list for display
  const flattenTopicsForDisplay = (topics: Topic[], level = 0): TreeNode[] => {
    const result: TreeNode[] = [];

    topics.forEach(topic => {
      const hasChildren = topic.children && topic.children.length > 0;
      const isExpanded = expandedNodes.has(topic.id);

      result.push({
        ...topic,
        level,
        isExpanded,
        hasChildren,
      });

      if (hasChildren && isExpanded) {
        result.push(...flattenTopicsForDisplay(topic.children!, level + 1));
      }
    });

    return result;
  };

  // 切换节点展开状态 / Toggle node expansion
  const toggleExpanded = (topicId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  // 选择当前主题 / Select current topic
  const selectTopic = (topic: Topic) => {
    console.log("🎯 [Claude Topics] Selecting topic:", topic.title);
    setCurrentTopic(topic);
    setEditingTopic({ ...topic });
  };

  // 创建新主题 / Create new topic
  const createNewTopic = (position: "before" | "after" | "child" | "root") => {
    console.log("➕ [Claude Topics] Creating new topic at position:", position);

    const newTopic: Topic = {
      id: Date.now().toString(), // 临时 ID
      pid: "0",
      title: "新主题 / New Topic",
      type_id: selectedTypeId !== "0" ? Number(selectedTypeId) : 0,
      note: "",
      weight: "1000000",
      isNew: true,
    };

    if (position === "child" && currentTopic) {
      newTopic.pid = currentTopic.id;
    }

    setCurrentTopic(newTopic);
    setEditingTopic({ ...newTopic });

    toast.info("已创建新主题，请编辑后保存 / New topic created, please edit and save");
  };

  // 保存主题 / Save topic
  const saveTopic = async () => {
    if (!editingTopic) return;

    try {
      setSaving(true);
      console.log("💾 [Claude Topics] Saving topic:", editingTopic.title);

      const isNew = editingTopic.isNew;
      const url = "/api/notebooks/topics/claude";
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: isNew ? undefined : editingTopic.id,
          title: editingTopic.title,
          note: editingTopic.note,
          type_id: editingTopic.type_id,
          pid: editingTopic.pid,
          weight: editingTopic.weight,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ [Claude Topics] Topic saved successfully");
        toast.success(
          isNew ? "主题创建成功 / Topic created successfully" : "主题更新成功 / Topic updated successfully"
        );

        // 重新加载数据 / Reload data
        await loadTopics();

        // 如果是新建的，更新当前选中的主题 / If new, update current selected topic
        if (isNew && result.data) {
          setCurrentTopic(result.data);
          setEditingTopic({ ...result.data });
        }
      } else {
        console.error("❌ [Claude Topics] Failed to save topic:", result.error);
        toast.error("保存失败 / Save failed: " + result.error);
      }
    } catch (error) {
      console.error("❌ [Claude Topics] Error saving topic:", error);
      toast.error("保存时出错 / Error saving topic");
    } finally {
      setSaving(false);
    }
  };

  // 取消编辑 / Cancel editing
  const cancelEdit = () => {
    console.log("❌ [Claude Topics] Canceling edit");

    if (currentTopic?.isNew) {
      // 如果是新建的主题，清除选择 / If new topic, clear selection
      setCurrentTopic(null);
      setEditingTopic(null);
      toast.info("已取消新建主题 / New topic creation canceled");
    } else if (currentTopic) {
      // 恢复原始数据 / Restore original data
      setEditingTopic({ ...currentTopic });
      toast.info("已取消编辑 / Edit canceled");
    }
  };

  // 删除主题 / Delete topic
  const deleteTopic = async () => {
    if (!currentTopic || currentTopic.isNew) return;

    if (!confirm("确定要删除这个主题吗？/ Are you sure you want to delete this topic?")) {
      return;
    }

    try {
      console.log("🗑️ [Claude Topics] Deleting topic:", currentTopic.title);

      const response = await fetch("/api/notebooks/topics/claude", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentTopic.id }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ [Claude Topics] Topic deleted successfully");
        toast.success("主题删除成功 / Topic deleted successfully");

        setCurrentTopic(null);
        setEditingTopic(null);
        await loadTopics();
      } else {
        console.error("❌ [Claude Topics] Failed to delete topic:", result.error);
        toast.error("删除失败 / Delete failed: " + result.error);
      }
    } catch (error) {
      console.error("❌ [Claude Topics] Error deleting topic:", error);
      toast.error("删除时出错 / Error deleting topic");
    }
  };

  // 初始化加载 / Initial loading
  useEffect(() => {
    loadTypes();
  }, [loadTypes]);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  // 获取类型名称 / Get type name
  const getTypeName = (typeId: number) => {
    const type = types.find(t => t.id === typeId);
    return type ? type.title : "未知类型 / Unknown Type";
  };

  // 渲染主题树节点 / Render topic tree node
  const renderTopicNode = (node: TreeNode) => {
    const isSelected = currentTopic?.id === node.id;
    const indent = node.level * 24;

    return (
      <div
        key={node.id}
        className={`
          flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800
          ${isSelected ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500" : ""}
        `}
        style={{ paddingLeft: `${12 + indent}px` }}
        onClick={() => selectTopic(node)}
      >
        {/* 展开/折叠按钮 / Expand/collapse button */}
        <div className="w-6 h-6 flex items-center justify-center">
          {node.hasChildren ? (
            <button
              onClick={e => {
                e.stopPropagation();
                toggleExpanded(node.id);
              }}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {node.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <div className="w-4 h-4" />
          )}
        </div>

        {/* 拖拽手柄 / Drag handle */}
        <div className="w-6 h-6 flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        {/* 文件夹图标 / Folder icon */}
        <div className="w-6 h-6 flex items-center justify-center mr-2">
          {node.hasChildren ? (
            node.isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500" />
            )
          ) : (
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
          )}
        </div>

        {/* 主题标题 / Topic title */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {node.title}
            {node.isNew && (
              <Badge variant="secondary" className="ml-2 text-xs">
                新建 / New
              </Badge>
            )}
          </div>
          {node.type_id > 0 && <div className="text-xs text-gray-500 truncate">{getTypeName(node.type_id)}</div>}
        </div>
      </div>
    );
  };

  const displayTopics = flattenTopicsForDisplay(topics);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* 左侧显示区 / Left display area */}
      <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
        {/* 头部 / Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Claude Topics 编辑器 / Claude Topics Editor
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            层级主题管理系统 / Hierarchical Topic Management System
          </p>
        </div>

        {/* 主题树 / Topic tree */}
        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">加载中... / Loading...</div>
          ) : displayTopics.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              暂无主题 / No topics found
              <br />
              <Button variant="outline" size="sm" className="mt-2" onClick={() => createNewTopic("root")}>
                <Plus className="w-4 h-4 mr-2" />
                创建第一个主题 / Create First Topic
              </Button>
            </div>
          ) : (
            <div className="py-2">{displayTopics.map(renderTopicNode)}</div>
          )}
        </div>
      </div>

      {/* 右侧操作区 / Right operation area */}
      <div className="w-96 flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        {/* 类型过滤器 / Type filter */}
        <Card className="m-4 mb-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">类型过滤 / Type Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedTypeId} onValueChange={setSelectedTypeId}>
              <SelectTrigger>
                <SelectValue placeholder="选择类型 / Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">所有类型 / All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.title}
                    {type.title_sub && <span className="text-gray-500 ml-2">({type.title_sub})</span>}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* 操作按钮 / Operation buttons */}
        <Card className="mx-4 mb-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">操作 / Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => createNewTopic("root")}>
              <Plus className="w-4 h-4 mr-2" />
              在顶部新建 / New at Top
            </Button>

            {currentTopic && !currentTopic.isNew && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => createNewTopic("before")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  在前面新建 / New Before
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => createNewTopic("after")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  在后面新建 / New After
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => createNewTopic("child")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  在下级新建 / New Child
                </Button>

                <Separator className="my-2" />

                <Button variant="destructive" size="sm" className="w-full justify-start" onClick={deleteTopic}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  删除主题 / Delete Topic
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* 编辑区域 / Edit area */}
        {editingTopic && (
          <Card className="mx-4 mb-4 flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                {editingTopic.isNew ? "新建主题 / New Topic" : "编辑主题 / Edit Topic"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 标题 / Title */}
              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">标题 / Title</label>
                <Input
                  value={editingTopic.title}
                  onChange={e => setEditingTopic(prev => (prev ? { ...prev, title: e.target.value } : null))}
                  placeholder="输入主题标题 / Enter topic title"
                />
              </div>

              {/* 类型 / Type */}
              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">类型 / Type</label>
                <Select
                  value={editingTopic.type_id.toString()}
                  onValueChange={value => setEditingTopic(prev => (prev ? { ...prev, type_id: Number(value) } : null))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型 / Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">无类型 / No Type</SelectItem>
                    {types.map(type => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.title}
                        {type.title_sub && <span className="text-gray-500 ml-2">({type.title_sub})</span>}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 备注 / Note */}
              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">备注 / Note</label>
                <Textarea
                  value={editingTopic.note}
                  onChange={e => setEditingTopic(prev => (prev ? { ...prev, note: e.target.value } : null))}
                  placeholder="输入备注信息 / Enter note information"
                  rows={4}
                />
              </div>

              {/* 操作按钮 / Action buttons */}
              <div className="flex space-x-2 pt-4">
                <Button onClick={saveTopic} disabled={saving} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "保存中... / Saving..." : "保存 / Save"}
                </Button>

                <Button variant="outline" onClick={cancelEdit} disabled={saving}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 当前主题信息 / Current topic info */}
        {currentTopic && !editingTopic && (
          <Card className="mx-4 mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">主题信息 / Topic Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <strong>ID:</strong> {currentTopic.id}
                </div>
                <div>
                  <strong>父级 / Parent:</strong> {currentTopic.pid}
                </div>
                <div>
                  <strong>权重 / Weight:</strong> {currentTopic.weight}
                </div>
                <div>
                  <strong>类型 / Type:</strong> {getTypeName(currentTopic.type_id)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
