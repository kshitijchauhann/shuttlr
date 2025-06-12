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
    <Container maxWidth="sm">
    <Box sx={{ height: '100vh'}}>
      <Box sx={{p: 2}}>
      <img src={Logo} width="350px"/>
      </Box>
      <Card>
        <CardContent>
        <Typography>Welcome back</Typography>
        <TextField variant="outlined" fullWidth></TextField>
        <TextField variant="outlined" fullWidth></TextField>
        </CardContent>
      <CardActions>
        <Button>Login</Button>
      </CardActions>
      </Card>
    </Box>
    </Container>
  )
}

export default Login;
