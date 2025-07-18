import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import Chart from "../components/chart.tsx";


const ChangeUserInfo = () => {
  const { user } = useAuthStore();

  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true)
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
      <Card sx={{ p: 2, height: 400 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar sx={{ height: 150, width: 150, bgcolor: deepOrange[500] }}>{user?.name.charAt(0)}</Avatar>
            <Typography variant="h5">{user?.name}</Typography>
          <Typography variant="h6">@{user?.userName}</Typography>
        </Box>
      </Card>
      <Card sx={{ p: 2, height: 400 }}>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Email
        </Typography>
                <Typography variant="body1">{user?.email}</Typography>
        <Button onClick={handleClick}>Change Email</Button>
      </Card>

      <Dialog
        open={click}
        onClose={() => setClick(false)}
      >
        <DialogTitle>Change Email</DialogTitle>
        <DialogContent>
          <TextField id="change-email" label="Change Email" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button>Change Email</Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
}

const Security = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Card sx={{ p: 2, height: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update your account password
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button variant="outlined" onClick={handleClick}>Change</Button>
        </CardActions>
      </Card>
      <Card sx={{ p: 2, height: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Two-Factor Authentication
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add an extra layer of security
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
          <Switch />
        </CardActions>
      </Card>

      <Dialog
        open={click}
        onClose={() => setClick(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button>Change Password</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

const Storage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Card sx={{ p: 2, height: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Storage Usage
          </Typography>
          <Typography variant="body2" color="text.secondary">
            20MB used out of 256MB
          </Typography>
          <Chart />
        </CardContent>
      </Card>
      <Card sx={{ p: 2, height: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Auto-Delete
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Automatically delete old files
          </Typography> 
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button variant="outlined">Configure</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

const Menu = () => {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider'  }}>
          <TabList 
            onChange={handleChange} 
            aria-label="lab API tabs example" 
            variant="fullWidth"
          >
            <Tab label="Profile" value="1" />
            <Tab label="Security" value="2" />
            <Tab label="Storage" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ px: 0 }}>
          <ChangeUserInfo/>
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <Security/>
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <Storage/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const Profile = () => {
  return (
    <Box sx={{ 
      width: "100vw", 
      height: "100vh", 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      boxSizing: 'border-box'
    }}>
      <Box sx={{ width: '100%', maxWidth: 900, height: '80vh', p: 2 }}>
        <Menu/>
      </Box>
    </Box>
  )
}

export default Profile;
