'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { wordsAtom, currentWordIndexAtom, audioConfigAtom } from '@/app/lib/atoms';

export const WordDisplay: React.FC = () => {
  const [words] = useAtom(wordsAtom);
  const [currentWordIndex] = useAtom(currentWordIndexAtom);
  const [audioConfig] = useAtom(audioConfigAtom);

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">加载中...</div>
      </div>
    );
  }

  const currentWord = words[currentWordIndex];
  if (!currentWord) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">没有找到单词</div>
      </div>
    );
  }

  const translation = currentWord.translations?.[0];

  return (
    <div className="bg-card rounded-lg border p-8 mb-6 text-center">
      {/* 音标 */}
      {translation?.phonetic_uk && (
        <div className="text-sm text-muted-foreground mb-2">
          UK: /{translation.phonetic_uk}/
          {translation.phonetic_us && (
            <span className="ml-4">US: /{translation.phonetic_us}/</span>
          )}
        </div>
      )}

      {/* 词性 */}
      {translation?.pos && (
        <div className="text-sm text-muted-foreground mb-4">
          {translation.pos}
        </div>
      )}

      {/* 英文单词 */}
      {audioConfig.english.showText && (
        <div className="text-6xl font-bold mb-6 text-primary">
          {currentWord.word}
        </div>
      )}

      {/* 中文翻译 */}
      {audioConfig.chinese.showText && translation?.translation && (
        <div className="text-2xl text-muted-foreground mb-4">
          {translation.translation}
        </div>
      )}

      {/* 脚本内容 */}
      {translation?.script && (
        <div className="text-sm text-muted-foreground mt-4 p-4 bg-muted rounded">
          <div dangerouslySetInnerHTML={{ __html: translation.script }} />
        </div>
      )}

      {/* 笔记 */}
      {translation?.note && (
        <div className="text-sm text-muted-foreground mt-4 p-4 bg-muted rounded">
          <strong>笔记:</strong> {translation.note}
        </div>
      )}

      {/* 笔记说明 */}
      {translation?.note_explain && (
        <div className="text-sm text-muted-foreground mt-2 p-4 bg-muted rounded">
          <strong>说明:</strong> {translation.note_explain}
        </div>
      )}
    </div>
  );
};