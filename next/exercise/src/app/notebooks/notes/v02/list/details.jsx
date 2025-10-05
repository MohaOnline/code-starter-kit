import {Button, Typography} from "@mui/material";
import {useStatus} from "@/app/lib/atoms";
import './details.css';
import {useCallback, useEffect, useRef} from "react";
import {bindCtrlCmdShortcut2ButtonClickFactory, bindShortcut2ButtonClickFactory} from "@/lib/react/common";

export function Details(props) {
  const [status, setStatus] = useStatus();
  const {note} = props;
  const editButtonRef = useRef(null);
  const closeButtonRef = useRef(null);


  const shortcutEditButton = useCallback(bindCtrlCmdShortcut2ButtonClickFactory(editButtonRef, 'e'), []);
  const shortcutCloseButton = useCallback(bindShortcut2ButtonClickFactory(closeButtonRef, 'Escape'), []);
  // 键盘快捷键监听
  useEffect(() => {
    // 给保存、取消按钮设置快捷键
    document.addEventListener('keydown', shortcutEditButton);
    document.addEventListener('keydown', shortcutCloseButton);

    // 清理函数
    return () => {
      document.removeEventListener('keydown', shortcutEditButton);
      document.removeEventListener('keydown', shortcutCloseButton);
    };
  }, []); // 空依赖数组，只在组件挂载和卸载时执行

  return (<>
    {(note.tid === '999' || note.type_id === '999' || note.type_id === '997') &&
      <>
        <Typography variant="h1" gutterBottom sx={{textAlign: "center"}}>{note.title}</Typography>
        <article className={'prose text-inherit dark:text-primary m-auto max-w-4xl'}
                 dangerouslySetInnerHTML={{__html: note.body_script}}/>
      </>
    }

    {!status.isEditing && // 编辑的时候不需要操作按钮，整个 Details 变成预览。
      <div className={'gap-2 flex flex-row justify-end'}>
        <Button ref={editButtonRef} sx={{
          backgroundColor: 'success.light', // @see https://mui.com/material-ui/customization/default-theme/
          '&:hover': { // 鼠标悬停
            backgroundColor: 'success.dark',
            color: 'error.contrastText',
          },
        }} className={''} variant="contained"
                onClick={() => {
                  setStatus(prev => ({
                    ...prev,
                    isEditing: true,
                  }))
                }}
        >Edit</Button>
        <Button ref={closeButtonRef} sx={{
          backgroundColor: 'grey.300',
          '&:hover': {
            backgroundColor: 'grey.500',
            color: 'error.contrastText',
          },
        }} variant="contained"
                onClick={() => {
                  setStatus(prev => ({
                    ...prev,
                    currentNoteId: '',
                  }))
                }}
        >Close</Button>
      </div>
    }

  </>);
}