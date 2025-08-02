"use client";

import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {useState, useCallback} from 'react';
import {v4 as uuidv4} from 'uuid';
import Toolbar from './Toolbar';
import SpanAttributeModal from './SpanAttributeModal';
import CustomSpanExtension from './extensions/CustomSpanExtension';

interface TiptapEditorProps {
  initialContent: string;
  onSave?: (content: string) => void;
}

export default function TiptapEditor({initialContent, onSave}: TiptapEditorProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNodePos, setSelectedNodePos] = useState<number | null>(null);
  const [selectedAttrs, setSelectedAttrs] = useState({
    'aria-label':    '',
    'data-speaker':  '',
    'data-voice-id': ''
  });

  const editor = useEditor({
    // 防止 SSR 渲染问题和水合不匹配
    immediatelyRender: false,
    extensions:        [
      StarterKit,
      CustomSpanExtension
    ],
    content:           initialContent,
    onUpdate:          ({editor}) => {
      const html = editor.getHTML();
      setHtmlContent(html);
    },
    onSelectionUpdate: ({editor}) => {
      // 当选择变化时，检查是否选中了自定义 span
      checkSelectedSpan(editor);
    },
  });

  // 检查当前选中的是否是自定义 span
  const checkSelectedSpan = useCallback((editor: any) => {
    if (!editor) return;

    const {state} = editor;
    const {selection} = state;
    const {from} = selection;

    const pos = from;

    if (editor.isActive('customSpan')) {
      // 获取 customSpan 标记的属性
      const spanAttrs = editor.getAttributes('customSpan');

      setSelectedNodePos(pos);
      setSelectedAttrs({
        'aria-label':    spanAttrs['aria-label'] || '',
        'data-speaker':  spanAttrs['data-speaker'] || '',
        'data-voice-id': spanAttrs['data-voice-id'] || ''
      });
    }
  }, []);

  const onEditSpanAttributes = useCallback(() => {
    if (editor && editor.isActive('customSpan')) {
      const spanAttrs = editor.getAttributes('customSpan');

      setSelectedAttrs({
        'aria-label':    spanAttrs['aria-label'] || '',
        'data-speaker':  spanAttrs['data-speaker'] || '',
        'data-voice-id': spanAttrs['data-voice-id'] || ''
      });

      setShowModal(true);
    }
  }, [editor]);

  const saveAttributes = useCallback((newAttrs: any) => {
    if (editor) {
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
  }, [editor]);

  const createNewSpan = useCallback(() => {
    if (editor) {
      const attrs = {
        'aria-label':    '',
        'data-speaker':  '',
        'data-voice-id': uuidv4()
      };

      // 先插入文本，然后应用标记
      editor.chain()
            .focus()
            .insertContent('在此输入文本')
            .setMark('customSpan', attrs)
            .run();
    }
  }, [editor]);

  const handleSave = useCallback(() => {
    if (editor && onSave) {
      onSave(editor.getHTML());
    }
  }, [editor, onSave]);

  if (!editor) {
    return <div className="p-4 text-center">加载中...</div>;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Toolbar
        editor={editor}
        onEditSpanAttributes={onEditSpanAttributes}
        onCreateNewSpan={createNewSpan}
        onSave={handleSave}
      />

      <div className="p-4 min-h-[200px] bg-white">
        <EditorContent editor={editor} className="prose max-w-none"/>
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
