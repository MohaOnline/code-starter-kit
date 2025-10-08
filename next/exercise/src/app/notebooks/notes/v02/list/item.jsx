import NextLink from "next/link";

import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, IconButton, Input,
  Link, ListSubheader, Menu, MenuItem, OutlinedInput,
  Stack, Tabs, Tab, TextField, Toolbar, Tooltip, Typography,
  useTheme
} from '@mui/material';

import {useStatus} from "@/app/lib/atoms";

export function Item({note}) {
  const [status, setStatus] = useStatus();

  // 暂时仅处理 999 类型 notes
  if (note.tid !== '999') {
    return (<>

    </>);
  }

  return (<>
    <div className={'border p-2 cursor-pointer'} draggable="false" onClick={() => {
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