'use client';

/**
 * 候选控件：
 * - https://github.com/jedwatson/react-select
 */

import {useEffect, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ModeToggle from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, ChevronsUpDown, X, Square, CheckSquare } from 'lucide-react';

import Note from '@/app/notebooks/notes/libs/NoteListeningDialog';
import { ProcessingMask } from '@/app/lib/components/ProcessingMask';
import { NoteDialog } from "@/app/notebooks/notes/libs/NoteDialog";
import NavTop from '@/app/lib/components/NavTop';
import { useStatus } from '@/app/lib/atoms';

export default function NotesListeningDialog() {

  const [status, setStatus] = useStatus();

  // 加载所有 notes
  useEffect(() => {
    fetch('/api/notebooks/notes/list/9')
    .then(res => res.json())
    .then(json => {
        setStatus((prev) => ({
            ...prev,
            notesListeningDialog: {
              ...prev.notesListeningDialog,
              notes: json.notes,
            },
        }))
    })
    .catch(err => {
        console.error('Fetch API error: /api/notebooks/notes/list');
        toast.error('cant load notes from API.');
    });    

  }, []);

  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      note: {
        ...prev.note,
        type: {
          title: 'Listening Dialog',
          title_sub: '高中',
          id: '9',
        },
      },
    }));
  }, []);

  return (
    <div className="w-full">
      <NavTop />
      <h1 className="text-3xl font-bold text-center">
        Listening Dialog
      </h1>

      {/* 笔记添加 */}
      <div className="operation text-right flex items-center justify-end gap-2 mb-2">
        <NoteDialog note={{}} />
        <ModeToggle />
      </div>

      {status.notesListeningDialog?.notes?.length === 0 && <div>Loading...</div>}

      <div className="notes flex flex-col gap-4">
        {status.notesListeningDialog.notes
          ?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </div>
      <ProcessingMask />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </div>
  );
}
