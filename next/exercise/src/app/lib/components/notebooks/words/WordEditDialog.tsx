'use client';

import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { FaTrash, FaSync } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  uiStateAtom, 
  dialogDataAtom, 
  wordsAtom, 
  currentWordIndexAtom 
} from '@/app/lib/atoms';
import { toast } from 'react-toastify';

export const WordEditDialog: React.FC = () => {
  const [uiState, setUiState] = useAtom(uiStateAtom);
  const [dialogData, setDialogData] = useAtom(dialogDataAtom);
  const [words] = useAtom(wordsAtom);
  const [currentWordIndex] = useAtom(currentWordIndexAtom);
  const [isLoading, setIsLoading] = useState(false);

  // 当对话框打开时，初始化数据
  useEffect(() => {
    if (uiState.isDialogOpen && words[currentWordIndex]) {
      const currentWord = words[currentWordIndex];
      setDialogData({
        eid: currentWord.id || '',
        word: currentWord.word || '',
        accent: '',
        script: '',
        syllable: '',
        translations: currentWord.translations || [{
          id: '',
          cid: '',
          nid: '',
          pos: '',
          phonetic_us: '',
          phonetic_uk: '',
          translation: '',
          script: '',
          noted: false,
          note: '',
          note_explain: '',
        }]
      });
    }
  }, [uiState.isDialogOpen, words, currentWordIndex, setDialogData]);

  const closeDialog = () => {
    setUiState(prev => ({ ...prev, isDialogOpen: false }));
  };

  const handleInputChange = (field: string, value: any) => {
    setDialogData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTranslationChange = (index: number, field: string, value: any) => {
    setDialogData(prev => ({
      ...prev,
      translations: prev.translations.map((translation, i) => 
        i === index ? { ...translation, [field]: value } : translation
      )
    }));
  };

  const addTranslation = () => {
    // 首先检查是否有已删除的翻译可以恢复
    const deletedIndex = dialogData.translations.findIndex(t => t.deleted === true);
    if (deletedIndex !== -1) {
      handleTranslationChange(deletedIndex, 'deleted', false);
      return;
    }

    // 添加新的翻译
    setDialogData(prev => ({
      ...prev,
      translations: [
        ...prev.translations,
        {
          id: '',
          cid: '',
          nid: '',
          pos: '',
          phonetic_us: '',
          phonetic_uk: '',
          translation: '',
          script: '',
          noted: false,
          note: '',
          note_explain: '',
        }
      ]
    }));
  };

  const removeTranslation = (index: number) => {
    if (dialogData.translations.length <= 1) {
      toast.warning('至少需要保留一个翻译');
      return;
    }
    handleTranslationChange(index, 'deleted', true);
  };

  const searchExistingWord = async () => {
    if (!dialogData.word) {
      toast.warning('请输入要搜索的单词');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/words-english-chinese?word=${dialogData.word}`);
      const data = await response.json();
      
      if (data?.data.length > 0) {
        setDialogData(data.data[0]);
        toast.success(`找到单词: ${dialogData.word}`);
      } else {
        toast.info(`未找到单词: ${dialogData.word}`);
      }
    } catch (error) {
      console.error('搜索单词失败:', error);
      toast.error('搜索失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAzureTTS = async () => {
    if (!dialogData.word) {
      toast.warning('请输入单词');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/azure-tts-refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: dialogData.word,
          translations: dialogData.translations.filter(t => !t.deleted)
        }),
      });

      if (response.ok) {
        toast.success('Azure TTS 刷新成功');
      } else {
        toast.error('Azure TTS 刷新失败');
      }
    } catch (error) {
      console.error('刷新 Azure TTS 失败:', error);
      toast.error('刷新失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  const saveWord = async () => {
    if (!dialogData.word) {
      toast.warning('请输入单词');
      return;
    }

    const validTranslations = dialogData.translations.filter(t => !t.deleted && t.translation);
    if (validTranslations.length === 0) {
      toast.warning('请至少添加一个翻译');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/words-english-chinese', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...dialogData,
          translations: validTranslations
        }),
      });

      if (response.ok) {
        toast.success('保存成功');
        closeDialog();
      } else {
        toast.error('保存失败');
      }
    } catch (error) {
      console.error('保存单词失败:', error);
      toast.error('保存失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={uiState.isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑单词</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="word">单词</Label>
              <Input
                id="word"
                value={dialogData.word || ''}
                onChange={(e) => handleInputChange('word', e.target.value)}
                placeholder="输入英文单词"
              />
            </div>
            <div>
              <Label htmlFor="accent">重音</Label>
              <Input
                id="accent"
                value={dialogData.accent || ''}
                onChange={(e) => handleInputChange('accent', e.target.value)}
                placeholder="重音标记"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="syllable">音节</Label>
              <Input
                id="syllable"
                value={dialogData.syllable || ''}
                onChange={(e) => handleInputChange('syllable', e.target.value)}
                placeholder="音节划分"
              />
            </div>
            <div>
              <Label htmlFor="script">脚本</Label>
              <Textarea
                id="script"
                value={dialogData.script || ''}
                onChange={(e) => handleInputChange('script', e.target.value)}
                placeholder="HTML脚本内容"
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* 翻译列表 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">翻译</h3>
              <Button onClick={addTranslation} size="sm">
                添加翻译
              </Button>
            </div>

            {dialogData.translations.map((translation, index) => {
              if (translation.deleted) return null;
              
              return (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">翻译 {index + 1}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTranslation(index)}
                    >
                      <FaTrash className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label>词性</Label>
                      <Input
                        value={translation.pos || ''}
                        onChange={(e) => handleTranslationChange(index, 'pos', e.target.value)}
                        placeholder="如: n., v., adj."
                      />
                    </div>
                    <div>
                      <Label>翻译</Label>
                      <Input
                        value={translation.translation || ''}
                        onChange={(e) => handleTranslationChange(index, 'translation', e.target.value)}
                        placeholder="中文翻译"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label>美式音标</Label>
                      <Input
                        value={translation.phonetic_us || ''}
                        onChange={(e) => handleTranslationChange(index, 'phonetic_us', e.target.value)}
                        placeholder="美式音标"
                      />
                    </div>
                    <div>
                      <Label>英式音标</Label>
                      <Input
                        value={translation.phonetic_uk || ''}
                        onChange={(e) => handleTranslationChange(index, 'phonetic_uk', e.target.value)}
                        placeholder="英式音标"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <Label>脚本</Label>
                    <Textarea
                      value={translation.script || ''}
                      onChange={(e) => handleTranslationChange(index, 'script', e.target.value)}
                      placeholder="HTML脚本内容"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label>笔记</Label>
                      <Textarea
                        value={translation.note || ''}
                        onChange={(e) => handleTranslationChange(index, 'note', e.target.value)}
                        placeholder="学习笔记"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>笔记说明</Label>
                      <Textarea
                        value={translation.note_explain || ''}
                        onChange={(e) => handleTranslationChange(index, 'note_explain', e.target.value)}
                        placeholder="笔记详细说明"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={translation.noted || false}
                      onCheckedChange={(checked) => handleTranslationChange(index, 'noted', checked)}
                    />
                    <Label>已标记</Label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={searchExistingWord}
                disabled={isLoading}
              >
                搜索现有单词
              </Button>
              <Button
                variant="outline"
                onClick={refreshAzureTTS}
                disabled={isLoading}
              >
                <FaSync className="w-3 h-3 mr-1" />
                刷新Azure TTS
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={closeDialog}>
                取消
              </Button>
              <Button onClick={saveWord} disabled={isLoading}>
                {isLoading ? '保存中...' : '保存'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};