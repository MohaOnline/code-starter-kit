import React, {useCallback} from "react";
import NextLink from "next/link";

import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, IconButton, Input,
  Link, ListSubheader, Menu, MenuItem, OutlinedInput,
  Stack, Tabs, Tab, TextField, Toolbar, Tooltip, Typography,
  useTheme
} from '@mui/material';

import {useStatus} from "@/app/lib/atoms";
import HTMLField from "@/app/lib/components/HTMLField/v01";
import {Panel} from '@/lib/components/tailwind/panel/v01';

export function Editor({note}) {
  const [status, setStatus] = useStatus();

  const updateStatusNoteAttribute = useCallback((val, attribute) => {
    console.log('val:', val);
    setStatus(prev => ({
      ...prev,
      note: {
        ...prev.note,
        [attribute]: val,
      },
    }));
  }, [setStatus]);

  return (
    <>
      <Stack paddingTop={2} paddingBottom={2} gap={2}>
        {/* title */}
        <TextField id="outlined-basic" label="Title" variant="outlined" value={note.title} onChange={(e) => {
          updateStatusNoteAttribute(e.target.value, 'title')
        }}/>

        {/* body_script first */}
        {(note.tid === '999' || note.type_id === '999' || note.type_id === '997') &&
          <Panel title={'body_script'}><>
            <HTMLField content={note.body_script} onChange={(value) => {
              updateStatusNoteAttribute(value, 'body_script')
            }}/>
          </>
          </Panel>
        }
      </Stack>



      <div className={'gap-2 flex flex-row justify-end'}>
        <Button variant="contained">Save</Button>
        <Button variant="outlined"
                color="error"   // @see https://mui.com/material-ui/customization/palette/#default-colors
                onClick={() => {
                  setStatus(prev => ({
                    ...prev,
                    isEditing: false,
                  }))
                }}
        >Cancel</Button>
      </div>
    </>
  );
}