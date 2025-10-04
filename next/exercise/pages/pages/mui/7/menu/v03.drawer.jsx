import React, {useState} from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState({});

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNestedClick = (item) => {
    setNestedOpen(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const menuItems = [
    {
      primary: '收件箱',
      icon: <InboxIcon/>,
      subItems: ['重要邮件', '已读邮件', '未读邮件']
    },
    {
      primary: '发件箱',
      icon: <MailIcon/>,
      subItems: ['已发送', '草稿', '已删除']
    }
  ];

  const list = (
    <div style={{width: 250}}>
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNestedClick(item.primary)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.primary}/>
                {nestedOpen[item.primary] ? <ExpandLess/> : <ExpandMore/>}
              </ListItemButton>
            </ListItem>
            <Collapse in={nestedOpen[item.primary]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subItems.map((subItem, subIndex) => (
                  <ListItemButton key={subIndex} sx={{pl: 4}}>
                    <ListItemIcon>
                      <MailIcon/>
                    </ListItemIcon>
                    <ListItemText primary={subItem}/>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon/>
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );
}