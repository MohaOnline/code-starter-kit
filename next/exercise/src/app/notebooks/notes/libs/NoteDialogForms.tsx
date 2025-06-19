import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { CKEditor } from 'ckeditor4-react'

import { useStatus } from '@/app/lib/atoms'

const TranslationSentenceForm = (handleNoteChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, status: any) => {
  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="question">Question</Label>
        <Textarea id="question" name="question"
                  value={status.note?.question || ''}
                  onChange={handleNoteChange}/>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="answer">Answer</Label>
        <Textarea id="answer" name="answer" value={status.note?.answer || ''}
                  onChange={handleNoteChange}/>
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

export const NoteDialogFormItemRender = () => {
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
      <CKEditor initData={status.note?.note || ''} value={status.note?.note || ''}
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
                }} />
    </>
  )
}