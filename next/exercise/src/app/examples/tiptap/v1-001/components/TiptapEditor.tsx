"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect, useCallback } from 'react';
import CustomSpanExtension from './extensions/CustomSpan';
import { SpanAttributeModal } from './SpanAttributeModal';
import Toolbar from './Toolbar';
import { v4 as uuidv4 } from 'uuid';

interface TiptapEditorProps {
  initialContent: string;
}

export default function TiptapEditor({ initialContent }: TiptapEditorProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedAttrs, setSelectedAttrs] = useState({
    'aria-label': '',
    'data-speaker': '',
    'data-voice-id': ''
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomSpanExtension
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setHtmlContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.on('click', ({ editor, event }) => {
        const { state, view } = editor;
        const { selection } = state;
        const { ranges } = selection;

        if (!ranges.length) return;

        const from = ranges[0].$from;
        const node = from.node();

        if (node.type.name === 'text' && from.parent?.type.name === 'customSpan') {
          const spanNode = from.parent;
          const attrs = spanNode.attrs;

          setSelectedNode(spanNode);
          setSelectedAttrs({
            'aria-label': attrs['aria-label'] || '',
            'data-speaker': attrs['data-speaker'] || '',
            'data-voice-id': attrs['data-voice-id'] || ''
          });
        }
      });
    }
  }, [editor]);

  const onEditSpanAttributes = useCallback(() => {
    if (editor?.isActive('customSpan')) {
      const node = editor.state.selection.$from.parent;
      setSelectedNode(node);
      setSelectedAttrs({
        'aria-label': node.attrs['aria-label'] || '',
        'data-speaker': node.attrs['data-speaker'] || '',
        'data-voice-id': node.attrs['data-voice-id'] || ''
      });
      setShowModal(true);
    }
  }, [editor]);

  const saveAttributes = useCallback((newAttrs: any) => {
    if (editor && selectedNode) {
      const { from, to } = editor.state.selection;

      // 处理引号，避免HTML属性解析错误
      const processedAttrs = {
        ...newAttrs,
        'aria-label': newAttrs['aria-label'].replace(/"/g, '&quot;')
      };

      editor.chain().focus()
        .updateAttributes('customSpan', processedAttrs)
        .run();

      setShowModal(false);
    }
  }, [editor, selectedNode]);

  const createNewSpan = useCallback(() => {
    if (editor) {
      const attrs = {
        'aria-label': '',
        'data-speaker': '',
        'data-voice-id': uuidv4()
      };

      editor.chain().focus().insertContent({
        type: 'customSpan',
        attrs,
        content: [{ type: 'text', text: '在此输入文本' }]
      }).run();
    }
  }, [editor]);

  if (!editor) {
    return <div>加载中...</div>;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Toolbar 
        editor={editor} 
        onEditSpanAttributes={onEditSpanAttributes}
        onCreateNewSpan={createNewSpan}
      />

      <div className="p-4 min-h-[200px] bg-white">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>

      <div className="p-4 border-t bg-gray-50">
        <h3 className="font-medium mb-2">HTML 输出:</h3>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-[200px]">
          {htmlContent || editor.getHTML()}
        </pre>
      </div>

      {showModal && (
        <SpanAttributeModal 
          attributes={selectedAttrs}
          onSave={saveAttributes}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
