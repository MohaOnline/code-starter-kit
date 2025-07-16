'use client';

import React from 'react';
import { useAtom } from 'jotai';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { uiStateAtom } from '@/app/lib/atoms';
import { useAudioConfig } from './hooks/useAudioConfig';

export const AudioConfigDialog: React.FC = () => {
  const [uiState, setUiState] = useAtom(uiStateAtom);
  const { audioConfig, updateAudioConfig, DEFAULT_AUDIO_CONFIG } = useAudioConfig();

  const closeDialog = () => {
    setUiState(prev => ({ ...prev, isConfigDialogOpen: false }));
  };

  const resetToDefault = () => {
    updateAudioConfig(DEFAULT_AUDIO_CONFIG);
  };

  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...audioConfig };
    let current: any = newConfig;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    
    updateAudioConfig(newConfig);
  };

  return (
    <Dialog open={uiState.isConfigDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>音频播放配置</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 全局设置 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">全局设置</h3>
            
            {/* 音量 */}
            <div className="space-y-2 mb-4">
              <Label>音量: {audioConfig.volume}%</Label>
              <div className="flex items-center space-x-2">
                {[50, 75, 100, 125, 150].map(value => (
                  <Button
                    key={value}
                    variant={audioConfig.volume === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateConfig(['volume'], value)}
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            </div>

            {/* 播放速度 */}
            <div className="space-y-2 mb-4">
              <Label>播放速度: {audioConfig.speed}%</Label>
              <div className="flex items-center space-x-2 flex-wrap">
                {[50, 75, 100, 125, 150, 175, 200, 225].map(value => (
                  <Button
                    key={value}
                    variant={audioConfig.speed === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateConfig(['speed'], value)}
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            </div>

            {/* 交错播放 */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={audioConfig.alternatePlay}
                onCheckedChange={(checked) => updateConfig(['alternatePlay'], checked)}
              />
              <Label>交错播放</Label>
            </div>
          </div>

          <Separator />

          {/* 英文设置 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">英文设置</h3>
            
            {/* 发音次数 */}
            <div className="space-y-2 mb-4">
              <Label>发音次数: {audioConfig.english.repeatCount}次</Label>
              <Slider
                value={[audioConfig.english.repeatCount]}
                onValueChange={([value]) => updateConfig(['english', 'repeatCount'], value)}
                max={5}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            {/* 停顿时间 */}
            <div className="space-y-2 mb-4">
              <Label>停顿时间: {audioConfig.english.pauseTime}秒</Label>
              <Slider
                value={[audioConfig.english.pauseTime]}
                onValueChange={([value]) => updateConfig(['english', 'pauseTime'], value)}
                max={1.25}
                min={0}
                step={0.25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>0.25</span>
                <span>0.5</span>
                <span>0.75</span>
                <span>1</span>
                <span>1.25</span>
              </div>
            </div>

            {/* 等待音频时长 */}
            <div className="flex items-center space-x-2 mb-2">
              <Switch
                checked={audioConfig.english.waitVoiceLength}
                onCheckedChange={(checked) => updateConfig(['english', 'waitVoiceLength'], checked)}
              />
              <Label>等待音频时长</Label>
            </div>

            {/* 显示英文 */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={audioConfig.english.showText}
                onCheckedChange={(checked) => updateConfig(['english', 'showText'], checked)}
              />
              <Label>显示英文</Label>
            </div>
          </div>

          <Separator />

          {/* 中文设置 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">中文设置</h3>
            
            {/* 发音次数 */}
            <div className="space-y-2 mb-4">
              <Label>发音次数: {audioConfig.chinese.repeatCount}次</Label>
              <Slider
                value={[audioConfig.chinese.repeatCount]}
                onValueChange={([value]) => updateConfig(['chinese', 'repeatCount'], value)}
                max={5}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            {/* 停顿时间 */}
            <div className="space-y-2 mb-4">
              <Label>停顿时间: {audioConfig.chinese.pauseTime}秒</Label>
              <Slider
                value={[audioConfig.chinese.pauseTime]}
                onValueChange={([value]) => updateConfig(['chinese', 'pauseTime'], value)}
                max={1.25}
                min={0}
                step={0.25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>0.25</span>
                <span>0.5</span>
                <span>0.75</span>
                <span>1</span>
                <span>1.25</span>
              </div>
            </div>

            {/* 等待音频时长 */}
            <div className="flex items-center space-x-2 mb-2">
              <Switch
                checked={audioConfig.chinese.waitVoiceLength}
                onCheckedChange={(checked) => updateConfig(['chinese', 'waitVoiceLength'], checked)}
              />
              <Label>等待音频时长</Label>
            </div>

            {/* 显示中文 */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={audioConfig.chinese.showText}
                onCheckedChange={(checked) => updateConfig(['chinese', 'showText'], checked)}
              />
              <Label>显示中文</Label>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetToDefault}>
              恢复默认
            </Button>
            <Button onClick={closeDialog}>
              确定
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};