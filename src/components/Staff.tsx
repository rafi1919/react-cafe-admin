import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import axios from 'axios';

import SelectRoles from './select/SelectRoles';
import { Link } from 'react-router-dom';

const Staff=()=> {
  const [staff, setStaff] = useState([]);
  const [newStaffName, setNewStaffName] = useState('');
  const [editStaff, setEditStaff] = useState(null)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/kasir');
      setStaff(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/kasir', {
        name: newStaffName,
        username: username,
        password: password,
        role: selectedRole,
      });

      setNewStaffName('');
      setUsername('');
      setPassword('');
      setSelectedRole('');
      setStaff((prevStaff) => [...prevStaff, response.data.data]);
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  const handleDelete = async (id:any) => {
    try {
      await axios.delete(`http://localhost:8080/api/kasir/${id}`);
      setStaff((prevStaff) => prevStaff.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting staff', error);
    }
  };

  const handleEdit = (item:any) => {
    setEditStaff(item);
    setNewStaffName(item.name)
    setUsername(item.username);
    setPassword(item.password); 
    setSelectedRole(item.role); 
  };

  const handleUpdate = async () => {
    try {
      const updateStaff = await axios.put(
        `http://localhost:8080/api/kasir/${editStaff.id}`,
        {
          name: newStaffName,
          username: username,
          password: password,
          role: selectedRole,
        }
      );
  
      setEditStaff(null);
      setNewStaffName('')
      setSelectedRole('');
      setUsername('');
      setPassword('');
      setStaff((prevItem) =>
        prevItem.map((item) =>
          item.id === updateStaff.data.data.id ? updateStaff.data.data : item
        )
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (name === 'newStaffName') {
      setNewStaffName(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRoleChange = (e:any) => {
    setSelectedRole(e.target.value);
  };

  return (
    <Box >
      <Grid container spacing={3}>
      <Grid item md={12}>
          <Paper sx={{width:'100%',textAlign:'center', padding:'50px', margin:'auto', borderRadius:'15px', background:'#209F84', color:'white'}}> 
              <Typography variant='h3' sx={{ fontWeight:'bold' }}>Staff</Typography>
          </Paper>
      </Grid>
        <Grid item md={6}>    
          <Paper onChange={handleChange} >
            
            <Grid
              container
              spacing={2}        
              direction="column"
              sx={{ justifyItems: 'center', alignItems: 'center', }}
            >
              <Grid item xs={12}>
              <Button variant="outlined" color="success">
                <Link to={`/roles`}>
                  Add roles
                </Link>
              </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter Kasir name"
                  variant="outlined"
                  name="newStaffName"
                  value={newStaffName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter username"
                  variant="outlined"
                  name="username"
                  value={username}
                  onChange={handleChange}
                /> 
                </Grid>
                <Grid item xs={12}>
                <TextField
                  label="Enter password"
                  variant="outlined"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectRoles     
                  selectedRole={selectedRole}
                  onRoleChange={handleRoleChange}
                />
              </Grid>
              <Grid item xs={12}>
              {editStaff? ( 
                <>
                  <Button variant="contained" color="primary" onClick={handleUpdate} sx={{marginRight:2}}>
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setEditStaff(null);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                  sx={{ marginBottom: '20px', minWidth: 200 }}
                >
                  Add
                </Button>
              )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={1}>
        </Grid>
        <Grid item md={5}>
          {staff.map((item:any, index) => (
            <Paper
              key={index}
              sx={{
                width: '20rem',
                margin: '0 0 40px 0',
                padding: '20px',
                display: 'flex',
                align: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography>{item.name}</Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
                <Button variant="outlined" color="success">
                  <Link to={`/`}>Login</Link>
                </Button>
                <Button
                  onClick={() => handleEdit(item)}
                  variant="outlined"
                  color="success"
                >
                  Edit
                </Button>
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Staff;
