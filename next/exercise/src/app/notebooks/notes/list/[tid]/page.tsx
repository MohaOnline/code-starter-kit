"use client";

import React, { useState, useEffect, useRef } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Play, Square, SkipBack, SkipForward, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
// 移除不存在的CSS文件导入 / Remove non-existent CSS file import

// 笔记数据接口 / Note data interface
interface NoteData {
  id: number;
  nbid: number;
  tid: number;
  title: string;
  body?: string;
  question?: string;
  answer?: string;
  body_script?: string;
  note?: string;
  note_extra?: string;
  weight: string;
  created: string;
  updated: string;
  deleted: boolean;
  type: string;
  type_sub: string;
  notebook_title: string;
  notebook_title_sub: string;
  topics: string;
  topics_ids: string;
}

// 可选字段类型 / Optional field types
type FieldType = "body" | "question" | "answer" | "body_script" | "note" | "note_extra";

// 循环模式类型 / Loop mode types
type LoopMode = "none" | "single" | "note" | "all";

// 音频播放状态接口 / Audio playback state interface
interface AudioState {
  isPlaying: boolean;
  currentVoiceId: string | null;
  currentNoteId: number | null;
  audio: HTMLAudioElement | null;
}

// 当前播放状态接口 / Current playback state interface
interface CurrentPlayState {
  noteId: number | null;
  spanIndex: number;
  voiceId: string | null;
}

// 页面属性接口 / Page props interface
interface PageProps {
  params: Promise<{ tid: string }>;
}

