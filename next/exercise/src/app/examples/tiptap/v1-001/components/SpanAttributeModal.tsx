"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface SpanAttributeModalProps {
  attributes: {
    'aria-label': string;
    'data-speaker': string;
    'data-voice-id': string;
  };
  onSave: (attributes: any) => void;
  onCancel: () => void;
}

export function SpanAttributeModal({ attributes, onSave, onCancel }: SpanAttributeModalProps) {
  const [ariaLabel, setAriaLabel] = useState(attributes['aria-label'] || '');
  const [speaker, setSpeaker] = useState(attributes['data-speaker'] || '');
  const [voiceId, setVoiceId] = useState(attributes['data-voice-id'] || '');

  useEffect(() => {
    // 确保有一个默认的 voiceId
    if (!voiceId) {
      setVoiceId(uuidv4());
    }
  }, [voiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      'aria-label': ariaLabel,
      'data-speaker': speaker,
      'data-voice-id': voiceId || uuidv4()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">编辑 Span 属性</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Aria Label:</label>
            <textarea
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={ariaLabel}
              onChange={(e) => setAriaLabel(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">用于屏幕阅读器，通常包含文本内容</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Speaker:</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">可选：指定说话者身份</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Voice ID:</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">唯一标识符（自动生成）</p>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={onCancel}
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
