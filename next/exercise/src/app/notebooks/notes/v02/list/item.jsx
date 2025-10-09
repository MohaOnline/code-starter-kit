import NextLink from "next/link";
import React, {useCallback} from "react";

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

  const click2Details = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      currentNoteId: note.id,
      note: note,
    }))
  }, [note, setStatus]);

  return (<>
    <div className={'border p-2'} draggable="false">
      <Typography className={'cursor-move'} variant="h6" gutterBottom>{note.title}</Typography>
      <div className={'cursor-pointer ps-8 line-clamp-2'} onClick={click2Details}
           dangerouslySetInnerHTML={{__html: note.body_script}}/>
    </div>
  </>);
}