import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

import { useStatus } from '@/app/lib/atoms';
import { NoteTypeSelector } from "./NoteTypeSelector";
import { NoteDialogFormItemRender } from './NoteDialogForms'

import './NoteDialog.css';

export function NoteDialog({note}) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useStatus()    // 自定义状态管理

    // Load note types data.
    useEffect(() => {
        fetch('/api/notebooks/types/list')
            .then(res => res.json())
            .then(json => {
                setStatus((prev) => ({
                    ...prev,
                    types: json.types,
                }))
            })
            .catch(err => {
                console.error('Fetch API error: /api/notebooks/types/list');
            });
    }, []);

    return (
        <Dialog open={open} onOpenChange={(b) => {
            if (!status.isProcessing) {
                // 只有在非 processing 时传入 false，设置 false，导致关闭对话框。
                setOpen(b);         
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}>Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] md:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle>Note</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <NoteTypeSelector types={status.types} />
                    </div>
                    <NoteDialogFormItemRender />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => {
                        console.log('save clicked');
                        setStatus(prev => ({ ...prev, isProcessing: true }));

                        let action = 'create';
                        if (status.note.id) {
                            action = 'update';
                        }

                        fetch('/api/notebooks/notes/crud', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                action: action,
                                note: status.note,
                            }),
                        })
                        .then(res => res.json())
                        .then(json => {
                            console.log('API Response:', json); // 更明确的日志标识
                            // 更新状态，包括将返回的note数据合并到状态中
                            setStatus(prev => ({
                                ...prev,
                                isProcessing: false,
                                // 如果是创建操作，确保使用返回的note数据（包含新ID）
                                note: action === 'create' && json.success ? json.note : prev.note
                            }));
                            setOpen(false);
                        })
                        .catch(err => {
                            console.error('Fetch API error: /api/notebooks/notes/crud');
                            setStatus(prev => ({ ...prev, isProcessing: false }));
                        });
                    }} type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
