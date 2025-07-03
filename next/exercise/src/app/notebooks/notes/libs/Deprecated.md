```js

// Useless, only for reference.
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
```