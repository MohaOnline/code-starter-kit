import {
  Button, Menu, MenuItem, Link, Typography, Box
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import NextLink from "next/link";
import React, { useState, useCallback, useRef } from "react";

export function Mui7NaviMenu({ menus, level = 0 }) {
  const [openMenus, setOpenMenus] = useState({}); // Track open menus by path
  const [anchorElements, setAnchorElements] = useState({}); // Anchor elements for menus
  const timeoutRefs = useRef({}); // Timeout refs for delayed closing

  // Generate unique path for nested menus
  const getMenuPath = useCallback((menuLabel, parentPath = '') => {
    return parentPath ? `${parentPath}.${menuLabel}` : menuLabel;
  }, []);

  const openMenu = useCallback((menuPath, anchorEl) => {
    // Clear any existing timeout for this menu
    if (timeoutRefs.current[menuPath]) {
      clearTimeout(timeoutRefs.current[menuPath]);
      delete timeoutRefs.current[menuPath];
    }

    setAnchorElements(prev => ({
      ...prev,
      [menuPath]: anchorEl
    }));
    setOpenMenus(prev => ({ ...prev, [menuPath]: true }));
  }, []);

  const closeMenu = useCallback((menuPath) => {
    setOpenMenus(prev => ({ ...prev, [menuPath]: false }));
    setAnchorElements(prev => ({ ...prev, [menuPath]: null }));
    
    // Clear timeout if exists
    if (timeoutRefs.current[menuPath]) {
      clearTimeout(timeoutRefs.current[menuPath]);
      delete timeoutRefs.current[menuPath];
    }
  }, []);

  const closeMenuWithDelay = useCallback((menuPath, delay = 300) => {
    timeoutRefs.current[menuPath] = setTimeout(() => {
      closeMenu(menuPath);
    }, delay);
  }, [closeMenu]);

  const cancelTimeout = useCallback((menuPath) => {
    if (timeoutRefs.current[menuPath]) {
      clearTimeout(timeoutRefs.current[menuPath]);
      delete timeoutRefs.current[menuPath];
    }
  }, []);

  const closeAllMenus = useCallback(() => {
    // Clear all timeouts
    Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = {};
    
    setOpenMenus({});
    setAnchorElements({});
  }, []);

  const handleTopLevelClick = useCallback((event, menuPath) => {
    event.preventDefault();
    if (openMenus[menuPath]) {
      closeMenu(menuPath);
    } else {
      // Close all other menus first
      closeAllMenus();
      openMenu(menuPath, event.currentTarget);
    }
  }, [openMenus, closeMenu, closeAllMenus, openMenu]);

  const handleTopLevelMouseEnter = useCallback((event, menuPath) => {
    // Only open on hover if another menu is already open
    const hasOpenMenus = Object.values(openMenus).some(Boolean);
    if (hasOpenMenus) {
      closeAllMenus();
      openMenu(menuPath, event.currentTarget);
    }
  }, [openMenus, closeAllMenus, openMenu]);

  const handleMenuMouseEnter = useCallback((menuPath) => {
    cancelTimeout(menuPath);
  }, [cancelTimeout]);

  const handleMenuMouseLeave = useCallback((menuPath) => {
    closeMenuWithDelay(menuPath);
  }, [closeMenuWithDelay]);

  const handleSubMenuMouseEnter = useCallback((event, menuPath, parentPath) => {
    cancelTimeout(menuPath);
    cancelTimeout(parentPath);
    
    // Position submenu to the right of current item
    const rect = event.currentTarget.getBoundingClientRect();
    const virtualAnchor = {
      getBoundingClientRect: () => ({
        top: rect.top,
        left: rect.right,
        right: rect.right,
        bottom: rect.bottom,
        width: 0,
        height: rect.height
      })
    };
    
    openMenu(menuPath, virtualAnchor);
  }, [cancelTimeout, openMenu]);

  const handleSubMenuMouseLeave = useCallback((menuPath) => {
    closeMenuWithDelay(menuPath);
  }, [closeMenuWithDelay]);

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
                onClick={(event) => handleTopLevelClick(event, menuPath)}
                onMouseEnter={(event) => handleTopLevelMouseEnter(event, menuPath)}
                sx={{ color: '#fff', mx: 1 }}
                aria-controls={openMenus[menuPath] ? `menu-${menuPath}` : undefined}
                aria-haspopup="true"
                aria-expanded={openMenus[menuPath] ? 'true' : undefined}
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
          onClick={hasChildren ? undefined : closeAllMenus}
          onMouseEnter={hasChildren ? (event) => {
            handleSubMenuMouseEnter(event, menuPath, parentPath);
          } : undefined}
          onMouseLeave={hasChildren ? () => handleSubMenuMouseLeave(menuPath) : undefined}
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
  }, [
    getMenuPath, 
    openMenus, 
    handleTopLevelClick, 
    handleTopLevelMouseEnter, 
    handleSubMenuMouseEnter, 
    handleSubMenuMouseLeave, 
    closeAllMenus
  ]);

  const renderMenu = useCallback((items, parentPath) => {
    const isTopLevel = level === 0 && !parentPath.includes('.');
    
    return (
      <Menu
        id={`menu-${parentPath}`}
        open={Boolean(openMenus[parentPath])}
        anchorEl={anchorElements[parentPath]}
        onClose={() => closeMenu(parentPath)}
        onMouseEnter={() => handleMenuMouseEnter(parentPath)}
        onMouseLeave={() => handleMenuMouseLeave(parentPath)}
        anchorOrigin={{
          vertical: isTopLevel ? 'bottom' : 'top',
          horizontal: isTopLevel ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isTopLevel ? 'left' : 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: isTopLevel ? 0.5 : 0,
              ml: isTopLevel ? 0 : 0,
            }
          }
        }}
        // Prevent menu from closing when clicking inside
        MenuListProps={{
          onMouseLeave: () => handleMenuMouseLeave(parentPath),
          onMouseEnter: () => handleMenuMouseEnter(parentPath),
        }}
      >
        {items.map((item) => renderMenuItem(item, parentPath, false))}
      </Menu>
    );
  }, [
    level,
    openMenus, 
    anchorElements, 
    closeMenu, 
    handleMenuMouseEnter, 
    handleMenuMouseLeave, 
    renderMenuItem
  ]);

  // Clean up timeouts on unmount
  React.useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {menus.map((menu) => renderMenuItem(menu, '', true))}
    </Box>
  );
}