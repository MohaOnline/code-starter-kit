import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, FormControl, InputLabel, InputAdornment,
  Link, ListItemText, ListSubheader, Menu, MenuItem, MenuList, IconButton, Stack, Select,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {Clear} from '@mui/icons-material';

import _ from "lodash";

export function SelectFieldSingle({
  label = '', items = [], value = '', updateValue = (value) => {
  }
}) {

  const [selected, setSelected] = React.useState(value);
  console.log('value@SelectFieldSingle', value);
  console.log('selected@SelectFieldSingle', selected);

  const handleChange = (event) => {
    console.log('handleChange', selected, event);
    const {target: {value},} = event;

    const newValue = selected === value ? '' : value;

    setSelected(newValue);
    updateValue(newValue);
  };

  const handleClear = () => {
    setSelected('');
    updateValue('');
  }

  const id = useMemo(() => _.kebabCase(label), [label]);

  return (
    <FormControl sx={{m: 1, minWidth: 180,}} size="small">
      <InputLabel id={`${id}-label`} shrink={true}>{label}</InputLabel>
      <Select value={value ?? ''} renderValue={(value) => (items.find((item) => item.value === value)?.label)} onChange={handleChange}
              sx={{
                '& .MuiSelect-select': {        // Select 内容显示区域
                  paddingRight: '0 !important', // 自定义内边距，适配 endAdornment
                },
                '& .MuiSelect-icon': {          // Select 框的三角
                  right: '0 !important',
                },
              }}
              endAdornment={
                (value || selected) && (<InputAdornment position="end" sx={{marginRight: 0.5, marginLeft: 0}}>
                  <IconButton onClick={handleClear} size="small"><Clear fontSize="small"/></IconButton>
                </InputAdornment>)
              }
              labelId={`${id}-label`} id={id} variant={'outlined'}>
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}