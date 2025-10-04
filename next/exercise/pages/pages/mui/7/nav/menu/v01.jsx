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

export function Mui7NaviMenu({menus, level = 0}) {
  const [anchorEl, setAnchorEl] = useState(null); //

  const openMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeMenu = useCallback((event) => {
    setAnchorEl(null);
  }, [])

  return (<>
    {menus.map((menu) => (
      <React.Fragment key={level}>
        {!menu.children && (<>
          <Button key={level + menu.href} href={menu.href}>{menu.label}</Button>
        </>)}
        {menu.children && (
          <>
            <Button key={level + menu.href} onClick={openMenu} sx={{color: '#fff'}}>{menu.label}</Button>
            <Menu open={Boolean(anchorEl)} onClose={closeMenu} anchorEl={anchorEl}>
              {menu.children.map((menu) => (
                <MenuItem key={level + menu.href} onClick={closeMenu} component={Link} href={menu.href} target={menu.target ? menu.target : "_self"}>{menu.label}</MenuItem>
              ))}
            </Menu>
          </>
        )}
      </React.Fragment>
    ))}
  </>);
}