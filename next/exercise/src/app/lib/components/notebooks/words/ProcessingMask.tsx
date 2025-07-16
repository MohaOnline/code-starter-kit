'use client';

import { useAtom } from 'jotai';
import { uiStateAtom } from '@/app/lib/atoms';

interface ProcessingMaskProps {
  className?: string;
}

export function ProcessingMask({ className = '' }: ProcessingMaskProps) {
  const [uiState] = useAtom(uiStateAtom);

  if (!uiState.isProcessing) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-700">{uiState.processingMessage || '处理中...'}</span>
        </div>
      </div>
    </div>
  );
}