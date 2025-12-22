import React, {useCallback} from 'react';
import NextLink from "next/link";
import {useRouter} from 'next/navigation';

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
  const router = useRouter();

  const click2Details = useCallback(() => {
    router.push(`/notebooks/notes/v02/list?noteId=${note.id}`);
  }, [router, note.id]);

  // Template Default
  return (<>
    <div className={'border p-2'} draggable="false">
      {/* Title 有部分 note 没有 title */}
      {(note.tid === '999' || note.tid === '997' || note.tid === '61' || note.tid === '31' || note.tid === '21') &&
      <Typography className={'cursor-move flex justify-between'} variant="h6" gutterBottom>
        {note.title}
        <Button className={'absolut mr-0'} size="small" onClick={click2Details}>Show</Button>
      </Typography>
      }

      {/* ID 英语听力还不知道如何显示 */}
      {note.tid !== '999' && note.tid !== '997' && note.tid !== '61' && note.tid !== '31' && note.tid !== '21' && note.tid !== '16' &&
        <Typography className={'cursor-move flex justify-between'} variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: note.id}}/>
      }

      {/* body_script */}
      {note.tid === '999' &&
      <div className={'cursor-pointer ps-8 line-clamp-2'} onClick={click2Details}
           dangerouslySetInnerHTML={{__html: note.body_script}}/>
      }

      {/* question */}
      {note.tid === '16' &&
        <div className={``}>
          <Typography variant="h6" dangerouslySetInnerHTML={{__html: `翻译：<span>[ID: ${note.id}]</span> ${note.question}`}}/>
          <Button className={'absolut mr-0'} size="small" onClick={click2Details}>Show</Button>
        </div>
      }
    </div>
  </>);
}