export default function NotesListPage({ params }: PageProps) {
  // 解析路由参数 / Parse route parameters
  const [tid, setTid] = useState<string>("");
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 字段过滤器状态 / Field filter state
  const [selectedField, setSelectedField] = useState<FieldType>("body_script");
  
  // 播放控制状态 / Playback control state
  const [loopMode, setLoopMode] = useState<LoopMode>("none");
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentVoiceId: null,
    currentNoteId: null,
    audio: null,
  });
  const [currentPlayState, setCurrentPlayState] = useState<CurrentPlayState>({
    noteId: null,
    spanIndex: 0,
    voiceId: null,
  });
  
  // 强制重新渲染状态 / Force re-render state
  const [renderKey, setRenderKey] = useState(0);

  // MathJax 配置 / MathJax configuration
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

  // 解析路由参数 / Parse route parameters
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setTid(resolvedParams.tid);
    };
    getParams();
  }, [params]);

  // 获取笔记数据 / Fetch notes data
  useEffect(() => {
    if (!tid) return;
    
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/notebooks/notes/list/${tid}`);
        const result = await response.json();
        
        if (result.success) {
          setNotes(result.notes);
        } else {
          setError(result.error || "获取笔记数据失败");
        }
      } catch (err) {
        setError("网络错误，无法获取笔记数据");
        console.error("Fetch notes error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, [tid]);

  // 清理音频资源 / Cleanup audio resources
  useEffect(() => {
    return () => {
      if (audioState.audio) {
        audioState.audio.pause();
        audioState.audio.src = "";
      }
    };
  }, []);

  // 从HTML内容中提取span元素 / Extract span elements from HTML content
  const extractSpansFromContent = (content: string): Array<{ voiceId: string; text: string; ariaLabel: string }> => {
    if (!content) return [];
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const spans = doc.querySelectorAll("span[data-voice-id]");
    
    return Array.from(spans).map(span => ({
      voiceId: span.getAttribute("data-voice-id") || "",
      text: span.textContent || "",
      ariaLabel: span.getAttribute("aria-label") || span.textContent || "",
    })).filter(item => item.voiceId && item.text);
  };

  // 构建音频文件路径 / Build audio file path
  const buildAudioPath = (voiceId: string): string => {
    const tidToDirectoryMap: Record<string, string> = {
      "21": "chinese-compositions",
      "22": "chinese-poetry",
      "23": "chinese-literature",
      "24": "chinese-essays",
      "25": "chinese-novels",
    };

    const directory = tidToDirectoryMap[tid];
    if (!directory) {
      throw new Error("无效的 tid，无法确定音频文件路径");
    }

    const voiceName = process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE || "zh-CN-XiaoxiaoNeural";
    const firstChar = voiceId.charAt(0).toLowerCase();
    return `/refs/notes/${directory}/${voiceName}/${firstChar}/${voiceId}.wav`;
  };

  // 停止音频播放 / Stop audio playback
  const stopAudio = () => {
    if (audioState.audio) {
      audioState.audio.pause();
      audioState.audio.currentTime = 0;
      audioState.audio.src = "";
    }
    
    setAudioState({
      isPlaying: false,
      currentVoiceId: null,
      currentNoteId: null,
      audio: null,
    });
    
    setCurrentPlayState({
      noteId: null,
      spanIndex: 0,
      voiceId: null,
    });
    
    setRenderKey(prev => prev + 1);
    toast.info("音频播放已停止");
  };

  // 播放指定的音频 / Play specified audio
  const playAudio = (noteId: number, spanIndex: number, voiceId: string) => {
    try {
      // 停止当前播放的音频 / Stop current audio
      if (audioState.audio) {
        audioState.audio.pause();
        audioState.audio.src = "";
      }

      const audioPath = buildAudioPath(voiceId);
      const audio = new Audio(audioPath);

      // 设置播放状态 / Set playback state
      setCurrentPlayState({ noteId, spanIndex, voiceId });

      // 音频事件处理 / Audio event handlers
      const onCanPlay = () => {
        setAudioState({
          isPlaying: true,
          currentVoiceId: voiceId,
          currentNoteId: noteId,
          audio: audio,
        });
        setRenderKey(prev => prev + 1);

        audio.play().then(() => {
          toast.success("开始播放音频");
        }).catch(error => {
          console.error("音频播放失败:", error);
          toast.error("音频播放失败");
          stopAudio();
        });
      };

      const onEnded = () => {
        handleAudioEnded(noteId, spanIndex);
      };

      const onError = () => {
        console.error("音频加载失败:", audioPath);
        toast.error("音频文件加载失败");
        stopAudio();
      };

      // 添加事件监听器 / Add event listeners
      audio.addEventListener("canplay", onCanPlay);
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", onError);

      // 保存事件监听器引用 / Save event listener references
      (audio as any)._onCanPlay = onCanPlay;
      (audio as any)._onEnded = onEnded;
      (audio as any)._onError = onError;

      // 开始加载音频 / Start loading audio
      audio.load();
    } catch (error) {
      console.error("播放音频时发生错误:", error);
      toast.error("播放音频时发生错误");
    }
  };

  // 处理音频播放结束 / Handle audio playback ended
  const handleAudioEnded = (noteId: number, spanIndex: number) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    const fieldContent = note[selectedField];
    if (!fieldContent) return;

    const spans = extractSpansFromContent(fieldContent);
    
    switch (loopMode) {
      case "single":
        // 单句循环：重新播放当前句子 / Single loop: replay current sentence
        if (spans[spanIndex]) {
          setTimeout(() => {
            playAudio(noteId, spanIndex, spans[spanIndex].voiceId);
          }, 100);
        }
        break;
        
      case "note":
        // Note循环：播放当前note的下一句，如果是最后一句则从第一句开始
        // Note loop: play next sentence in current note, restart from first if last
        if (spanIndex < spans.length - 1) {
          // 播放下一句 / Play next sentence
          setTimeout(() => {
            playAudio(noteId, spanIndex + 1, spans[spanIndex + 1].voiceId);
          }, 100);
        } else {
          // 从第一句开始 / Start from first sentence
          if (spans.length > 0) {
            setTimeout(() => {
              playAudio(noteId, 0, spans[0].voiceId);
            }, 100);
          }
        }
        break;
        
      case "all":
        // 全部循环：播放下一句，如果当前note播放完则播放下一个note
        // All loop: play next sentence, if current note finished then play next note
        if (spanIndex < spans.length - 1) {
          // 当前note还有下一句 / Current note has next sentence
          setTimeout(() => {
            playAudio(noteId, spanIndex + 1, spans[spanIndex + 1].voiceId);
          }, 100);
        } else {
          // 当前note播放完，播放下一个note / Current note finished, play next note
          const currentNoteIndex = notes.findIndex(n => n.id === noteId);
          if (currentNoteIndex < notes.length - 1) {
            // 播放下一个note的第一句 / Play first sentence of next note
            const nextNote = notes[currentNoteIndex + 1];
            const nextFieldContent = nextNote[selectedField];
            if (nextFieldContent) {
              const nextSpans = extractSpansFromContent(nextFieldContent);
              if (nextSpans.length > 0) {
                setTimeout(() => {
                  playAudio(nextNote.id, 0, nextSpans[0].voiceId);
                }, 100);
              }
            }
          } else {
            // 已经是最后一个note，从第一个note开始 / Last note, start from first note
            if (notes.length > 0) {
              const firstNote = notes[0];
              const firstFieldContent = firstNote[selectedField];
              if (firstFieldContent) {
                const firstSpans = extractSpansFromContent(firstFieldContent);
                if (firstSpans.length > 0) {
                  setTimeout(() => {
                    playAudio(firstNote.id, 0, firstSpans[0].voiceId);
                  }, 100);
                }
              }
            }
          }
        }
        break;
        
      default:
        // 无循环：停止播放 / No loop: stop playback
        stopAudio();
        break;
    }
  };

  // 播放/暂停切换 / Play/pause toggle
  const togglePlayback = () => {
    if (audioState.isPlaying) {
      stopAudio();
    } else {
      // 开始播放第一个note的第一句 / Start playing first sentence of first note
      if (notes.length > 0) {
        const firstNote = notes[0];
        const fieldContent = firstNote[selectedField];
        if (fieldContent) {
          const spans = extractSpansFromContent(fieldContent);
          if (spans.length > 0) {
            playAudio(firstNote.id, 0, spans[0].voiceId);
          }
        }
      }
    }
  };

  // 上一句 / Previous sentence
  const playPrevious = () => {
    if (!currentPlayState.noteId) return;
    
    const note = notes.find(n => n.id === currentPlayState.noteId);
    if (!note) return;
    
    const fieldContent = note[selectedField];
    if (!fieldContent) return;
    
    const spans = extractSpansFromContent(fieldContent);
    
    if (currentPlayState.spanIndex > 0) {
      // 播放当前note的上一句 / Play previous sentence in current note
      const prevIndex = currentPlayState.spanIndex - 1;
      playAudio(currentPlayState.noteId, prevIndex, spans[prevIndex].voiceId);
    } else {
      // 播放上一个note的最后一句 / Play last sentence of previous note
      const currentNoteIndex = notes.findIndex(n => n.id === currentPlayState.noteId);
      if (currentNoteIndex > 0) {
        const prevNote = notes[currentNoteIndex - 1];
        const prevFieldContent = prevNote[selectedField];
        if (prevFieldContent) {
          const prevSpans = extractSpansFromContent(prevFieldContent);
          if (prevSpans.length > 0) {
            playAudio(prevNote.id, prevSpans.length - 1, prevSpans[prevSpans.length - 1].voiceId);
          }
        }
      }
    }
  };

  // 下一句 / Next sentence
  const playNext = () => {
    if (!currentPlayState.noteId) return;
    
    const note = notes.find(n => n.id === currentPlayState.noteId);
    if (!note) return;
    
    const fieldContent = note[selectedField];
    if (!fieldContent) return;
    
    const spans = extractSpansFromContent(fieldContent);
    
    if (currentPlayState.spanIndex < spans.length - 1) {
      // 播放当前note的下一句 / Play next sentence in current note
      const nextIndex = currentPlayState.spanIndex + 1;
      playAudio(currentPlayState.noteId, nextIndex, spans[nextIndex].voiceId);
    } else {
      // 播放下一个note的第一句 / Play first sentence of next note
      const currentNoteIndex = notes.findIndex(n => n.id === currentPlayState.noteId);
      if (currentNoteIndex < notes.length - 1) {
        const nextNote = notes[currentNoteIndex + 1];
        const nextFieldContent = nextNote[selectedField];
        if (nextFieldContent) {
          const nextSpans = extractSpansFromContent(nextFieldContent);
          if (nextSpans.length > 0) {
            playAudio(nextNote.id, 0, nextSpans[0].voiceId);
          }
        }
      }
    }
  };

  // 为HTML内容添加播放图标 / Add play icons to HTML content
  const addPlayIconsToContent = (content: string, noteId: number): string => {
    if (!content) return "";
    
    return content.replace(
      /<span([^>]*data-voice-id="([^"]+)"[^>]*)>([^<]*)<\/span>/g,
      (match, attributes, voiceId, text) => {
        const isCurrentlyPlaying = audioState.isPlaying && 
                                 audioState.currentVoiceId === voiceId && 
                                 audioState.currentNoteId === noteId;
        const icon = isCurrentlyPlaying ? "🔊" : "🔇";
        const spans = extractSpansFromContent(content);
        const spanIndex = spans.findIndex(s => s.voiceId === voiceId);
        
        return `<span${attributes} onclick="window.playSpanAudio(${noteId}, ${spanIndex}, '${voiceId}')" style="cursor: pointer; position: relative;">${text}<span style="margin-left: 4px; font-size: 0.8em;">${icon}</span></span>`;
      }
    );
  };

  // 全局播放函数 / Global play function
  useEffect(() => {
    (window as any).playSpanAudio = (noteId: number, spanIndex: number, voiceId: string) => {
      if (audioState.isPlaying && audioState.currentVoiceId === voiceId && audioState.currentNoteId === noteId) {
        stopAudio();
      } else {
        playAudio(noteId, spanIndex, voiceId);
      }
    };
    
    return () => {
      delete (window as any).playSpanAudio;
    };
  }, [audioState, notes, selectedField]);

  // 渲染加载状态 / Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">加载笔记数据中...</p>
        </div>
      </div>
    );
  }

  // 渲染错误状态 / Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="max-w-6xl mx-auto p-6">
        {/* 页面标题 / Page title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            笔记列表 - TID: {tid}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            共 {notes.length} 条笔记
          </p>
        </div>

        {/* 控制面板 / Control panel */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {/* 字段过滤器 / Field filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              显示字段 / Display Field:
            </label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value as FieldType)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="body">Body - 正文</option>
              <option value="question">Question - 问题</option>
              <option value="answer">Answer - 答案</option>
              <option value="body_script">Body Script - 脚本化正文</option>
              <option value="note">Note - 笔记</option>
              <option value="note_extra">Note Extra - 额外笔记</option>
            </select>
          </div>

          {/* 播放控制按钮组 / Playback control buttons */}
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={playPrevious}
                disabled={!currentPlayState.noteId}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="上一句 / Previous"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlayback}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                title={audioState.isPlaying ? "停止播放 / Stop" : "开始播放 / Play"}
              >
                {audioState.isPlaying ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={playNext}
                disabled={!currentPlayState.noteId}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="下一句 / Next"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 循环模式选择器 / Loop mode selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              循环模式 / Loop Mode:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="loopMode"
                  value="none"
                  checked={loopMode === "none"}
                  onChange={(e) => setLoopMode(e.target.value as LoopMode)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">无循环</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="loopMode"
                  value="single"
                  checked={loopMode === "single"}
                  onChange={(e) => setLoopMode(e.target.value as LoopMode)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">单句循环</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="loopMode"
                  value="note"
                  checked={loopMode === "note"}
                  onChange={(e) => setLoopMode(e.target.value as LoopMode)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">Note循环</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="loopMode"
                  value="all"
                  checked={loopMode === "all"}
                  onChange={(e) => setLoopMode(e.target.value as LoopMode)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">全部循环</span>
              </label>
            </div>
          </div>
        </div>

        {/* 笔记列表 / Notes list */}
        <div className="space-y-6">
          {notes.map((note) => {
            const fieldContent = note[selectedField];
            if (!fieldContent) return null;
            
            const contentWithIcons = addPlayIconsToContent(fieldContent, note.id);
            const isCurrentNote = audioState.currentNoteId === note.id;
            
            return (
              <div
                key={`${note.id}-${renderKey}`}
                className={`p-6 border rounded-lg ${
                  isCurrentNote
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
              >
                {/* 笔记标题和元信息 / Note title and meta info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {note.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>ID: {note.id}</span>
                    <span>权重: {note.weight}</span>
                    <span>创建时间: {new Date(note.created).toLocaleDateString()}</span>
                    {note.deleted && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                        已删除
                      </span>
                    )}
                  </div>
                </div>

                {/* 字段内容 / Field content */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <MathJax hideUntilTypeset="first">
                    <div
                      dangerouslySetInnerHTML={{ __html: contentWithIcons }}
                      className="prose max-w-none dark:prose-invert"
                    />
                  </MathJax>
                </div>
              </div>
            );
          })}
        </div>

        {/* 空状态 / Empty state */}
        {notes.length === 0 && (
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">没有找到笔记数据</p>
              <p className="text-sm">请检查 TID 参数是否正确</p>
            </div>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
}