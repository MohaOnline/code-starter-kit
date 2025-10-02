import Link from "next/link";

import {
  autocompleteClasses, Autocomplete, Box, Button, Checkbox, Chip,
  ListSubheader, Stack, Tabs, Tab, TextField, Typography, useTheme
} from '@mui/material';

import {useStatus} from "@/app/lib/atoms";

export function Item({note}) {
  const [status, setStatus] = useStatus();

  console.log('Item', note);
  if (note.id !== '47') {
    return (<>

    </>);
  }

  return (<>
    <div className={'border p-2 cursor-pointer'} onClick={() => {
      setStatus((prev) => ({
        ...prev,
        currentNoteId: note.id,
        note: note,
      }))
    }}>
      <Typography variant="h6" gutterBottom>{note.title}</Typography>
      <div className={'ps-8 line-clamp-2'}
           dangerouslySetInnerHTML={{__html: note.body_script}}/>
    </div>
  </>);
}