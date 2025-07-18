'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';

export default function TipTapBasic() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.body || '<p>Loading...</p>',
    onUpdate: ({ editor }) => {
      setNote(prev => ({ ...prev, body: editor.getHTML() }));
    },
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/examples/tiptap/note');
        const data = await response.json();
        setNote(data);
        editor?.commands.setContent(data.body || '');
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [editor]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/examples/tiptap/note', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: note.id, body: note.body }),
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      const updatedNote = await response.json();
      setNote(updatedNote);
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{note?.title || 'Loading...'}</h1>
        <Button
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
      <div className="prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}