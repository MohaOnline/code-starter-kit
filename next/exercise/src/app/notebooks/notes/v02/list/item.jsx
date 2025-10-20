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

  const click2Details = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      currentNoteId: note.id,
      note: note,
    }))
  }, [note, setStatus]);

  return (<>
    <div className={'border p-2'} draggable="false">
      {/* 有部分 note 没有 title */}
      {(note.tid === '999' || note.tid === '997' || note.tid === '61' || note.tid === '31' || note.tid === '21') &&
      <Typography className={'cursor-move flex justify-between'} variant="h6" gutterBottom>
        {note.title}
        <Button className={'absolut mr-0'} size="small" onClick={click2Details}>Show</Button></Typography>
      }

      {/* 英语听力还不知道如何显示 */}
      {note.tid !== '999' && note.tid !== '997' && note.tid !== '61' && note.tid !== '31' && note.tid !== '21' &&
        <Typography className={'cursor-move flex justify-between'} variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: note.id}}/>
      }

      {/* 需要 body_script 的 note */}
      {note.tid === '999' &&
      <div className={'cursor-pointer ps-8 line-clamp-2'} onClick={click2Details}
           dangerouslySetInnerHTML={{__html: note.body_script}}/>
      }
    </div>
  </>);
}