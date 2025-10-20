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
  const [parentElements, setParentElements] = useState({}); // Menu parent element.

  const openMenu = useCallback((event, base) => {
    setParentElements(prev => ({...prev, [base]: event.currentTarget}));
  }, []);

  const closeMenu = useCallback((event, base) => {
    setParentElements(prev => ({...prev, [base]: null}));
  }, []);

  const renderMenu = (menu, level) => {
    return (
      <React.Fragment key={level}>
        {!menu.children && (<>
          <Button key={level + menu.href} href={menu.href}>{menu.label}</Button>
        </>)}
        {menu.children && (
          <>
            <Button key={level + menu.href} onClick={(event) => openMenu(event, menu.label)} sx={{color: '#fff'}}>{menu.label}</Button>
            <Menu open={Boolean(parentElements?.[menu.label])} onClose={(event) => closeMenu(event, menu.label)} anchorEl={parentElements?.[menu.label]}>
              {menu.children.map((child) => (
                <MenuItem component={Link} href={child.href} key={level + child.href} onClick={(event) => closeMenu(event, menu.label)}
                          target={child.target ? child.target : "_self"}>{child.label}</MenuItem>
              ))}
            </Menu>
          </>
        )}
      </React.Fragment>
    );
  }

  return (<>
    {menus.map((menu) => (
      renderMenu(menu, level++)
    ))}
  </>);
}