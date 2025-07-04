/**
 * 听力
 */
'use client';

import React, {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button";
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
import { AiFillPlayCircle, AiTwotonePlaySquare } from "react-icons/ai";

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
               onChange={handleNoteChange}/>
      </div>
      <div className="grid gap-3">
        <Label>Choices</Label>
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[20px]">A:</span>
          <Input id="choise_a" name="choise_a" value={status.note?.choise_a || ''}
                 onChange={handleNoteChange} className="flex-1"/>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[20px]">B:</span>
          <Input id="choise_b" name="choise_b" value={status.note?.choise_b || ''}
                 onChange={handleNoteChange} className="flex-1"/>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[20px]">C:</span>
          <Input id="choise_c" name="choise_c" value={status.note?.choise_c || ''}
                 onChange={handleNoteChange} className="flex-1"/>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[20px]">D:</span>
          <Input id="choise_d" name="choise_d" value={status.note?.choise_d || ''}
                 onChange={handleNoteChange} className="flex-1"/>
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
        <Textarea id="note" name="note"
                  value={status.note?.note || ''}
                  onChange={handleNoteChange}/>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="note_extra">Note Extra</Label>
        <Textarea id="note_extra" name="note_extra"
                  value={status.note?.note_extra || ''}
                  onChange={handleNoteChange}/>
      </div>
    </>
  );
}

/* React component 有 note 参数，也可有别的参数，打包成一个对象传入。 */
export function NoteListeningDialog({note}) {
    const [status, setStatus] = useStatus(); // 通过 status 和 note.id 把 status.note = status.notesListeningDialog.notes.find(note => note.id === note.id).
    const [local, setLocal] = useState({
        set: null,
        note: note,
        isEditing: false,       // 开关编辑 Drawer
        setEditing: null,
        showAnswer: 0,          // 0: 不显示，1: 显示正确答案，2: 显示所有选项
        answer: null,            // 存储答案选择
        shuffledChoices: [],    // 随机排序的选项
        hoveredChoice: null,    // 当前悬停的选项
    });

    local.set = setLocal;
    local.setEditing = (isEditing: boolean) => setLocal(prev => ({...prev, isEditing: isEditing}));

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
        
        setLocal(prev => ({...prev, shuffledChoices: shuffled}));
    }, [note]);

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

        const {name, value} = e.target;
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
                <div className="operation">
                    <Button variant="outline" >
                      <AiFillPlayCircle onClick={() => {
                        
                    }} />
                    </Button></div>
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
                                    style.borderColor = 'green';
                                    style.color = 'rgb(120, 210, 120)';
                                } else if (isSelected && !isCorrect) {
                                    style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
                                    style.borderColor = 'red';
                                    style.color = 'rgb(120, 210, 120)';
                                }
                            }

                            return style;
                        }

                        return (
                            <div 
                                key={choice.key}
                                className={`choice-option ${
                                    isSelected 
                                        ? 'choice-selected' 
                                        : 'choice-unselected'
                                }`}
                                onClick={() => local.showAnswer === 0 && handleAnswerChange(choice.key)}
                                style={getStyle()}

                                onMouseEnter={() => {
                                    if (!isSelected && local.showAnswer === 0) {
                                        setLocal(prev => ({...prev, hoveredChoice: choice.key}));
                                    }
                                }}
                                
                                onMouseLeave={() => {
                                    if (!isSelected && local.showAnswer === 0) {
                                        setLocal(prev => ({...prev, hoveredChoice: null}));
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
                                <div dangerouslySetInnerHTML={{__html: choice.content}} style={{flexGrow: 1}}></div>
                                {local.showAnswer > 0 && choice.key === note.answer && <FaRegCircleCheck style={{ color: 'green' }} />}
                                {local.showAnswer > 0 && local.answer === choice.key && choice.key !== note.answer && <FaRegCircleXmark style={{ color: 'red' }} />}
                            </div>
                        );
                    })}
                </div>

                {local.showAnswer > 0 &&
                <div dangerouslySetInnerHTML={{__html: note.question}}></div>}

                {local.showAnswer > 1 &&
                <div dangerouslySetInnerHTML={{__html: note.note}}></div>}
                  
                <div className="operation" style={{}}>
                    {local.showAnswer != 2 &&
                    <Button variant="outline" onClick={() => {
                        if (!local.answer) {
                            toast.error('请先选择答案');
                            return;
                        }

                        setLocal(prev => ({...prev, showAnswer: prev.showAnswer++}));
                    
                    }}>{local.showAnswer == 0 ? 'Check' : 'Note'}</Button>}



                    <NoteDialog note={note} preOpenCallback = {()=>{
                        const n = status.notesListeningDialog.notes.find(n => n.id === note.id);
                        console.log(n);
                        setStatus(prev=>({
                            ...prev,
                            note: {
                                ...n,
                                type:{
                                    title: n.type,
                                    title_sub: n.type_sub,
                                    id: n.tid,
                                }
                            },
                        }))
                    }}/>
                </div>
            </div>

        </>
    );
}
