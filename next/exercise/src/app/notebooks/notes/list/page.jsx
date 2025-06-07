'use client';

import ModeToggle from '@/components/mode-toggle';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export default function Page() {

  const [status, setStatus] = useState({notes: []});

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
          Notebook Words English
        </h1>
      </div>
  );
}