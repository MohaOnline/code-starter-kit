'use client';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Script from "next/script";

import {css, Global} from '@emotion/react';
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, FormControl, InputLabel, InputAdornment,
  Link, ListItemText, ListSubheader, Menu, MenuItem, IconButton, Stack, Select,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {Clear} from '@mui/icons-material';

// 3rd part libs: CodeMirror
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"

/**
 * @see /pages/mui/7/utils/v01
 */
export default function Page() {
  return (
    <>
      <div>Temp</div>
    </>
  );
}