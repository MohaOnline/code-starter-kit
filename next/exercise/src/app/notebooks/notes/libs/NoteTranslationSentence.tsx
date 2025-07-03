import {useState, useEffect} from 'react';
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
import { NoteHTMLCodeArea } from '../../../lib/components/NoteHTMLCodeArea';

// 单句翻译
export const NoteTranslationSentenceForm = (handleNoteChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, status: any) => {

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="question">Question</Label>
        <NoteHTMLCodeArea handleNoteChange={handleNoteChange} status={status} name="question" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="answer">Answer</Label>
        <NoteHTMLCodeArea handleNoteChange={handleNoteChange} status={status} name="answer" />
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