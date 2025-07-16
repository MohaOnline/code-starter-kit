'use client';

import { useAtom } from 'jotai';
import { uiStateAtom } from '@/app/lib/atoms';
import { Button } from '@/components/ui/button';
import { BookOpen, Volume2 } from 'lucide-react';

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className = '' }: ModeToggleProps) {
  const [uiState, setUiState] = useAtom(uiStateAtom);

  const toggleMode = () => {
    setUiState(prev => ({
      ...prev,
      mode: prev.mode === 'study' ? 'listen' : 'study'
    }));
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant={uiState.mode === 'study' ? 'default' : 'outline'}
        size="sm"
        onClick={toggleMode}
        className="flex items-center space-x-1"
      >
        <BookOpen className="w-4 h-4" />
        <span>学习模式</span>
      </Button>
      
      <Button
        variant={uiState.mode === 'listen' ? 'default' : 'outline'}
        size="sm"
        onClick={toggleMode}
        className="flex items-center space-x-1"
      >
        <Volume2 className="w-4 h-4" />
        <span>听力模式</span>
      </Button>
    </div>
  );
}