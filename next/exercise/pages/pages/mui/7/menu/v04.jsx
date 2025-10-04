import React, {useState} from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function NestedMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuAnchor(null);
    setOpenSubMenu(false);
  };

  const handleSubMenuOpen = (event) => {
    setSubMenuAnchor(event.currentTarget);
    setOpenSubMenu(true);
  };

  return (
    <div>
      <IconButton
        aria-controls="nested-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </IconButton>

      <Menu
        id="nested-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSubMenuOpen}>
          <Typography>文件操作</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>编辑</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>帮助</Typography>
        </MenuItem>
      </Menu>

      {/* 二级菜单 */}
      <Menu
        anchorEl={subMenuAnchor}
        open={openSubMenu}
        onClose={() => setOpenSubMenu(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>新建文件</MenuItem>
        <MenuItem onClick={handleClose}>打开文件</MenuItem>
        <MenuItem onClick={handleClose}>保存文件</MenuItem>
        <MenuItem onClick={handleClose}>另存为</MenuItem>
      </Menu>
    </div>
  );
}

export default NestedMenu;