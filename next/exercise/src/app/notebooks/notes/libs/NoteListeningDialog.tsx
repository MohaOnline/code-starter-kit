/**
 * 听力
 */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { AiFillPlayCircle, AiTwotonePlaySquare, AiFillPauseCircle } from "react-icons/ai";
import { Switch } from "@/components/ui/switch";

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { HTMLArea } from '@/app/lib/components/HTMLArea';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import { Howl } from 'howler';
import WaveSurfer from 'wavesurfer.js';

import "./Note.css"
import { NoteDialog } from './NoteDialog';
import { useStatus } from '@/app/lib/atoms';
import { toast } from 'react-toastify';

/**
 * 听力: 对话 编辑对话框
 * 
 * @param handleNoteChange 
 * @param status 
 * @returns 
 */
export const NoteListeningDialogForm = (handleNoteChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, status: any) => {

    return (
        <>
            <div className="grid gap-3">
                <Label htmlFor="figures">Question Voice</Label>
                <Input id="figures" name="figures" value={status.note?.figures || ''}
                    onChange={handleNoteChange} />
            </div>
            <div className="grid gap-3">
                <Label>Choices</Label>
                <div className="flex items-center gap-2">
                    <span className="font-medium min-w-[20px]">A:</span>
                    <Input id="choise_a" name="choise_a" value={status.note?.choise_a || ''}
                        onChange={handleNoteChange} className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium min-w-[20px]">B:</span>
                    <Input id="choise_b" name="choise_b" value={status.note?.choise_b || ''}
                        onChange={handleNoteChange} className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium min-w-[20px]">C:</span>
                    <Input id="choise_c" name="choise_c" value={status.note?.choise_c || ''}
                        onChange={handleNoteChange} className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium min-w-[20px]">D:</span>
                    <Input id="choise_d" name="choise_d" value={status.note?.choise_d || ''}
                        onChange={handleNoteChange} className="flex-1" />
                </div>

                <Label htmlFor="answer">Answer</Label>
                <Select
                    value={status.note?.answer || ''}
                    onValueChange={(value) => {
                        const event = {
                            target: {
                                name: 'answer',
                                value: value
                            }
                        } as React.ChangeEvent<HTMLInputElement>;
                        handleNoteChange(event);
                    }}
                >

                    <SelectTrigger>
                        <SelectValue placeholder="Correct Answer" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="choise_a">A</SelectItem>
                        <SelectItem value="choise_b">B</SelectItem>
                        <SelectItem value="choise_c">C</SelectItem>
                        <SelectItem value="choise_d">D</SelectItem>
                    </SelectContent>
                </Select>

                <Label htmlFor="question">Question</Label>
                <HTMLArea handleNoteChange={handleNoteChange} value={status.note?.question || ''} name="question" />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="note">Note</Label>
                <HTMLArea handleNoteChange={handleNoteChange} value={status.note?.note || ''} name="note" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="note_extra">Note Extra</Label>
                <Textarea id="note_extra" name="note_extra"
                    value={status.note?.note_extra || ''}
                    onChange={handleNoteChange} />
            </div>
        </>
    );
}

