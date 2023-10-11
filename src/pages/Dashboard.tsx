import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper
} from '@mui/material';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Dashboard=( )=> {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/kasir/login', {
        username: loginUsername,
        password: loginPassword,
      });

      console.log('Login successful:', response.data);

      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);

      setLoginUsername('');
      setLoginPassword('');
      setLoginError('');

      const userId = response.data.datas.id;
      
      navigate(`/staff/${userId}`);
      // navigate('/staff/');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid username or password');
    }
  };

  const setAuthToken = (token:any) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <Box>
       <Paper sx={{width:'18rem', padding:'50px', margin:'auto', borderRadius:'15px'}}>
      <Grid 
        container
        spacing={3}
        direction="column"
        sx={{textAlign:'center'}}
        >
        <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight:'bold' }}>Login</Typography>
        </Grid>

        <Grid item xs={12}>
        <TextField
          label="Username"
          variant="outlined"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        </Grid>

        <Grid item xs={12}>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        </Grid>

         <Grid item xs={12}>
        {loginError && <Typography color="error">{loginError}</Typography>}
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        </Grid>
      </Grid>
      </Paper>
    </Box>
  );
}
export default Dashboard;

