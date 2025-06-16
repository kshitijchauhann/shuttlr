import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chart from "../components/chart.tsx";
import CardContent from '@mui/material/CardContent';
const cardStyle = {
  width: 250,
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  boxShadow: 3,
  backgroundColor: '#ffffff'
};

const UpperCards = () => {
  return (
    <Stack 
      direction="row"
      spacing={3}
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: 'wrap',
        m: 3
      }}
    >  
      <Card sx={cardStyle}>
        <CardContent>
          <Chart/>
        </CardContent>
      </Card>
      <Card sx={cardStyle}>
        <CardContent>
          <Typography>Total Files</Typography>
        </CardContent>
      </Card>
      <Card sx={cardStyle}>
        <CardContent>
          <Typography>Request</Typography>
        </CardContent>
      </Card>
      <Card sx={cardStyle}>
        <CardContent>
          <Typography>Active Devices</Typography>
          <Typography>3</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};







export default UpperCards;
