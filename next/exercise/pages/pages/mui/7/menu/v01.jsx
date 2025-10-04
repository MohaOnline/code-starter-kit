import React, {useState} from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function CollapsibleMenu() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleSubMenuToggle = (item) => {
    setSubMenuOpen(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const menuItems = [
    {
      primary: '文件',
      subItems: ['新建', '打开', '保存', '另存为']
    },
    {
      primary: '编辑',
      subItems: ['撤销', '重做', '复制', '粘贴']
    },
    {
      primary: '视图',
      subItems: ['放大', '缩小', '全屏']
    }
  ];

  return (
    <div>
      <button onClick={handleClick}>打开菜单</button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleSubMenuToggle(item.primary)}>
                  <ListItemText primary={item.primary}/>
                  {subMenuOpen[item.primary] ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItemButton>
              </ListItem>
              <Collapse in={subMenuOpen[item.primary]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItemButton key={subIndex} sx={{pl: 4}}>
                      <ListItemText primary={subItem}/>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Popover>
    </div>
  );
}