import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem, Box, Typography } from '@mui/material';

const roles = ['User', 'Assigner', 'Supervisor'];

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password && role) {
      try {
        // Updated API endpoint for login
        const response = await axios.post('http://localhost:8080/api/users/login', {
          username,
          password,
        });

        // Check if the role matches the one in the response
        if (response.status === 200) {
          const userData = response.data;
          if (userData.role !== role) {
            alert('Incorrect role selected');
            return;
          }

          setLoggedInUser(userData);

          // Navigate based on the user role
          if (userData.role === 'User') {
            navigate('/grievance-form');
          } else {
            navigate('/grievances');
          }
        }
      } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        alert('Login failed. Please check your credentials and try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ backgroundColor: '#f5f5f5', p: 5, borderRadius: 3 }}>
      <Typography variant="h3" mb={3} color="#1976d2">GRIEVANCE PORTAL</Typography>
      <Typography variant="h4" mb={3} color="#1976d2">Login</Typography>
      <TextField
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
        InputLabelProps={{ style: { color: '#1976d2' } }}
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
        InputLabelProps={{ style: { color: '#1976d2' } }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 3, width: '300px' }}
        InputLabelProps={{ style: { color: '#1976d2' } }}
      />
      <Button
        variant="contained"
        sx={{
          width: '300px',
          bgcolor: '#1976d2',
          '&:hover': { bgcolor: '#1256a2' },
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