/* React component 有 note 参数，也可有别的参数，打包成一个对象传入。 */
export function NoteListeningDialog({ note, isCurrentNote = false, noteIndex = 0 }) {
    const [status, setStatus] = useStatus(); // 通过 status 和 note.id 把 status.note = status.notesListeningDialog.notes.find(note => note.id === note.id).
    const [local, setLocal] = useState({
        set: null,
        note: note,
        isEditing: false,       // 开关编辑 Drawer
        setEditing: null,
        showAnswer: 0,          // 0: 不显示，1: 显示正确答案，2: 显示所有选项
        answer: null,           // 存储答案选择
        shuffledChoices: [],    // 随机排序的选项
        hoveredChoice: null,    // 当前悬停的选项
        isPlaying: false,       // 音频播放状态
        isLooping: true,        // 循环播放状态
        howlInstance: null,     // Howler实例
        waveSurfer: null,       // WaveSurfer实例
        currentTime: 0,         // 当前播放时间
        duration: 0,            // 音频总时长
        // 选择区域相关状态
        selectionStart: null,
        selectionEnd: null,
        isSelecting: false
    });

    const waveformRef = useRef(null);

    local.set = setLocal;
    local.setEditing = (isEditing: boolean) => setLocal(prev => ({ ...prev, isEditing: isEditing }));

    // 初始化随机排序的选项
    useEffect(() => {
        const choices = [
            { key: 'choise_a', content: note.choise_a },
            { key: 'choise_b', content: note.choise_b },
            { key: 'choise_c', content: note.choise_c },
            { key: 'choise_d', content: note.choise_d }
        ];

        // Fisher-Yates 洗牌算法
        const shuffled = [...choices];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setLocal(prev => ({ ...prev, shuffledChoices: shuffled }));
    }, [note]);

    // 初始化音频和波形
    useEffect(() => {
        if (note.figures && waveformRef.current) {
            // 标记组件是否已卸载
            let isMounted = true;

            // 创建音频上下文以优化音频处理
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

            // 确保音频上下文处于运行状态
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            // 初始化WaveSurfer
            let wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: 'rgb(120, 210, 120)',
                progressColor: 'rgb(255, 255, 0)',
                cursorColor: 'rgb(255, 255, 255)',
                barWidth: 1,
                barRadius: 3,
                height: 60,
                normalize: true,
                mediaControls: false,
                sampleRate: 44100,  // 设置采样率
                interact: false,    // 禁用默认交互，使用自定义选择
                hideScrollbar: true, // 隐藏滚动条
                autoplay: false,    // 禁止自动播放
                dragToSeek: false   // 禁用拖拽定位，使用自定义选择
            });

            // 检查组件是否仍然挂载
            // TODO：是否真的需要
            if (!isMounted) {
                try {
                    wavesurfer.destroy();
                    wavesurfer = null;
                } catch (error) {
                    console.warn('Error destroying wavesurfer during early cleanup:', error);
                }
                return;
            }

            // 加载音频文件
            wavesurfer.load(`/refs${note.figures}`);

            // 初始化Howler
            const howl = new Howl({
                src: [`/refs${note.figures}`],
                html5: false,  // 使用Web Audio API而不是HTML5 Audio
                format: ['wav', 'mp3'],  // 指定支持的音频格式
                volume: 2.0,  // 设置音量
                rate: 1.0,    // 设置播放速率
                onload: () => {
                    setLocal(prev => ({
                        ...prev,
                        duration: howl.duration()
                    }));
                },
                onplay: () => {
                    setLocal(prev => ({ ...prev, isPlaying: true }));
                },
                onpause: () => {
                    setLocal(prev => ({ ...prev, isPlaying: false }));
                },
                onstop: () => {
                    setLocal(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
                },
                onend: () => {
                    if (!local.isLooping) {
                        setLocal(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
                        // 触发顺序播放的下一个音频
                        setTimeout(() => {
                            window.dispatchEvent(new CustomEvent('sequentialAudioEnded'));
                        }, 100);
                    }
                }
            });

            // 设置循环
            howl.loop(local.isLooping);

            // WaveSurfer事件监听
            wavesurfer.on('ready', () => {
                setLocal(prev => ({
                    ...prev,
                    duration: wavesurfer.getDuration()
                }));
            });

            // 移除interaction事件监听，因为我们使用自定义的鼠标事件处理
            // wavesurfer.on('interaction', () => {
            //     const currentTime = wavesurfer.getCurrentTime();
            //     howl.seek(currentTime);
            //     setLocal(prev => ({...prev, currentTime: currentTime}));
            // });

            // 添加区域选择事件监听
            let isMouseDown = false;
            let startTime = null;
            let mouseDownTime = 0;
            let hasMouseMoved = false;

            const handleMouseDown = (e) => {
                // 阻止WaveSurfer的默认点击行为
                e.preventDefault();
                e.stopPropagation();

                isMouseDown = true;
                hasMouseMoved = false;
                mouseDownTime = Date.now();

                const rect = waveformRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const progress = Math.max(0, Math.min(1, x / rect.width));
                startTime = progress * wavesurfer.getDuration();

                setLocal(prev => ({
                    ...prev,
                    isSelecting: true,
                    selectionStart: startTime,
                    selectionEnd: startTime
                }));
            };

            const handleMouseMove = (e) => {
                if (!isMouseDown) return;

                e.preventDefault();
                e.stopPropagation();

                hasMouseMoved = true;

                const rect = waveformRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const progress = Math.max(0, Math.min(1, x / rect.width));
                const endTime = progress * wavesurfer.getDuration();

                setLocal(prev => ({
                    ...prev,
                    selectionEnd: endTime
                }));
            };

            const handleMouseUp = (e) => {
                if (isMouseDown) {
                    e.preventDefault();
                    e.stopPropagation();

                    isMouseDown = false;
                    const clickDuration = Date.now() - mouseDownTime;

                    // 判断是单击还是拖拽
                    const isClick = !hasMouseMoved && clickDuration < 300; // 300ms内且没有移动鼠标

                    if (isClick) {
                        // 单击：定位播放位置并清除选择
                        const clickTime = startTime;
                        howl.seek(clickTime);
                        setLocal(prev => ({
                            ...prev,
                            isSelecting: false,
                            selectionStart: null,
                            selectionEnd: null,
                            currentTime: clickTime
                        }));

                        // 同步WaveSurfer进度
                        if (wavesurfer) {
                            try {
                                if (typeof wavesurfer.getDuration === 'function' &&
                                    typeof wavesurfer.seekTo === 'function' &&
                                    wavesurfer.getDuration() > 0) {
                                    const progress = clickTime / wavesurfer.getDuration();
                                    wavesurfer.seekTo(progress);
                                }
                            } catch (error) {
                                console.warn('Error syncing wavesurfer progress:', error);
                            }
                        }
                    } else {
                        // 拖拽：检查选择区域是否有效
                        setLocal(prev => {
                            const minDuration = 0.1; // 最小选择时长
                            const duration = Math.abs(prev.selectionEnd - prev.selectionStart);

                            if (duration < minDuration) {
                                // 如果选择区域太小，清除选择
                                return {
                                    ...prev,
                                    isSelecting: false,
                                    selectionStart: null,
                                    selectionEnd: null
                                };
                            }

                            return {
                                ...prev,
                                isSelecting: false
                            };
                        });
                    }
                }
            };

            // 绑定事件监听器
            waveformRef.current.addEventListener('mousedown', handleMouseDown);
            waveformRef.current.addEventListener('mousemove', handleMouseMove);
            waveformRef.current.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mouseup', handleMouseUp); // 全局监听鼠标释放

            setLocal(prev => ({
                ...prev,
                howlInstance: howl,
                waveSurfer: wavesurfer
            }));

            // 清理函数
            return () => {
                // 标记组件已卸载
                isMounted = false;

                // 清理Howl实例
                if (howl) {
                    try {
                        howl.unload();
                    } catch (error) {
                        console.warn('Error unloading howl:', error);
                    }
                }

                // 清理WaveSurfer实例
                if (wavesurfer) {
                    try {
                        // 使用setTimeout延迟销毁，避免与正在进行的操作冲突
                        setTimeout(() => {
                            try {
                                if (typeof wavesurfer.destroy === 'function') {
                                    wavesurfer.destroy();
                                    wavesurfer = null;
                                }
                            } catch (error) {
                                // 忽略AbortError，这是正常的清理过程
                                if (error.name !== 'AbortError') {
                                    console.warn('Error destroying wavesurfer:', error);
                                }
                            }
                        }, 100);
                    } catch (error) {
                        console.warn('Error scheduling wavesurfer cleanup:', error);
                    }
                }

                // 清理音频上下文
                if (audioContext && audioContext.state !== 'closed') {
                    try {
                        audioContext.close();
                    } catch (error) {
                        console.warn('Error closing audio context:', error);
                    }
                }

                // 移除事件监听器
                if (waveformRef.current) {
                    try {
                        waveformRef.current.removeEventListener('mousedown', handleMouseDown);
                        waveformRef.current.removeEventListener('mousemove', handleMouseMove);
                        waveformRef.current.removeEventListener('mouseup', handleMouseUp);
                    } catch (error) {
                        console.warn('Error removing event listeners:', error);
                    }
                }
                try {
                    document.removeEventListener('mouseup', handleMouseUp);
                } catch (error) {
                    console.warn('Error removing document event listener:', error);
                }
            };
        }
    }, [note.figures]);

    // 更新循环状态
    useEffect(() => {
        if (local.howlInstance) {
            local.howlInstance.loop(local.isLooping);
        }
    }, [local.isLooping]);

    // 更新播放时间
    useEffect(() => {
        let interval;
        if (local.isPlaying && local.howlInstance) {
            interval = setInterval(() => {
                const currentTime = local.howlInstance.seek();
                setLocal(prev => ({ ...prev, currentTime: currentTime || 0 }));

                // 检查是否播放到选中区域结束
                if (local.selectionStart !== null && local.selectionEnd !== null) {
                    const startTime = Math.min(local.selectionStart, local.selectionEnd);
                    const endTime = Math.max(local.selectionStart, local.selectionEnd);

                    if (currentTime >= endTime) {
                        if (local.isLooping) {
                            // 循环播放选中区域
                            local.howlInstance.seek(startTime);
                        } else {
                            // 停止播放
                            local.howlInstance.pause();
                        }
                    }
                }

                // 同步WaveSurfer进度
                if (local.waveSurfer && local.duration > 0) {
                    try {
                        if (typeof local.waveSurfer.seekTo === 'function') {
                            const progress = (currentTime || 0) / local.duration;
                            local.waveSurfer.seekTo(progress);
                        }
                    } catch (error) {
                        console.warn('Error seeking wavesurfer:', error);
                    }
                }
            }, 100);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [local.isPlaying, local.howlInstance, local.duration, local.selectionStart, local.selectionEnd, local.isLooping]);

    // 监听顺序播放事件
    useEffect(() => {
        const handleDisableAllLoops = () => {
            setLocal(prev => ({ ...prev, isLooping: false }));
        };

        const handlePlaySequentialAudio = (event) => {
            if (event.detail.noteIndex === noteIndex) {
                // 播放当前音频
                if (local.howlInstance) {
                    // 确保从头开始播放
                    local.howlInstance.seek(0);
                    local.howlInstance.play();
                }
            }
        };

        const handleStopSequentialAudio = () => {
            if (local.howlInstance && local.isPlaying) {
                local.howlInstance.pause();
            }
        };

        window.addEventListener('disableAllLoops', handleDisableAllLoops);
        window.addEventListener('playSequentialAudio', handlePlaySequentialAudio);
        window.addEventListener('stopSequentialAudio', handleStopSequentialAudio);

        return () => {
            window.removeEventListener('disableAllLoops', handleDisableAllLoops);
            window.removeEventListener('playSequentialAudio', handlePlaySequentialAudio);
            window.removeEventListener('stopSequentialAudio', handleStopSequentialAudio);
        };
    }, [noteIndex, local.howlInstance, local.isPlaying]);

    // 音频控制函数
    const togglePlayPause = () => {
        if (!local.howlInstance) return;

        if (local.isPlaying) {
            local.howlInstance.pause();
        } else {
            // 如果有选中区域，从选中区域开始播放
            if (local.selectionStart !== null && local.selectionEnd !== null) {
                const startTime = Math.min(local.selectionStart, local.selectionEnd);
                local.howlInstance.seek(startTime);
                setLocal(prev => ({ ...prev, currentTime: startTime }));
            }
            local.howlInstance.play();
        }
    };

    const stopAudio = () => {
        if (!local.howlInstance) return;

        local.howlInstance.stop();
        // WaveSurfer 只用于显示，重置到开始位置
        if (local.waveSurfer) {
            try {
                if (typeof local.waveSurfer.seekTo === 'function') {
                    local.waveSurfer.seekTo(0);
                }
            } catch (error) {
                console.warn('Error resetting wavesurfer position:', error);
            }
        }
    };

    const toggleLoop = () => {
        setLocal(prev => ({ ...prev, isLooping: !prev.isLooping }));
    };

    const clearSelection = () => {
        setLocal(prev => ({
            ...prev,
            selectionStart: null,
            selectionEnd: null
        }));
    };

    // 响应答案选择（无答案检查）
    const handleAnswerChange = (choiceKey) => {
        setLocal(prev => {
            // 如果点击的是已选中的选项，则取消选择
            if (prev.answer === choiceKey) {
                return {
                    ...prev,
                    answer: null
                };
            }
            // 否则选择新的选项
            return {
                ...prev,
                answer: choiceKey
            };
        });
    };


    // Handle changes of note items.
    const handleChange = (e) => {

        const { name, value } = e.target;
        setLocal({
            ...local,
            note: { ...local.note, [name]: value }
        });
    };

    // Handle saving function.
    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(
            '/api/notebooks/notes/crud',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update',
                    note: local.note,
                }),
            });
        const data = await response.json();
        console.log(data);
        local.setEditing(false);
    }

    return (
        <>
            <div className="border note flex flex-col">
                {/* 波形显示和音频控制区域 */}
                {note.figures && (
                    <div className="waveform-container" style={{
                        backgroundColor: 'rgba(120, 210, 120, 0.1)',
                        border: '1px solid rgb(120, 210, 120)',
                        // borderRadius: '8px',
                        padding: '10px',
                        margin: '8px 0'
                    }}>
                        {/* 波形显示 */}
                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                            <div ref={waveformRef} style={{ position: 'relative', zIndex: 1 }}></div>
                            {/* 选中区域覆盖层 */}
                            {local.selectionStart !== null && local.selectionEnd !== null && local.duration > 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: `${(Math.min(local.selectionStart, local.selectionEnd) / local.duration) * 100}%`,
                                        width: `${Math.max(1, (Math.abs(local.selectionEnd - local.selectionStart) / local.duration) * 100)}%`,
                                        height: '60px',
                                        backgroundColor: 'rgba(0, 123, 255, 0.4)',
                                        border: '2px solid rgba(0, 123, 255, 0.8)',
                                        pointerEvents: 'none',
                                        borderRadius: '2px',
                                        zIndex: 2,
                                        boxSizing: 'border-box'
                                    }}
                                />
                            )}
                            {/* 正在选择时的实时覆盖层 */}
                            {local.isSelecting && local.selectionStart !== null && local.selectionEnd !== null && local.duration > 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: `${(Math.min(local.selectionStart, local.selectionEnd) / local.duration) * 100}%`,
                                        width: `${Math.max(1, (Math.abs(local.selectionEnd - local.selectionStart) / local.duration) * 100)}%`,
                                        height: '60px',
                                        backgroundColor: 'rgba(255, 193, 7, 0.3)',
                                        border: '2px dashed rgba(255, 193, 7, 0.8)',
                                        pointerEvents: 'none',
                                        borderRadius: '2px',
                                        zIndex: 3,
                                        boxSizing: 'border-box'
                                    }}
                                />
                            )}
                        </div>

                        {/* 音频控制按钮 */}
                        <div className="audio-controls flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={togglePlayPause}
                                className="flex items-center gap-2"
                            >
                                {local.isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                                {local.isPlaying ? 'Pause' : 'Play'}
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={stopAudio}
                                style={{
                                    display: 'none',
                                }}
                            >
                                Stop
                            </Button>

                            {/* 循环播放开关 */}
                            <div className="flex items-center gap-2">
                                <Label htmlFor="loop-switch" className="text-sm">Loop</Label>
                                <Switch
                                    id="loop-switch"
                                    checked={local.isLooping}
                                    onCheckedChange={toggleLoop}
                                />
                            </div>

                            {/* 时间显示 */}
                            <div className="time-display text-sm text-gray-600">
                                {Math.floor(local.currentTime / 60)}:{String(Math.floor(local.currentTime % 60)).padStart(2, '0')} /
                                {Math.floor(local.duration / 60)}:{String(Math.floor(local.duration % 60)).padStart(2, '0')}
                            </div>
                            {local.selectionStart !== null && local.selectionEnd !== null && (
                                <div className="selection-info text-xs text-blue-400">
                                    选中: {Math.floor(Math.min(local.selectionStart, local.selectionEnd) / 60)}:{String(Math.floor(Math.min(local.selectionStart, local.selectionEnd) % 60)).padStart(2, '0')}
                                    {' - '}
                                    {Math.floor(Math.max(local.selectionStart, local.selectionEnd) / 60)}:{String(Math.floor(Math.max(local.selectionStart, local.selectionEnd) % 60)).padStart(2, '0')}
                                </div>
                            )}

                            {/* 清除选择按钮 */}
                            {local.selectionStart !== null && local.selectionEnd !== null && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearSelection}
                                    className="text-xs"
                                >
                                    清除选择
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                <div className='options'>
                    {local.shuffledChoices.map((choice, index) => {
                        const isSelected = local.answer === choice.key;
                        const isCorrect = choice.key === note.answer;
                        const shouldShowResult = local.showAnswer > 0;

                        const isHovered = local.hoveredChoice === choice.key;

                        const getStyle = () => {
                            let style: React.CSSProperties = {
                                border: '1px solid rgb(120, 210, 120)',
                                backgroundColor: isSelected
                                    ? 'rgb(120, 210, 120)'
                                    : 'rgba(120, 210, 120, 0.15)',
                                color: isSelected ? 'black' : 'rgb(120, 210, 120)',
                                padding: '12px 16px',
                                margin: '8px 0',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            };

                            // 处理悬停效果
                            if (!isSelected && local.showAnswer === 0 && isHovered) {
                                style.backgroundColor = 'rgba(120, 210, 120, 0.25)';
                            }

                            if (shouldShowResult) {
                                style.cursor = 'default';
                                if (isCorrect) {
                                    style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
                                    style.borderColor = 'lightgreen';
                                    style.color = 'rgb(120, 210, 120)';
                                } else if (isSelected && !isCorrect) {
                                    style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
                                    style.borderColor = 'lightred';
                                    style.color = 'rgb(255, 160, 160)';
                                }
                            }

                            return style;
                        }

                        return (
                            <div
                                key={choice.key}
                                className={`choice-option ${isSelected
                                    ? 'choice-selected'
                                    : 'choice-unselected'
                                    }`}
                                onClick={() => local.showAnswer === 0 && handleAnswerChange(choice.key)}
                                style={getStyle()}

                                onMouseEnter={() => {
                                    if (!isSelected && local.showAnswer === 0) {
                                        setLocal(prev => ({ ...prev, hoveredChoice: choice.key }));
                                    }
                                }}

                                onMouseLeave={() => {
                                    if (!isSelected && local.showAnswer === 0) {
                                        setLocal(prev => ({ ...prev, hoveredChoice: null }));
                                    }
                                }}
                            >
                                <input
                                    type="radio"
                                    name={`question-${note.id}`}
                                    value={choice.key}
                                    checked={isSelected}
                                    onChange={() => handleAnswerChange(choice.key)}
                                    style={{
                                        display: 'none'
                                    }}
                                />
                                <div dangerouslySetInnerHTML={{ __html: choice.content }} style={{ flexGrow: 1 }}></div>
                                {local.showAnswer > 0 && choice.key === note.answer && <FaRegCircleCheck style={{ color: 'lightgreen' }} />}
                                {local.showAnswer > 0 && local.answer === choice.key && choice.key !== note.answer && <FaRegCircleXmark style={{ color: 'lightred' }} />}
                            </div>
                        );
                    })}
                </div>

                {local.showAnswer > 0 &&
                    <div dangerouslySetInnerHTML={{ __html: note.question }}></div>}

                {local.showAnswer > 1 &&
                    <div dangerouslySetInnerHTML={{ __html: note.note }}></div>}

                <div className="operation" style={{}}>
                    {local.showAnswer != 2 &&
                        <Button variant="outline" onClick={() => {
                            if (!local.answer) {
                                toast.error('请先选择答案');
                                return;
                            }

                            setLocal(prev => ({ ...prev, showAnswer: prev.showAnswer + 1 }));

                        }}>{local.showAnswer == 0 ? 'Check' : 'Note'}</Button>}



                    <NoteDialog note={note} preOpenCallback={() => {
                        const n = status.notesListeningDialog.notes.find(n => n.id === note.id);
                        console.log(n);
                        setStatus(prev => ({
                            ...prev,
                            note: {
                                ...n,
                                type: {
                                    title: n.type,
                                    title_sub: n.type_sub,
                                    id: n.tid,
                                }
                            },
                        }))
                    }} />
                </div>
            </div>

        </>
    );
}
