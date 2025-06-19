'use client';

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
// "ckeditor4-react": "^4.3.0",
// import { CKEditor } from 'ckeditor4-react'
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { linter, lintGutter } from '@codemirror/lint';
import { htmlCompletionSource, htmlLanguage } from '@codemirror/lang-html';
import { syntaxTree } from '@codemirror/language';
import { autocompletion } from '@codemirror/autocomplete';
import { EditorView } from '@codemirror/view';

import { useStatus } from '@/app/lib/atoms'

const NoteHTMLCodeArea = ({
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
const TranslationSentenceForm = (handleNoteChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, status: any) => {

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="question">Question</Label>
        <NoteHTMLCodeArea handleNoteChange={handleNoteChange} status={status} name="question" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="answer">Answer</Label>
        <NoteHTMLCodeArea handleNoteChange={handleNoteChange} status={status} name="answer" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="note">Note</Label>
        <Textarea id="note" name="note"
                  value={status.note?.note || ''}
                  onChange={handleNoteChange}/>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="note_extra">Note Extra</Label>
        <Textarea id="note_extra" name="note_extra"
                  value={status.note?.note_extra || ''}
                  onChange={handleNoteChange}/>
      </div>
    </>
  );
}

export const NoteDialogFormItemRender = ({}) => {
  const [status, setStatus] = useStatus()    // 自定义状态管理

  function handleNoteFormItemChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    console.log('handleNoteFormItemChange', e.target.name, e.target.value)

    setStatus((prev) => ({
        ...prev,
        note: {
          ...prev.note,
          [e.target.name]: e.target.value,
        },
      }),
    )
  }

  /**
   * 处理 ckeditor onChange 事件
   * 
   * @param name 字段名
   */
  function handleCKEditorChange(name: string) {
    return (event: any) => {
      const data = event.editor.getData();
      setStatus((prev) => ({
        ...prev,
        note: {
          ...prev.note,
          [name]: data,
        },
      }))
    }
  }

  if (status.note?.type?.id ==='16'){
    return TranslationSentenceForm(handleNoteFormItemChange, status);
  }

  return (<></>);
}

const NoteDialogFormScienceEngineering = (
  handleNoteChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, data, status) => {
  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={data.title || ''}
               onChange={handleNoteChange}/>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" name="body" value={data.body || ''}
                  onChange={handleNoteChange}/>
      </div>
      {/* <CKEditor initData={status.note?.note || ''} value={status.note?.note || ''}
                config={{
                  versionCheck: false,  // https://forum.xwiki.org/t/cke-editor-warning-4-22-1-version-not-secure/14020/13
                  toolbar: [
                    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
                    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'] },
                    { name: 'links', items: ['Link', 'Unlink'] },
                    { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
                    { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
                    { name: 'colors', items: ['TextColor', 'BGColor'] },
                    { name: 'tools', items: ['Maximize'] },
                    { name: 'document', items: ['Source'] },  // https://ckeditor.com/docs/ckeditor4/latest/features/toolbar.html
                  ],
                  height: 200,
                  removePlugins: 'elementspath',
                  resize_enabled: false
                }} /> */}
    </>
  )
}