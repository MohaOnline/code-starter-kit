import React, {useCallback, useEffect, useRef, useState} from "react";

import Script from "next/script";

import {css, Global} from '@emotion/react';
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container,
  Link, ListSubheader, Menu, MenuItem, IconButton, Stack,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';

import {useStatus} from "@/app/lib/atoms";
import {toast} from "react-toastify";
import {SelectFieldSingle} from "@/lib/components/mui/SelectFields";

export function Sidebar() {
  const [status, setStatus] = useStatus();

  // 加载 Types 数据
  useEffect(() => {
    fetch('/api/notebooks/types/list')
      .then(res => res.json())
      .then(json => {
        const convertedTypes = json.types.map((type) => ({
          ...type,
          id: Number(type.id),
          pid: Number(type.pid)
        }));

        setStatus((prev) => ({
          ...prev,
          types: convertedTypes,
        }));
      })
      .catch(err => {
        console.error('Fetch API error: /api/notebooks/types/list');
        toast.error('cant load types from API.');
      });
  }, []);

  return (
    <>
      <Stack className={'border pt-1'}>
        <SelectFieldSingle label='Types' items={status.types.map((type) => ({value: type.id, label: type.title_sub ? `${type.title} - ${type.title_sub}` : type.title}))}
                           updateValue={(value) => {
                             setStatus(prev => ({...prev, filteredTypeID: value}))
                           }}/>
        {/*{status.types.map((type) => (*/}
        {/*  <div key={type.id}>{`${type.id} ${type.title}`}</div>*/}
        {/*))}*/}
      </Stack>
    </>
  );
}