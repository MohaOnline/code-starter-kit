"use client"

import {useEffect, useState} from "react";

import {
  autocompleteClasses, Autocomplete, Box, Button, Checkbox, Chip,
  ListSubheader, Stack, Tabs, Tab, TextField, Typography, useTheme
} from '@mui/material';


import {useStatus} from "@/app/lib/atoms";
import NavTop from '@/app/lib/components/NavTop';


export default function NotesList() {
  const [status, setStatus] = useStatus();

  useEffect(() => {

  }, []);

  return (
    <>
      <NavTop/>
      <div className={"flex flex-col items-center justify-center"}>
        <h1 className={''}>Notes</h1>

        <div className={"flex flex-row w-full justify-center"}>
          {/* Note List & Detail */}
          <div className={'basis-1/2'}>
            <h2>lo</h2>
          </div>

          {/* Editor */}
          <div className={'basis-1/2'}>
            <h2>editor</h2>
            <Button variant="contained">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}