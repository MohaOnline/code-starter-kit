import {
  Button, Menu, MenuItem, Link, Typography, Box
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import NextLink from "next/link";
import React, { useState, useCallback, useRef } from "react";

export function Mui7NaviMenu({ menus, level = 0 }) {
  const [openMenus, setOpenMenus] = useState({}); // Track open menus by path
  const [anchorElements, setAnchorElements] = useState({}); // Anchor elements for menus
  const [timeouts, setTimeouts] = useState({}); // Timeout IDs for delayed closing
  const menuRefs = useRef({}); // Refs for menu elements

  // Generate unique path for nested menus
  const getMenuPath = useCallback((menuLabel, parentPath = '') => {
    return parentPath ? `${parentPath}.${menuLabel}` : menuLabel;
  }, []);

  const openMenu = useCallback((event, menuPath, anchorEl = null) => {
    // Clear any existing timeout for this menu
    if (timeouts[menuPath]) {
      clearTimeout(timeouts[menuPath]);
      setTimeouts(prev => ({ ...prev, [menuPath]: null }));
    }

    setAnchorElements(prev => ({
      ...prev,
      [menuPath]: anchorEl || event.currentTarget
    }));
    setOpenMenus(prev => ({ ...prev, [menuPath]: true }));
  }, [timeouts]);

  const closeMenu = useCallback((menuPath) => {
    setOpenMenus(prev => ({ ...prev, [menuPath]: false }));
    setAnchorElements(prev => ({ ...prev, [menuPath]: null }));
  }, []);

  const closeMenuWithDelay = useCallback((menuPath, delay = 300) => {
    const timeoutId = setTimeout(() => {
      closeMenu(menuPath);
    }, delay);
    
    setTimeouts(prev => ({ ...prev, [menuPath]: timeoutId }));
  }, [closeMenu]);

  const handleMouseEnter = useCallback((event, menuPath) => {
    openMenu(event, menuPath);
  }, [openMenu]);

  const handleMouseLeave = useCallback((menuPath) => {
    closeMenuWithDelay(menuPath);
  }, [closeMenuWithDelay]);

  const cancelTimeout = useCallback((menuPath) => {
    if (timeouts[menuPath]) {
      clearTimeout(timeouts[menuPath]);
      setTimeouts(prev => ({ ...prev, [menuPath]: null }));
    }
  }, [timeouts]);

  const renderMenuItem = useCallback((item, parentPath = '', isTopLevel = false) => {
    const menuPath = getMenuPath(item.label, parentPath);
    const hasChildren = item.children && item.children.length > 0;

    if (isTopLevel) {
      // Top level buttons
      return (
        <React.Fragment key={menuPath}>
          {!hasChildren ? (
            <Button
              component={NextLink}
              href={item.href}
              target={item.target || "_self"}
              sx={{ color: '#fff', mx: 1 }}
            >
              {item.label}
            </Button>
          ) : (
            <>
              <Button
                onClick={(event) => openMenu(event, menuPath)}
                onMouseEnter={(event) => handleMouseEnter(event, menuPath)}
                onMouseLeave={() => handleMouseLeave(menuPath)}
                sx={{ color: '#fff', mx: 1 }}
              >
                {item.label}
              </Button>
              {renderMenu(item.children, menuPath)}
            </>
          )}
        </React.Fragment>
      );
    } else {
      // Nested menu items
      return (
        <MenuItem
          key={menuPath}
          onClick={hasChildren ? undefined : () => closeAllMenus()}
          onMouseEnter={hasChildren ? (event) => {
            cancelTimeout(menuPath);
            // Position submenu to the right of current item
            const rect = event.currentTarget.getBoundingClientRect();
            openMenu(event, menuPath, {
              getBoundingClientRect: () => ({
                top: rect.top,
                left: rect.right,
                right: rect.right,
                bottom: rect.bottom,
                width: 0,
                height: rect.height
              })
            });
          } : undefined}
          onMouseLeave={hasChildren ? () => handleMouseLeave(menuPath) : undefined}
          component={!hasChildren ? NextLink : 'li'}
          href={!hasChildren ? item.href : undefined}
          target={!hasChildren ? (item.target || "_self") : undefined}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: 200
          }}
        >
          <Typography>{item.label}</Typography>
          {hasChildren && <ArrowRightIcon fontSize="small" />}
          {hasChildren && renderMenu(item.children, menuPath)}
        </MenuItem>
      );
    }
  }, [getMenuPath, openMenu, handleMouseEnter, handleMouseLeave, cancelTimeout]);

  const renderMenu = useCallback((items, parentPath) => {
    return (
      <Menu
        open={Boolean(openMenus[parentPath])}
        anchorEl={anchorElements[parentPath]}
        onClose={() => closeMenu(parentPath)}
        onMouseEnter={() => cancelTimeout(parentPath)}
        onMouseLeave={() => handleMouseLeave(parentPath)}
        anchorOrigin={{
          vertical: level === 0 ? 'bottom' : 'top',
          horizontal: level === 0 ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            mt: level === 0 ? 1 : 0,
            ml: level === 0 ? 0 : 0.5,
          }
        }}
      >
        {items.map((item) => renderMenuItem(item, parentPath, false))}
      </Menu>
    );
  }, [openMenus, anchorElements, closeMenu, cancelTimeout, handleMouseLeave, renderMenuItem, level]);

  const closeAllMenus = useCallback(() => {
    Object.keys(openMenus).forEach(menuPath => {
      closeMenu(menuPath);
    });
  }, [openMenus, closeMenu]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {menus.map((menu) => renderMenuItem(menu, '', true))}
    </Box>
  );
}