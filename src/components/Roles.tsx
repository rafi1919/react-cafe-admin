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

const Roles=()=> {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [editRole, setEditRole] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/role');
      setRoles(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/role', {
        name: newRoleName,
      });

      setNewRoleName('');
      setRoles((prevItem) => [...prevItem, response.data.data]);
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const handleEdit = (role:any) => {
    setEditRole(role);
    setNewRoleName(role.name);
  };

  const handleUpdate = async () => {
    try {
      const updatedRole = await axios.put(
        `http://localhost:8080/api/role/${editRole.id}`,
        {
          name: newRoleName,
        }
      );

      setEditRole(null);
      setNewRoleName('');
      setRoles((prevItem) =>
        prevItem.map((role) =>
          role.id === updatedRole.data.data.id ? updatedRole.data.data : role
        )
      );
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDelete = async (id:any) => {
    try {
      await axios.delete(`http://localhost:8080/api/role/${id}`);
      setRoles((prevItem) => prevItem.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting role', error);
    }
  };

  const handleChange = (e:any) => {
    setNewRoleName(e.target.value);
  };

  return (
    <Box>
      <Grid container spacing={3}>  
      <Grid item md={12}>
          <Paper sx={{width:'100%',textAlign:'center', padding:'50px', margin:'auto', borderRadius:'15px', background:'#209F84', color:'white'}}> 
              <Typography variant='h3' sx={{ fontWeight:'bold' }}>Roles</Typography>
          </Paper>
      </Grid>
      <Grid item md={6}>
      <Box>
          <Paper sx={{ borderRadius:'15px', width:'20rem', padding:'20px'}} >
            <Grid
              container
              spacing={3}
              direction="column"
              sx={{ justifyItems: 'center', alignItems: 'center' }}
            >
      <Grid item xs={12}>
      <TextField
        label="Enter role name"
        variant="outlined"
        value={newRoleName}
        onChange={handleChange}
      />
      <Grid item xs={12}>
      {editRole ? (
        <>
          <Button variant="contained" color="primary" onClick={handleUpdate} sx={{marginRight:2}}>
            Update
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setEditRole(null)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      )}
      </Grid>
      </Grid>
      </Grid>
        </Paper>
      </Box>
      </Grid>

      <Grid item md={(6)}>
        {roles.map((item:any, index) => (
           <Paper
           key={index}
           sx={{
             width: '20rem',
             margin: '0 0 40px 40px',
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
            <Button onClick={() => handleDelete(item.id)} variant="outlined"color="error" sx={{marginRight:2}}>Delete</Button>
            <Button onClick={() => handleEdit(item)} variant="outlined" color="success">Edit</Button>
          </Box>
          </Paper>
        ))}
       </Grid>
      </Grid>
    </Box>
  );
}

export default Roles;
