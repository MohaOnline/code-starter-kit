'use client';

import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import ModeToggle from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';

import Note from '../libs/Note';
import { ProcessingMask } from '@/app/lib/components/ProcessingMask';
import {NoteDialog} from "@/app/notebooks/notes/libs/NoteDialog";


export default function Page() {

  const [status, setStatus] = useState({
    isProcessing: false,
    isAdding: false,  
    notes: [],
  });

  // 加载所有 notes
  useEffect(() => {
    const fetchApi = async () => {

      const response = await fetch('/api/notebooks/notes/list');
      const json = await response.json();

      if (json.success) {
        status.notes = json.notes;
        setStatus({
          ...status, // 复制现有状态
          // words: json.data,
        });
      } else {
        console.error('API 报错');
        toast.error('cant load words from API.');
      }

    };

    try {
      fetchApi().then();
    } catch (e) {
      console.error(e.message);
      toast.error('cant load words from API.');
    }

  }, []);

  return (
      <div className="w-full">
        <ModeToggle/>
        <h1 className="text-3xl font-bold">
          Notes
        </h1>
        <div className="operation">
            <NoteDialog note={{}}/>
        </div>
        <div className="notes flex flex-col gap-4">
          {status.notes.map((note) => (
              <Note key={note.id} note={note}/>
          ))}
        </div>
        <ProcessingMask />
      </div>
  );
}