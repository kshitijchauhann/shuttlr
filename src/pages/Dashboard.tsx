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
import { PieChart } from '@mui/x-charts/PieChart';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const Chart = () => {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Images' },
            { id: 1, value: 15, label: 'Audio' },
            { id: 2, value: 20, label: 'Videos' },
            { id: 3, value: 9, label: 'Documents'}
          ],
        },
      ]}
      width={200}
      height={200}
    />
  );
}


const SearchArea = () => {
  return (
    <>
   <Stack direction="row" sx={{ m: 1}}>
   <TextField id="search-files" variant="outlined" placeholder="Search Files" fullWidth/>
   <IconButton><SearchIcon/></IconButton>
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

  const getExtension = (extension) => {
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 1,
        alignItems: 'flex-start'
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
              width: 150,
              textAlign: 'center',
              flexShrink: 0,
              borderStyle: 'solid'
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
    </Stack>
  );
};

const Dashboard = () => {
  return (
    <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100vh',
    }}>
      <Box sx={{ maxWidth: '100vw'}}>
        <DrawerDashboard />
        <Box sx={{ borderStyle: 'dotted', width: 1000, p: 3, m: 2}}>
          <SearchArea/>
        <FileArea />
        </Box>

        <Chart/>
      </Box>
    </Box>
  );
};

export default Dashboard;
