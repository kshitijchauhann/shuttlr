import Logo from "../assets/double-black.svg";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

const Login = () => {
  return (
    <Box sx={{ height: '100vh'}}>
      <Box sx={{p: 2}}>
      <img src={Logo} width="350px"/>
      </Box>
      <Card>
        <CardContent sx={{ p: 3 }}>
        <Typography sx={{ p: 1 }}>Register</Typography>
        <TextField label="Enter Name" variant="outlined" fullWidth sx={{ mt: 2 }} />
        <TextField label="Enter email" variant="outlined" fullWidth sx={{ mt: 2}}/>
        <TextField label="Enter password" variant="outlined" fullWidth sx={{ mt: 2 }}/>
        <TextField label="Confirm password" variant="outlined" fullWidth sx={{ mt: 2}}/>
        </CardContent>
      <CardActions>
        <Button>SignUp</Button>
      </CardActions>
      </Card>
    </Box>
  )
}

export default Login;
