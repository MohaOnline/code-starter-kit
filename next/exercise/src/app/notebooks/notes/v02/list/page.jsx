"use client"

import React, {useEffect, useState} from "react";

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
import {Editor} from "@/app/notebooks/notes/v02/list/editor";
import {ThemeToggle} from "@/app/lib/components/ThemeToggle";
import {Sidebar} from "@/app/notebooks/notes/v02/list/sidebar";


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
      <ThemeToggle/>
      <div className={"flex flex-col items-center justify-center"}>
        {!status.currentNoteId &&
          <h1 className={''}>Notes</h1>}

        <div className={"flex flex-row w-full justify-center"}>
          {/* Sidebar: Type Filter, Topic Selector. */}
          {!status.currentNoteId && !status.isEditing &&
            <div className={'w-72'}>
              <Sidebar/>
            </div>
          }

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
            <div className={'note-details p-2 ' + (!status.isEditing ? 'basis-3/5' : 'basis-2/5')}>
              <Details note={status.note}/>
            </div>}

          {/* Editor */}
          {status.isEditing &&
            <div className={'basis-3/5'}>
              <Editor note={status.note}/>
            </div>
          }
        </div>
      </div>

      <ProcessingMask/>
      <ToastContainer position="top-right" newestOnTop={false} draggable
                      autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss pauseOnHover
                      rtl={false}/>
    </>
  );
}