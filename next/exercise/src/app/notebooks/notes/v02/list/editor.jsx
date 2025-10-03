import Link from "next/link";

import {
  autocompleteClasses, Autocomplete, Box, Button, Checkbox, Chip,
  ListSubheader, Stack, Tabs, Tab, TextField, Typography, useTheme
} from '@mui/material';

import {useStatus} from "@/app/lib/atoms";

export function Editor({note}) {
  const [status, setStatus] = useStatus();

  return (
    <>
      <Stack>
        <TextField id="outlined-basic" label="Title" variant="outlined"/>
        {/* body_script first */}
        {(note.tid === '999' || note.type_id === '999' || note.type_id === '997') &&
          <>

          </>
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