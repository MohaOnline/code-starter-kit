"use client"

import {useEffect, useState} from "react";

import {
  autocompleteClasses, Autocomplete, Box, Button, Checkbox, Chip,
  ListSubheader, Stack, Tabs, Tab, TextField, Typography, useTheme
} from '@mui/material';


import {useStatus} from "@/app/lib/atoms";
import NavTop from '@/app/lib/components/NavTop';
import {toast, ToastContainer} from "react-toastify";
import {ProcessingMask} from "@/app/lib/components/ProcessingMask";
import {Item} from "./item";
import {Details} from "@/app/notebooks/notes/v02/list/details";


export default function NotesList() {
  const [status, setStatus] = useStatus();

  // 加载所有 notes
  useEffect(() => {

    fetch('/api/notebooks/notes/list')
      .then(res => res.json())
      .then(json => {
        setStatus((prev) => ({
          ...prev,
          notes: json.notes,
        }))
      })
      .catch(err => {
        console.error('Fetch API error: /api/notebooks/notes/list');
        toast.error('cant load notes from API.');
      });

  }, []);
  if (status.notes?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavTop/>

      <div className={"flex flex-col items-center justify-center"}>
        <h1 className={''}>Notes</h1>

        <div className={"flex flex-row w-full justify-center"}>
          {/* Note List & Detail */}
          {!status.currentNoteId &&
          <div className={'basis-1/2'}>
            {status.notes?.map((note) => (
              <Item key={note.id} note={note}/>
            ))}
          </div>
          }
          {/* Certain Note is selected */}
          {status.currentNoteId &&
            <div className={'basis-1/2'}>
              <Details note={status.notes.find(note => note.id === status.currentNoteId)}/>
              <Button variant="contained" onClick={() => {
                setStatus(prev => ({
                  ...prev,
                  currentNoteId: '',
                }))
              }}>Close</Button>
              <Button variant="contained">Edit</Button>
            </div>}

          {/* Editor */}
          <div className={'basis-1/2'}>
            <h2>editor</h2>
            <Button variant="contained">Cancel</Button>
            <Button variant="contained">Save</Button>
          </div>
        </div>
      </div>

      <ProcessingMask/>
      <ToastContainer position="top-right" newestOnTop={false} draggable
                      autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss pauseOnHover
                      rtl={false}/>
    </>
  );
}