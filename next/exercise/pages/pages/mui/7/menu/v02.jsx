import React, {useState} from 'react';
import {
  Paper,
  MenuItem,
  MenuList,
  Popper,
  ClickAwayListener,
  Grow,
  Paper as MuiPaper
} from '@mui/material';

export default function CustomNestedMenu() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
    setActiveSubMenu(null);
  };

  const handleSubMenuOpen = (event, menuName) => {
    event.preventDefault();
    setActiveSubMenu(menuName === activeSubMenu ? null : menuName);
  };

  return (
    <div>
      <button onClick={handleMenuOpen}>打开菜单</button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList>
                  <MenuItem
                    onMouseEnter={(e) => handleSubMenuOpen(e, 'file')}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    文件
                    {activeSubMenu === 'file' && (
                      <Paper
                        sx={{
                          position: 'absolute',
                          left: '100%',
                          top: 0,
                          ml: 1
                        }}
                      >
                        <MenuList>
                          <MenuItem onClick={handleMenuClose}>新建</MenuItem>
                          <MenuItem onClick={handleMenuClose}>打开</MenuItem>
                          <MenuItem onClick={handleMenuClose}>保存</MenuItem>
                        </MenuList>
                      </Paper>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>编辑</MenuItem>
                  <MenuItem onClick={handleMenuClose}>帮助</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}