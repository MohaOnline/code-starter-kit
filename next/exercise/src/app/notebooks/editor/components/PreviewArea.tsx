"use client";

import React, { useState, useRef, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Edit3, RefreshCw } from "lucide-react";
import "../css/style.css";

interface NoteData {
  id?: number;
  nbid?: number;
  tid?: number;
  title?: string;
  body?: string;
  question?: string;
  answer?: string;
  figures?: string;
  body_script?: string;
  body_extra?: string;
  note?: string;
  note_extra?: string;
  deleted?: boolean;
  created?: string;
  weight?: string;
}

interface PreviewAreaProps {
  noteData: NoteData;
}

// 编辑对话框的数据接口
// Interface for edit dialog data
interface SpanEditData {
  ariaLabel: string;
  dataSpeaker: string;
  dataVoiceId: string;
}

// 编辑对话框组件
// Edit dialog component
interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SpanEditData) => void;
  initialData: SpanEditData;
}

function EditDialog({ isOpen, onClose, onSave, initialData }: EditDialogProps) {
  const [formData, setFormData] = useState<SpanEditData>(initialData);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        ref={dialogRef}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          编辑 Span 属性 / Edit Span Attributes
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              aria-label
            </label>
            <textarea
              value={formData.ariaLabel}
              onChange={(e) => setFormData({ ...formData, ariaLabel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              rows={3}
              placeholder="输入 aria-label 内容..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              data-speaker
            </label>
            <input
              type="text"
              value={formData.dataSpeaker}
              onChange={(e) => setFormData({ ...formData, dataSpeaker: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="输入 data-speaker 内容..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              data-voice-id
            </label>
            <input
              type="text"
              value={formData.dataVoiceId}
              onChange={(e) => setFormData({ ...formData, dataVoiceId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="输入 data-voice-id 内容..."
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            取消 / Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            保存 / Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function PreviewArea({ noteData }: PreviewAreaProps) {
  // 编辑对话框状态管理
  // Edit dialog state management
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    spanElement: null as HTMLSpanElement | null,
    data: { ariaLabel: '', dataSpeaker: '', dataVoiceId: '' } as SpanEditData
  });
  
  // 语音生成状态
  // Voice generation state
  const [isGeneratingVoice, setIsGeneratingVoice] = useState<string | null>(null);
  // MathJax configuration
  const mathJaxConfig = {
    loader: { load: ["[tex]/mhchem"] },
    tex: {
      packages: { "[+]": ["mhchem"] },
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
      processEscapes: true,
      processEnvironments: true,
    },
    options: {
      renderActions: {
        addMenu: [0, "", ""],
      },
      skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      ignoreHtmlClass: "cm-editor|CodeMirror",
    },
    startup: {
      typeset: false,
    },
  };

  // 处理编辑按钮点击
  // Handle edit button click
  const handleEditClick = (spanElement: HTMLSpanElement) => {
    const ariaLabel = spanElement.getAttribute('aria-label') || '';
    const dataSpeaker = spanElement.getAttribute('data-speaker') || '';
    const dataVoiceId = spanElement.getAttribute('data-voice-id') || '';
    
    setEditDialog({
      isOpen: true,
      spanElement,
      data: { ariaLabel, dataSpeaker, dataVoiceId }
    });
  };
  
  // 处理编辑保存
  // Handle edit save
  const handleEditSave = (data: SpanEditData) => {
    if (editDialog.spanElement) {
      editDialog.spanElement.setAttribute('aria-label', data.ariaLabel);
      editDialog.spanElement.setAttribute('data-speaker', data.dataSpeaker);
      editDialog.spanElement.setAttribute('data-voice-id', data.dataVoiceId);
      
      // 触发重新渲染（通过修改元素内容）
      // Trigger re-render by modifying element content
      const event = new Event('input', { bubbles: true });
      editDialog.spanElement.dispatchEvent(event);
    }
  };
  
  // 处理语音刷新按钮点击
  // Handle voice refresh button click
  const handleRefreshVoice = async (spanElement: HTMLSpanElement) => {
    const ariaLabel = spanElement.getAttribute('aria-label');
    const dataVoiceId = spanElement.getAttribute('data-voice-id');
    const tid = noteData.tid;
    
    if (!ariaLabel || !dataVoiceId || !tid) {
      alert('缺少必要的参数：aria-label、data-voice-id 或 tid');
      return;
    }
    
    setIsGeneratingVoice(dataVoiceId);
    
    try {
      const response = await fetch('/api/notebooks/notes/voice/chinese', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ariaLabel,
          voiceId: dataVoiceId,
          tid
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('语音生成成功！/ Voice generated successfully!');
      } else {
        alert(`语音生成失败：${result.error}`);
      }
    } catch (error) {
      console.error('语音生成请求失败:', error);
      alert('语音生成请求失败，请检查网络连接');
    } finally {
      setIsGeneratingVoice(null);
    }
  };
  
  // 为内容添加图标的函数
  // Function to add icons to content
  const addIconsToSpans = (content: string): string => {
    // 使用正则表达式匹配 span 标签
    // Use regex to match span tags
    const spanRegex = /(<span[^>]*aria-label="[^"]*"[^>]*data-voice-id="[^"]*"[^>]*>)(.*?)(<\/span>)/g;
    
    return content.replace(spanRegex, (match, openTag, innerContent, closeTag) => {
      // 为每个匹配的 span 添加唯一的 data-span-id
      // Add unique data-span-id to each matched span
      const spanId = `span-${Math.random().toString(36).substr(2, 9)}`;
      const modifiedOpenTag = openTag.replace('>', ` data-span-id="${spanId}">`);
      
      return `${modifiedOpenTag}${innerContent}${closeTag}<span class="span-icons" data-target="${spanId}" style="margin-left: 4px; opacity: 0.7;"><button class="icon-btn edit-btn" data-action="edit" data-target="${spanId}" style="background: none; border: none; cursor: pointer; padding: 2px; margin: 0 1px; color: #666; hover:color: #333;" title="编辑 / Edit">✏️</button><button class="icon-btn refresh-btn" data-action="refresh" data-target="${spanId}" style="background: none; border: none; cursor: pointer; padding: 2px; margin: 0 1px; color: #666; hover:color: #333;" title="刷新语音 / Refresh Voice">🔄</button></span>`;
    });
  };
  
  // 处理内容区域的点击事件
  // Handle content area click events
  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.classList.contains('icon-btn')) {
      e.preventDefault();
      e.stopPropagation();
      
      const action = target.getAttribute('data-action');
      const spanId = target.getAttribute('data-target');
      
      if (spanId) {
        const spanElement = document.querySelector(`[data-span-id="${spanId}"]`) as HTMLSpanElement;
        
        if (spanElement) {
          if (action === 'edit') {
            handleEditClick(spanElement);
          } else if (action === 'refresh') {
            handleRefreshVoice(spanElement);
          }
        }
      }
    }
  };

  const renderSection = (title: string, content: string | undefined) => {
    if (!content || content.trim() === "") return null;
    
    // 为内容添加图标
    // Add icons to content
    const contentWithIcons = addIconsToSpans(content);

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h3>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <MathJax hideUntilTypeset="first">
            <div
              dangerouslySetInnerHTML={{ __html: contentWithIcons }}
              className="body-content prose max-w-none dark:prose-invert"
              onClick={handleContentClick}
            />
          </MathJax>
        </div>
      </div>
    );
  };

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="h-full overflow-auto">
        {/* 编辑对话框 / Edit Dialog */}
        <EditDialog
          isOpen={editDialog.isOpen}
          onClose={() => setEditDialog({ ...editDialog, isOpen: false })}
          onSave={handleEditSave}
          initialData={editDialog.data}
        />
        {/* Title */}
        {noteData.title && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{noteData.title}</h2>
          </div>
        )}

        {/* Meta Information */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {noteData.id && (
              <div>
                <span className="font-medium">ID:</span> {noteData.id}
              </div>
            )}
            {noteData.nbid && (
              <div>
                <span className="font-medium">Notebook ID:</span> {noteData.nbid}
              </div>
            )}
            {noteData.tid && (
              <div>
                <span className="font-medium">Type ID:</span> {noteData.tid}
              </div>
            )}
            {noteData.weight && (
              <div>
                <span className="font-medium">Weight:</span> {noteData.weight}
              </div>
            )}
            {noteData.created && (
              <div>
                <span className="font-medium">Created:</span> {new Date(noteData.created).toLocaleString()}
              </div>
            )}
            {noteData.deleted && (
              <div className="col-span-2">
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                  DELETED
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Sections */}
        {renderSection("Body", noteData.body)}
        {renderSection("Question", noteData.question)}
        {renderSection("Answer", noteData.answer)}
        {renderSection("Figures", noteData.figures)}
        {renderSection("Body Script", noteData.body_script)}
        {renderSection("Body Extra", noteData.body_extra)}
        {renderSection("Note", noteData.note)}
        {renderSection("Note Extra", noteData.note_extra)}

        {/* Empty State */}
        {!noteData.title &&
          !noteData.body &&
          !noteData.question &&
          !noteData.answer &&
          !noteData.figures &&
          !noteData.body_script &&
          !noteData.body_extra &&
          !noteData.note &&
          !noteData.note_extra && (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-2">No content to preview</p>
                <p className="text-sm">Start editing to see the preview</p>
              </div>
            </div>
          )}
      </div>
    </MathJaxContext>
  );
}
