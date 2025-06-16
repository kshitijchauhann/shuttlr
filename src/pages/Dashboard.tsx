import DrawerDashboard from "../components/drawer-dashboard.tsx";
import Box from '@mui/material/Box';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';

import SearchFilter from "../components/search-filter.tsx";
import Sortby from "../components/search-sortby.tsx";


import Grid  from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import UpperCards from "../components/upper-cards.tsx";

const SearchArea = () => {
  return (
    <>
   <Stack direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-start",
    alignItems: "flex-start",
    m: 2
  }}>
  <TextField
    id="input-with-icon-textfield"
    placeholder="Search files or senders"
    slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        variant="outlined"
        fullWidth
    />
    <SearchFilter/>
    <Sortby/>
   </Stack>
   </>
  )
}

const FileArea = () => {
  const fileData = [
    { id: '1', name: 'DotNet', extension: 'pdf', size: '3.1MB' },
    { id: '2', name: 'zoene', extension: 'docx', size: '4.5MB'},
    { id: '3', name: 'photo', extension: 'png', size: '1.1MB'},
    { id: '4', name: 'audio', extension: 'mp3', size: '7.3MB'},
    { id: '5', name: 'video', extension: 'mp4', size: '8.9MB'},
    { id: '6', name: 'DotNet', extension: 'pdf', size: '3.1MB' },
    { id: '7', name: 'zoene', extension: 'docx', size: '4.5MB'},
    { id: '8', name: 'photo', extension: 'png', size: '1.1MB'},
    { id: '9', name: 'audio', extension: 'mp3', size: '7.3MB'},
    { id: '10', name: 'video', extension: 'mp4', size: '8.9MB'},
    { id: '11', name: 'DotNet', extension: 'pdf', size: '3.1MB' },
    { id: '12', name: 'zoene', extension: 'docx', size: '4.5MB'},
    { id: '13', name: 'photo', extension: 'png', size: '1.1MB'},
    { id: '14', name: 'audio', extension: 'mp3', size: '7.3MB'},
    { id: '15', name: 'video', extension: 'mp4', size: '8.9MB'},
    { id: '16', name: 'DotNet', extension: 'pdf', size: '3.1MB' },
    { id: '17', name: 'zoene', extension: 'docx', size: '4.5MB'},
    { id: '18', name: 'photo', extension: 'png', size: '1.1MB'},
    { id: '19', name: 'audio', extension: 'mp3', size: '7.3MB'},
    { id: '20', name: 'video', extension: 'mp4', size: '8.9MB'}
  ];

  const getExtension = (extension: string) => {
    switch (extension) {
      case 'pdf':
        return PictureAsPdfIcon;
      case 'docx':
        return DescriptionIcon;
      case 'png':
        return ImageIcon;
      case 'mp3':
        return VolumeUpIcon;
      case 'mp4':
        return OndemandVideoIcon;
      default:
        return DescriptionIcon; // fallback
    }
  };

  return (
    <Stack 
      direction="row" 
      sx={{ 
        maxWidth: '100%', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 1,
        alignItems: 'flex-start',

        overflow: 'hidden'
      }}
    >
      {fileData.map((item) => {
        const Icon = getExtension(item.extension);
        return (
          <Paper 
            key={item.id} 
            elevation={2}
            sx={{ 
              padding: 2,
              width: 160,
              textAlign: 'center',
              flexShrink: 0,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: '#fff'
            }}
          >
            <IconButton>
              <Icon />
            </IconButton>

            <Typography></Typography>
            <Typography>{item.id}. {item.name}.{item.extension}</Typography>
            <Typography>{item.size}</Typography>
          </Paper>
        );
      })}

          <Pagination count={10} shape="rounded" sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }} />
    </Stack>
  );
};

const Dashboard = () => {
  return (
    <Box
      sx={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pt: 8,
        backgroundColor: '#f5f7fa',
      }}
    >
      <Box sx={{ maxWidth: '100vw' }}>
        <DrawerDashboard />
        <UpperCards />
        <Box sx={{ maxWidth: 1200, p: 3, mx: 'auto', mt: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SearchArea />
            </Grid>
            <Grid item xs={12}>
              <FileArea />
            </Grid>
          </Grid>
        </Box>
      </Box>     
    </Box>  
  );
};

export default Dashboard;
