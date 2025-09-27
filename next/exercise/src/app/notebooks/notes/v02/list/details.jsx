import {Typography} from "@mui/material";

export function Details(props) {

  const {note} = props;

  return (<>
    <Typography variant="h5" gutterBottom>{note.title}</Typography>
    <article className={'prose text-inherit'}
             dangerouslySetInnerHTML={{__html: note.body_script}}/>
  </>);
}