import {Panel} from "@/lib/components/tailwind/panel/v01";
import {TagFieldGroupSingle} from "@/lib/components/mui/TagFields";
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, IconButton, Input,
  Link, ListSubheader, Menu, MenuItem, OutlinedInput,
  Stack, Tabs, Tab, TextField, Toolbar, Tooltip, Typography,
  useTheme
} from '@mui/material';
import {Adb as AdbIcon, Menu as MenuIcon} from '@mui/icons-material';

import NextLink from "next/link";
import React from "react";

import {Mui7NaviMenu} from "@/pages/mui/7/nav/menu/v01"

export function Mui7Navi() {


  const menus = [
    {
      label: 'Utils',
      children: [
        {
          label: 'Framework 7',
          children: [
            {label: 'basic', href: '/pages/framework7/basic'},
            {label: 'advanced', href: '/pages/framework7/advanced'},
            {label: 'extra', href: '/pages/framework7/extra'},
          ],
        },
        {label: 'MUI', href: '/pages/mui/7/utils/v01'},
        {label: 'Tailwind v3', href: '/pages/tailwind/3/v02'},
      ],
    },
    {
      label: 'Notes',
      children: [
        {label: 'List', href: '/notebooks/notes/v02/list', target: '_blank'},
      ]
    },
  ]

  return (<>
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static"
              sx={{backgroundColor: '#000', color: 'white'}}>
        <Toolbar disableGutters>
          <IconButton size="small"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'}
                      }}>
            <MenuIcon/>
          </IconButton>

          {/* @see https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu */}
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <Mui7NaviMenu menus={menus}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  </>)
}