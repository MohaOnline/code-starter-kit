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
import React, {useState, useCallback} from "react";

export function Mui7NaviMenu({menus}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = useCallback((event) => {
    setAnchorEl(null);
  }, [])

  return (<>
    {menus.map((menu) => (
      <>
        {!menu.children && (<>
          <Button href={menu.href}>{menu.label}</Button>
        </>)}
        {menu.children && (
          <>
            <Button onClick={menuClick} key={menu.label} sx={{color: '#fff'}}>{menu.label}</Button>
            <Menu open={Boolean(anchorEl)} onClose={closeMenu} anchorEl={anchorEl}>
              {menu.children.map((menu) => (
                <MenuItem onClick={closeMenu} component={Link} href={menu.href}>{menu.label}</MenuItem>
              ))}
            </Menu>
          </>
        )}
      </>
    ))}
  </>);
}