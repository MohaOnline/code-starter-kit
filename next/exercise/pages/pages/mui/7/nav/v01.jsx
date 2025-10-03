import {Panel} from "@/lib/components/tailwind/panel/v01";
import {TagFieldGroupSingle} from "@/lib/components/mui/TagFields";
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container,
  Link, ListSubheader, Menu, MenuItem, IconButton, Stack,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {Adb as AdbIcon, Menu as MenuIcon} from '@mui/icons-material';


import NextLink from "next/link";
import React from "react";

export function Mui7Navi() {

  const menus = [
    {label: 'Home', href: '/'},
    {label: 'Utils', children: [{label: 'MUI', href: '/mui/7/utils/v01'},]}
  ]

  return (<>
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
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
            {menus.map((menu) => (
              <>
                {menu.children && (
                  <>
                  </>
                )}
              </>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  </>)
}