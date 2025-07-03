'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { linter, lintGutter } from '@codemirror/lint';
import { htmlCompletionSource, htmlLanguage, html} from '@codemirror/lang-html';
import { syntaxTree } from '@codemirror/language';
import { autocompletion } from '@codemirror/autocomplete';
import { EditorView } from '@codemirror/view';

export const NoteHTMLCodeArea = ({
  handleNoteChange ,
  status , 
  name,
  height='6em'}: {
  handleNoteChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  status: any;
  name: string;
  height?: string;
}) => {
  return (
    <>
      <CodeMirror id={name} 
        value={status.note?.[name] || '<p><span aria-label="" data-voice-id=""></span></p>'}
        height={height}
        maxWidth='100%'
        theme={oneDark}
        extensions={[
          html(),
          autocompletion({  // 添加自动关闭 tag 的功能
            override: [htmlCompletionSource]
          }),
          EditorView.lineWrapping,    // 代码/内容自动换行
          lintGutter(),
          linter(view => {
            const diagnostics = [];
            const tree = syntaxTree(view.state);
            
            // 简单的HTML语法检查示例
            tree.cursor().iterate(node => {
              if (node.type.name === 'Element' && node.node.parent?.type.name === 'Document') {
                const tagName = view.state.doc.sliceString(node.from + 1, node.from + node.node.firstChild.name.length + 1).toLowerCase();
                
                // 检查未闭合的标签
                if (!node.node.lastChild || node.node.lastChild.type.name !== 'CloseTag') {
                  diagnostics.push({
                    from: node.from,
                    to: node.to,
                    severity: 'error',
                    message: `未闭合的标签: <${tagName}>`
                  });
                }
              }
            });
            
            return diagnostics;
          })
        ]}
        onChange={(value) => {
          // 模拟事件对象以兼容现有的handleNoteChange函数
          const e = {
            target: {
              name: name,
              value: value
            }
          };
          handleNoteChange(e as any);
        }}
      />
    </>
  )
}
