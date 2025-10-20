import React, { useCallback, useEffect, useRef, useState } from "react";

import Script from "next/script";

import { css, Global } from '@emotion/react';
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container,
  Link, ListSubheader, Menu, MenuItem, IconButton, Stack,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';

import { useStatus } from "@/app/lib/atoms";
import { toast } from "react-toastify";
import { SelectFieldSingle } from "@/lib/components/mui/SelectFields";

export function Sidebar() {
  const [status, setStatus] = useStatus();

  // 加载 Types 数据 - 只在数据为空时加载
  useEffect(() => {
    // 如果已经有数据，就不重复加载
    if (status.types.length > 0) {
      console.log('Types already loaded, skipping fetch');
      return;
    }

    console.log('Loading types data from API...');
    fetch('/api/notebooks/types/list')
      .then(res => res.json())
      .then(json => {
        const convertedTypes = json.types;

        setStatus((prev) => ({
          ...prev,
          types: convertedTypes,
        }));
        console.log('Types loaded successfully:', convertedTypes.length);
      })
      .catch(err => {
        console.error('Fetch API error: /api/notebooks/types/list');
        toast.error('cant load types from API.');
      });
  }, [status.types.length, setStatus]);

  return (
    <>
      <Stack className={'border pt-1'}>
        <SelectFieldSingle label='Types' items={status.types.map((type) => ({ value: type.id, label: type.title_sub ? `${type.title} - ${type.title_sub}` : type.title }))}
                           value={status.selectedTypeID} updateValue={status.setSelectedTypeID}/>
        {/*{status.types.map((type) => (*/}
        {/*  <div key={type.id}>{`${type.id} ${type.title}`}</div>*/}
        {/*))}*/}
      </Stack>
    </>
  );
}