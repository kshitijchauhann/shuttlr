import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import NoteIcon from '@mui/icons-material/Note';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const DrawerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <FileUploadIcon/>
              </ListItemIcon>
              <ListItemText>File Upload</ListItemText>
            </ListItemButton>
          </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <QrCodeIcon/>
              </ListItemIcon>
              <ListItemText>Show QR</ListItemText>
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <CreateNewFolderIcon/>
              </ListItemIcon>
              <ListItemText>Create Folder</ListItemText>
            </ListItemButton>
          </ListItem>

      </List>


      <Divider />


      <List>

      <Typography>Navigation</Typography>
          <ListItem disablePadding>
            <ListItemButton  onClick={() => navigate("/history")}>
              <ListItemIcon>
                <HistoryIcon /> 
              </ListItemIcon>
              <ListItemText>File History</ListItemText>
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/request")}>
              <ListItemIcon >
                <NoteIcon /> 
              </ListItemIcon>
              <ListItemText>File Requests</ListItemText>
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DeleteIcon /> 
              </ListItemIcon>
              <ListItemText>Trash</ListItemText>
            </ListItemButton>
          </ListItem>

      </List>
      <Divider/>

      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon /> 
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, width: '100vw'  }}>
      <AppBar position="fixed" sx={{ height: "70px"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default DrawerDashboard;
