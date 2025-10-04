import {Button, Typography} from "@mui/material";
import {useStatus} from "@/app/lib/atoms";

export function Details(props) {
  const [status, setStatus] = useStatus();
  const {note} = props;

  return (<>
    {(note.tid === '999' || note.type_id === '999' || note.type_id === '997') &&
      <>
        <Typography variant="h5" gutterBottom sx={{textAlign: "center"}}>{note.title}</Typography>
        <article className={'prose text-inherit dark:text-primary m-auto max-w-4xl'}
                 dangerouslySetInnerHTML={{__html: note.body_script}}/>
      </>
    }

    {!status.isEditing && // 编辑的时候不需要操作按钮，整个 Details 变成预览。
      <div className={'gap-2 flex flex-row justify-end'}>
        <Button sx={{
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
        <Button sx={{
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