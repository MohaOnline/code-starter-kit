import {Typography} from "@mui/material";

export function Details(props) {

  const {note} = props;
  console.log('Details', note);
  return (<>
    {(note.tid === '999' || note.type_id === '999' || note.type_id === '997') &&
      <>
        <Typography variant="h5" gutterBottom>{note.title}</Typography>
        <article className={'prose text-inherit'}
                 dangerouslySetInnerHTML={{__html: note.body_script}}/>
      </>
    }
  </>);
}