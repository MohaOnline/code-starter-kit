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

import './NoteDialog.css';

export function NoteDialog({note}) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useStatus();

    // Load types data.
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Name</Label>
                        <Input id="title" name="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Username</Label>
                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                    </div>
                    <div className="grid gap-3">
                        <NoteTypeSelector types={status.types} />
                    </div>
                    <div className="grid gap-3">
                        <Textarea id="body" name="username" defaultValue="@peduarte" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => {
                        console.log('save clicked');
                        setStatus(prev => ({ ...prev, isProcessing: true }));
                        setStatus(prev => ({ ...prev, isProcessing: false }));
                        
                    }} type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
