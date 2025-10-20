import {
  Button, Menu, MenuItem, Link, Typography, Box
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import NextLink from "next/link";
import React, { useState, useCallback, useRef, useEffect } from "react";

export function Mui7NaviMenu({ menus, level = 0 }) {
  const [openMenus, setOpenMenus] = useState({}); // Track open menus by path
  const [anchorElements, setAnchorElements] = useState({}); // Anchor elements for menus
  const timeoutRefs = useRef({}); // Timeout refs for delayed closing
  const menuItemRefs = useRef({}); // Refs for menu items that have submenus

  // Generate unique path for nested menus
  const getMenuPath = useCallback((menuLabel, parentPath = '') => {
    return parentPath ? `${parentPath}.${menuLabel}` : menuLabel;
  }, []);

  // Collect all menu paths for flat rendering
  const collectAllMenus = useCallback((items, parentPath = '', result = []) => {
    items.forEach(item => {
      const menuPath = getMenuPath(item.label, parentPath);
      if (item.children && item.children.length > 0) {
        result.push({ path: menuPath, items: item.children, parentPath });
        collectAllMenus(item.children, menuPath, result);
      }
    });
    return result;
  }, [getMenuPath]);

  const allMenus = collectAllMenus(menus);

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

    // Close all child menus
    Object.keys(openMenus).forEach(path => {
      if (path.startsWith(menuPath + '.')) {
        setOpenMenus(prev => ({ ...prev, [path]: false }));
        setAnchorElements(prev => ({ ...prev, [path]: null }));
      }
    });
  }, [openMenus]);

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
    // Also cancel timeout for parent menus
    const pathParts = menuPath.split('.');
    for (let i = 1; i < pathParts.length; i++) {
      const parentPath = pathParts.slice(0, i).join('.');
      cancelTimeout(parentPath);
    }
  }, [cancelTimeout]);

  const handleMenuMouseLeave = useCallback((menuPath) => {
    closeMenuWithDelay(menuPath, 300);
  }, [closeMenuWithDelay]);

  const handleSubMenuItemMouseEnter = useCallback((event, menuPath, parentPath) => {
    cancelTimeout(menuPath);
    cancelTimeout(parentPath);
    
    // Get the menu item element
    const menuItemEl = event.currentTarget;
    openMenu(menuPath, menuItemEl);
  }, [cancelTimeout, openMenu]);

  const handleSubMenuItemMouseLeave = useCallback((menuPath) => {
    closeMenuWithDelay(menuPath, 300);
  }, [closeMenuWithDelay]);

  const handleMenuItemClick = useCallback((event, item) => {
    event.stopPropagation();
    if (!item.children || item.children.length === 0) {
      closeAllMenus();
      // Handle navigation
      if (item.href) {
        window.location.href = item.href;
      }
    }
  }, [closeAllMenus]);

  const renderTopLevelItems = useCallback(() => {
    return menus.map((menu) => {
      const menuPath = getMenuPath(menu.label);
      const hasChildren = menu.children && menu.children.length > 0;

      if (!hasChildren) {
        return (
          <Button
            key={menuPath}
            component={NextLink}
            href={menu.href}
            target={menu.target || "_self"}
            sx={{ color: '#fff', mx: 1 }}
          >
            {menu.label}
          </Button>
        );
      }

      return (
        <Button
          key={menuPath}
          onClick={(event) => handleTopLevelClick(event, menuPath)}
          onMouseEnter={(event) => handleTopLevelMouseEnter(event, menuPath)}
          sx={{ color: '#fff', mx: 1 }}
          aria-controls={openMenus[menuPath] ? `menu-${menuPath}` : undefined}
          aria-haspopup="true"
          aria-expanded={openMenus[menuPath] ? 'true' : undefined}
        >
          {menu.label}
        </Button>
      );
    });
  }, [menus, getMenuPath, openMenus, handleTopLevelClick, handleTopLevelMouseEnter]);

  const renderMenuItem = useCallback((item, parentPath) => {
    const menuPath = getMenuPath(item.label, parentPath);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <MenuItem
        key={menuPath}
        onClick={(event) => handleMenuItemClick(event, item)}
        onMouseEnter={hasChildren ? (event) => {
          handleSubMenuItemMouseEnter(event, menuPath, parentPath);
        } : undefined}
        onMouseLeave={hasChildren ? () => handleSubMenuItemMouseLeave(menuPath) : undefined}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: 200,
          position: 'relative'
        }}
        ref={hasChildren ? (el) => {
          if (el) menuItemRefs.current[menuPath] = el;
        } : undefined}
      >
        <Typography>{item.label}</Typography>
        {hasChildren && <ArrowRightIcon fontSize="small" />}
      </MenuItem>
    );
  }, [getMenuPath, handleMenuItemClick, handleSubMenuItemMouseEnter, handleSubMenuItemMouseLeave]);

  const renderAllMenus = useCallback(() => {
    return allMenus.map(({ path, items, parentPath }) => {
      const isTopLevel = !parentPath.includes('.');
      
      return (
        <Menu
          key={path}
          id={`menu-${path}`}
          open={Boolean(openMenus[path])}
          anchorEl={anchorElements[path]}
          onClose={() => closeMenu(path)}
          onMouseEnter={() => handleMenuMouseEnter(path)}
          onMouseLeave={() => handleMenuMouseLeave(path)}
          anchorOrigin={{
            vertical: isTopLevel ? 'bottom' : 'top',
            horizontal: isTopLevel ? 'left' : 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: isTopLevel ? 0.5 : -1,
                ml: isTopLevel ? 0 : 0,
                zIndex: 1300 + path.split('.').length, // Higher z-index for deeper menus
              }
            }
          }}
          MenuListProps={{
            onMouseLeave: () => handleMenuMouseLeave(path),
            onMouseEnter: () => handleMenuMouseEnter(path),
          }}
        >
          {items.map((item) => renderMenuItem(item, path))}
        </Menu>
      );
    });
  }, [
    allMenus,
    openMenus,
    anchorElements,
    closeMenu,
    handleMenuMouseEnter,
    handleMenuMouseLeave,
    renderMenuItem
  ]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderTopLevelItems()}
      {renderAllMenus()}
    </Box>
  );
}