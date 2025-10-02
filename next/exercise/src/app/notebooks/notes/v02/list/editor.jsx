import Link from "next/link";

import {
  autocompleteClasses, Autocomplete, Box, Button, Checkbox, Chip,
  ListSubheader, Stack, Tabs, Tab, TextField, Typography, useTheme
} from '@mui/material';

import {useStatus} from "@/app/lib/atoms";

export function Editor() {
  const [status, setStatus] = useStatus();

  return (
    <>
      <div className={'gap-2 flex flex-row justify-end'}>
        <Button variant="contained">Save</Button>
        <Button variant="contained"
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