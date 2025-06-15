import {useState} from "react";

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

import './NoteDialog.css';

export function NoteDialog({note}) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useStatus();

    return (
        <Dialog open={open} onOpenChange={(v) => {
            if (!status.isProcessing) {
                setOpen(v); // 只有在非 processing 时允许关闭
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
                            <Textarea id="body" name="username" defaultValue="@peduarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => {
                            console.log('save clicked');
                            setStatus(prev => ({...prev, isProcessing: true}));
                        }} type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
        </Dialog>
    )
}
