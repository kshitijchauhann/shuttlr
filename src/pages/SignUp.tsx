import Logo from "../assets/double-black.svg";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import zxcvbn from 'zxcvbn';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SignUp = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }; 

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    setError(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "password") {
      const strength = zxcvbn(value).score; 
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setOpen(true);
        return;
      }

      const response = await axios.post('http://localhost:3000/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201) {
        setOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      setOpen(true);
    }
  };

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <Container maxWidth="sm">
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 1
        }}>
          
          <img src={Logo} width="350px" style={{ marginBottom: '50px' }} />
          
          
          <Box sx={{ width: '100%', maxWidth: 400 }}>
           
            
            <TextField 
              name="name"
              label="Enter Name" 
              variant="outlined" 
              fullWidth 
              sx={{ mb: 2 }} 
              value={formData.name}
              onChange={handleChange}
            />
            
            <TextField 
              name="email"
              label="Enter email" 
              type="email"
              variant="outlined" 
              fullWidth 
              sx={{ mb: 2 }}
              value={formData.email}
              onChange={handleChange}
            />
            
            { formData.email && (!formData.email.includes('@') || !formData.email.includes('.')) && (
              <Typography color="error" sx={{ mb: 2}}>
                Enter a valid email
              </Typography>
            )}

            <TextField 
              name="password"
              label="Enter password" 
              type={showPassword ? 'text' : 'password'}
              variant="outlined" 
              fullWidth 
              sx={{ mb: 2 }}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
              endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
              }}
            />
            
            <TextField 
              name="confirmPassword"
              label="Confirm password" 
              type={showPassword ? 'text' : 'password'}
              variant="outlined" 
              fullWidth 
              sx={{ mb: 3 }}
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
              endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff /> }
                </IconButton>
              </InputAdornment>
            )
              }}/>

              {formData.password && (
              <Box sx={{ mb: 2 }}>
                <Box 
                  sx={{ 
                    height: 10, 
                    width: '100%', 
                    backgroundColor: '#e0e0e0', 
                    borderRadius: 1 
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(passwordStrength + 1) * 20}%`,
                      backgroundColor: 
                      passwordStrength <= 1 ? 'red' :
                        passwordStrength === 2 ? 'orange' :
                          passwordStrength === 3 ? 'yellowgreen' : 
                            'green',
                      borderRadius: 1,
                      transition: 'width 0.3s ease-in-out'
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength]}
                </Typography>
              </Box>
            )}

        
            { formData.password !== formData.confirmPassword && (
              <Typography color="error" sx={{ mb: 2}}>
                Passwords don't match
              </Typography>
            )}

            <Button 
              onClick={handleSubmit}
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ 
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
                }
              }}
            >
              SIGNUP
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                {error || "Signup successful"}
              </Alert>
            </Snackbar>           

           
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Button 
                variant="text" 
                onClick={() => navigate("/login")} 
                sx={{ textTransform: 'none', padding: 0, minWidth: 'unset' }}
              >
                Login
              </Button>
            </Typography>

          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SignUp
