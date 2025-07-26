"use client";

import React, { useState, useRef, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Edit3, RefreshCw, Play, Square } from "lucide-react";
import { useStatus } from "@/app/lib/atoms";
import { toast } from "react-toastify";
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

// 循环模式类型定义
// Loop mode type definition
type LoopMode = "none" | "single" | "all";

// 编辑对话框的数据接口
// Interface for edit dialog data
interface SpanEditData {
  ariaLabel: string;
  dataSpeaker: string;
  dataVoiceId: string;
}

// 音频播放状态接口
// Audio playback state interface
interface AudioState {
  isPlaying: boolean;
  currentVoiceId: string | null;
  audio: HTMLAudioElement | null;
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          编辑 Span 属性 / Edit Span Attributes
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">aria-label</label>
            <textarea
              value={formData.ariaLabel}
              onChange={e => setFormData({ ...formData, ariaLabel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              rows={3}
              placeholder="输入 aria-label 内容..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">data-speaker</label>
            <input
              type="text"
              value={formData.dataSpeaker}
              onChange={e => setFormData({ ...formData, dataSpeaker: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="输入 data-speaker 内容..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">data-voice-id</label>
            <input
              type="text"
              value={formData.dataVoiceId}
              onChange={e => setFormData({ ...formData, dataVoiceId: e.target.value })}
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
  // 全局状态管理 - 用于控制 ProcessingMask
  // Global state management - for controlling ProcessingMask
  const [status, setStatus] = useStatus();

  // 编辑对话框状态管理
  // Edit dialog state management
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    spanElement: null as HTMLSpanElement | null,
    data: { ariaLabel: "", dataSpeaker: "", dataVoiceId: "" } as SpanEditData,
  });

  // 语音生成状态
  // Voice generation state
  const [isGeneratingVoice, setIsGeneratingVoice] = useState<string | null>(null);

  // 每个 section 的循环模式设置
  // Loop mode settings for each section
  const [sectionLoopModes, setSectionLoopModes] = useState<Record<string, LoopMode>>({});

  // 音频播放状态
  // Audio playback state
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentVoiceId: null,
    audio: null,
  });

  // 强制重新渲染的状态
  // Force re-render state
  const [renderKey, setRenderKey] = useState(0);
  // 清理音频资源
  // Cleanup audio resources
  useEffect(() => {
    return () => {
      if (audioState.audio) {
        audioState.audio.pause();
        audioState.audio = null;
      }
    };
  }, []);

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
    const ariaLabel = spanElement.getAttribute("aria-label") || "";
    const dataSpeaker = spanElement.getAttribute("data-speaker") || "";
    const dataVoiceId = spanElement.getAttribute("data-voice-id") || "";

    setEditDialog({
      isOpen: true,
      spanElement,
      data: { ariaLabel, dataSpeaker, dataVoiceId },
    });
  };

  // 处理编辑保存
  // Handle edit save
  const handleEditSave = (data: SpanEditData) => {
    if (editDialog.spanElement) {
      editDialog.spanElement.setAttribute("aria-label", data.ariaLabel);
      editDialog.spanElement.setAttribute("data-speaker", data.dataSpeaker);
      editDialog.spanElement.setAttribute("data-voice-id", data.dataVoiceId);

      // 触发重新渲染（通过修改元素内容）
      // Trigger re-render by modifying element content
      const event = new Event("input", { bubbles: true });
      editDialog.spanElement.dispatchEvent(event);
    }
  };

  // 处理音频播放
  // Handle audio playback
  const handlePlayAudio = (voiceId: string, sectionTitle: string) => {
    console.log('handlePlayAudio called:', { voiceId, isPlaying: audioState.isPlaying, currentVoiceId: audioState.currentVoiceId });
    
    // 如果当前正在播放相同的音频，则停止播放
    // If currently playing the same audio, stop it
    if (audioState.isPlaying && audioState.currentVoiceId === voiceId) {
      console.log('Stopping audio for voiceId:', voiceId);
      stopAudio();
      return;
    }

    // 停止当前播放的音频（如果有的话）
    // Stop currently playing audio (if any)
    if (audioState.audio) {
      const currentAudio = audioState.audio;
      // 移除当前音频的事件监听器
      // Remove current audio event listeners
      if ((currentAudio as any)._onCanPlay) {
        currentAudio.removeEventListener("canplay", (currentAudio as any)._onCanPlay);
      }
      if ((currentAudio as any)._onEnded) {
        currentAudio.removeEventListener("ended", (currentAudio as any)._onEnded);
      }
      if ((currentAudio as any)._onError) {
        currentAudio.removeEventListener("error", (currentAudio as any)._onError);
      }
      
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = "";
      console.log('Previous audio stopped and cleaned up');
    }

    // 获取当前 section 的循环模式
    // Get current section's loop mode
    const loopMode = sectionLoopModes[sectionTitle] || "none";

    // 构建音频文件路径
    // Build audio file path
    const tid = noteData.tid;
    const tidToDirectoryMap: Record<string, string> = {
      "21": "chinese-compositions",
      "22": "chinese-poetry",
      "23": "chinese-literature",
      "24": "chinese-essays",
      "25": "chinese-novels",
    };

    const directory = tidToDirectoryMap[String(tid)];
    if (!directory) {
      toast.error("无效的 tid，无法确定音频文件路径");
      return;
    }

    const voiceName = process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE || "zh-CN-XiaoxiaoNeural";
    const firstChar = voiceId.charAt(0).toLowerCase();
    const audioPath = `/refs/notes/${directory}/${voiceName}/${firstChar}/${voiceId}.wav`;

    // 创建新的音频对象
    // Create new audio object
    const audio = new Audio(audioPath);

    // 设置循环模式
    // Set loop mode
    if (loopMode === "single" || loopMode === "all") {
      audio.loop = true;
    }

    // 定义事件监听器函数，以便正确移除
    // Define event listener functions for proper removal
    const onCanPlay = () => {
      console.log('Audio can play, setting state and starting playback');
      setAudioState({
        isPlaying: true,
        currentVoiceId: voiceId,
        audio: audio,
      });
      setRenderKey(prev => prev + 1);

      audio
        .play()
        .then(() => {
          toast.success("开始播放音频");
        })
        .catch(error => {
          console.error("音频播放失败:", error);
          toast.error("音频播放失败");
          setAudioState({
            isPlaying: false,
            currentVoiceId: null,
            audio: null,
          });
          setRenderKey(prev => prev + 1);
        });
    };

    const onEnded = () => {
      console.log('Audio ended, checking loop mode');
      // 检查当前循环模式（可能在播放过程中被改变）
      // Check current loop mode (might have been changed during playback)
      const currentLoopMode = sectionLoopModes[sectionTitle] || "none";
      if (currentLoopMode === "none") {
        setAudioState({
          isPlaying: false,
          currentVoiceId: null,
          audio: null,
        });
        setRenderKey(prev => prev + 1);
        toast.info("音频播放完毕");
      }
      // 对于 single 和 all 模式，由于设置了 loop=true，会自动循环
      // For single and all modes, it will loop automatically due to loop=true
    };

    const onError = () => {
      console.error("音频加载失败:", audioPath);
      toast.error("音频文件加载失败");
      setAudioState({
        isPlaying: false,
        currentVoiceId: null,
        audio: null,
      });
      setRenderKey(prev => prev + 1);
    };

    // 设置音频事件监听器
    // Set audio event listeners
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // 将事件监听器函数保存到音频对象上，以便后续移除
    // Save event listener functions to audio object for later removal
    (audio as any)._onCanPlay = onCanPlay;
    (audio as any)._onEnded = onEnded;
    (audio as any)._onError = onError;

    // 开始加载音频
    // Start loading audio
    audio.load();
  };

  // 停止音频播放
  // Stop audio playback
  const stopAudio = () => {
    console.log('stopAudio called, current state:', { isPlaying: audioState.isPlaying, currentVoiceId: audioState.currentVoiceId });
    
    if (audioState.audio) {
      // 移除所有事件监听器，防止重复触发
      // Remove all event listeners to prevent duplicate triggers
      const audio = audioState.audio;
      if ((audio as any)._onCanPlay) {
        audio.removeEventListener("canplay", (audio as any)._onCanPlay);
      }
      if ((audio as any)._onEnded) {
        audio.removeEventListener("ended", (audio as any)._onEnded);
      }
      if ((audio as any)._onError) {
        audio.removeEventListener("error", (audio as any)._onError);
      }
      
      // 停止并重置音频
      // Stop and reset audio
      audio.pause();
      audio.currentTime = 0;
      audio.src = ""; // 清空音频源
      console.log('Audio stopped and reset');
    }
    
    setAudioState({
      isPlaying: false,
      currentVoiceId: null,
      audio: null,
    });
    // 强制重新渲染以更新图标
    // Force re-render to update icons
    setRenderKey(prev => prev + 1);
    toast.info("音频播放已停止");
  };

  // 设置 section 的循环模式
  // Set section loop mode
  const setSectionLoopMode = (sectionTitle: string, mode: LoopMode) => {
    setSectionLoopModes(prev => ({
      ...prev,
      [sectionTitle]: mode,
    }));

    // 如果当前正在播放该 section 的音频，更新循环设置
    // If currently playing audio from this section, update loop settings
    if (audioState.isPlaying && audioState.audio) {
      // 查找当前播放的音频属于哪个 section
      // Find which section the currently playing audio belongs to
      const currentVoiceId = audioState.currentVoiceId;
      if (currentVoiceId) {
        // 检查当前播放的音频是否属于这个 section
        // Check if the currently playing audio belongs to this section
        const spanElement = document.querySelector(`[data-voice-id="${currentVoiceId}"]`);
        if (spanElement) {
          // 查找包含这个 span 的 section
          // Find the section containing this span
          const sectionElement = spanElement.closest(".mb-6");
          if (sectionElement) {
            const sectionTitleElement = sectionElement.querySelector("h3");
            if (sectionTitleElement && sectionTitleElement.textContent === sectionTitle) {
              // 当前播放的音频属于这个 section，更新循环设置
              // Currently playing audio belongs to this section, update loop settings
              if (mode === "single" || mode === "all") {
                audioState.audio.loop = true;
                toast.info(`已切换到${mode === "single" ? "单句" : "全文"}循环模式`);
              } else {
                audioState.audio.loop = false;
                toast.info("已切换到不循环模式，播放完毕后将停止");
              }
            }
          }
        }
      }
    }
  };

  // 处理语音刷新按钮点击
  // Handle voice refresh button click
  const handleRefreshVoice = async (spanElement: HTMLSpanElement) => {
    const ariaLabel = spanElement.getAttribute("aria-label");
    const dataVoiceId = spanElement.getAttribute("data-voice-id");
    const tid = noteData.tid;

    if (!ariaLabel || !dataVoiceId || !tid) {
      toast.error("缺少必要的参数：aria-label、data-voice-id 或 tid");
      return;
    }

    // 启用 ProcessingMask 防止误操作
    // Enable ProcessingMask to prevent misoperations
    setStatus(prev => ({
      ...prev,
      isProcessing: true,
    }));

    setIsGeneratingVoice(dataVoiceId);

    try {
      const response = await fetch("/api/notebooks/notes/voice/chinese", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ariaLabel,
          voiceId: dataVoiceId,
          tid,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("语音生成成功！/ Voice generated successfully!");
      } else {
        toast.error(`语音生成失败：${result.error}`);
      }
    } catch (error) {
      console.error("语音生成请求失败:", error);
      toast.error("语音生成请求失败，请检查网络连接");
    } finally {
      // 关闭 ProcessingMask
      // Disable ProcessingMask
      setStatus(prev => ({
        ...prev,
        isProcessing: false,
      }));

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
      const modifiedOpenTag = openTag.replace(">", ` data-span-id="${spanId}">`);

      // 提取 data-voice-id 来判断播放状态
      // Extract data-voice-id to determine play state
      const voiceIdMatch = openTag.match(/data-voice-id="([^"]*)"/); 
      const voiceId = voiceIdMatch ? voiceIdMatch[1] : "";
      const isCurrentlyPlaying = audioState.isPlaying && audioState.currentVoiceId === voiceId;

      // 调试信息
      if (voiceId) {
        console.log('Icon generation for voiceId:', voiceId, { isPlaying: audioState.isPlaying, currentVoiceId: audioState.currentVoiceId, isCurrentlyPlaying });
      }

      // 根据播放状态选择图标
      // Choose icon based on play state
      const playIcon = isCurrentlyPlaying ? "⏹️" : "▶️";
      const playTitle = isCurrentlyPlaying ? "停止播放 / Stop Audio" : "播放音频 / Play Audio";

      return `${modifiedOpenTag}${innerContent}${closeTag}<span class="span-icons" data-target="${spanId}" style="margin-left: 4px; opacity: 0.7;"><button class="icon-btn edit-btn" data-action="edit" data-target="${spanId}" style="background: none; border: none; cursor: pointer; padding: 2px; margin: 0 1px; color: #666; hover:color: #333;" title="编辑 / Edit">✏️</button><button class="icon-btn refresh-btn" data-action="refresh" data-target="${spanId}" style="background: none; border: none; cursor: pointer; padding: 2px; margin: 0 1px; color: #666; hover:color: #333;" title="刷新语音 / Refresh Voice">🔄</button><button class="icon-btn play-btn" data-action="play" data-target="${spanId}" style="background: none; border: none; cursor: pointer; padding: 2px; margin: 0 1px; color: #666; hover:color: #333;" title="${playTitle}">${playIcon}</button></span>`;
    });
  };

  // 创建内容点击处理器的工厂函数
  // Factory function for content click handlers
  const createContentClickHandler = (sectionTitle: string) => {
    return (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("icon-btn")) {
        e.preventDefault();
        e.stopPropagation();

        const action = target.getAttribute("data-action");
        const spanId = target.getAttribute("data-target");

        if (spanId) {
          const spanElement = document.querySelector(`[data-span-id="${spanId}"]`) as HTMLSpanElement;

          if (spanElement) {
            if (action === "edit") {
              handleEditClick(spanElement);
            } else if (action === "refresh") {
              handleRefreshVoice(spanElement);
            } else if (action === "play") {
              const voiceId = spanElement.getAttribute("data-voice-id");
              if (voiceId) {
                handlePlayAudio(voiceId, sectionTitle);
              } else {
                toast.error("缺少 data-voice-id 属性");
              }
            }
          }
        }
      }
    };
  };

  const renderSection = (title: string, content: string | undefined) => {
    if (!content || content.trim() === "") return null;

    // 为内容添加图标（依赖 renderKey 确保重新渲染）
    // Add icons to content (depends on renderKey for re-rendering)
    const contentWithIcons = addIconsToSpans(content);

    // 获取当前 section 的循环模式
    // Get current section's loop mode
    const currentLoopMode = sectionLoopModes[title] || "none";

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>

          {/* 循环模式选择器 / Loop mode selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">循环模式:</span>
            <div className="flex space-x-1">
              <label className="flex items-center space-x-1 text-sm">
                <input
                  type="radio"
                  name={`loop-${title}`}
                  value="none"
                  checked={currentLoopMode === "none"}
                  onChange={() => setSectionLoopMode(title, "none")}
                  className="w-3 h-3"
                />
                <span className="text-gray-600 dark:text-gray-300">不循环</span>
              </label>
              <label className="flex items-center space-x-1 text-sm">
                <input
                  type="radio"
                  name={`loop-${title}`}
                  value="single"
                  checked={currentLoopMode === "single"}
                  onChange={() => setSectionLoopMode(title, "single")}
                  className="w-3 h-3"
                />
                <span className="text-gray-600 dark:text-gray-300">单句循环</span>
              </label>
              <label className="flex items-center space-x-1 text-sm">
                <input
                  type="radio"
                  name={`loop-${title}`}
                  value="all"
                  checked={currentLoopMode === "all"}
                  onChange={() => setSectionLoopMode(title, "all")}
                  className="w-3 h-3"
                />
                <span className="text-gray-600 dark:text-gray-300">全文循环</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <MathJax hideUntilTypeset="first">
            <div
              dangerouslySetInnerHTML={{ __html: contentWithIcons }}
              className="body-content prose max-w-none dark:prose-invert"
              onClick={createContentClickHandler(title)}
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
