import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  TextField, 
  Button
} from '@mui/material';
import axios from 'axios';

const CategoryMenu = ()=> {
  const [category, setCategory] = useState([]);
  const [newName, setNewName] = useState('');
  const [editName, setEditName] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/category');
      setCategory(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/category', {
        name: newName,
      });

      setNewName('');
      setCategory((prevItem) => [...prevItem, response.data.data]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEdit = (item:any) => {
    setEditName(item);
    setNewName(item.name);
  };

  const handleUpdate = async () => {
    try {
      const updateditem = await axios.put(
        `http://localhost:8080/api/category/${editName.id}`,
        {
          name: newName,
        }
      );

      setEditName(null);
      setNewName('');
      setCategory((prevItem) =>
        prevItem.map((item) =>
          item.id === updateditem.data.data.id ? updateditem.data.data : item
        )
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id:any) => {
    try {
      await axios.delete(`http://localhost:8080/api/category/${id}`);
      setCategory((prevItem) => prevItem.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleChange = (e:any) => {
    setNewName(e.target.value);
  };

  return (
    <Box>
    
    <Grid container spacing={3}>  
    <Grid item md={12}>
          <Paper sx={{width:'100%',textAlign:'center', padding:'50px', margin:'auto', borderRadius:'15px', background:'#209F84', color:'white'}}> 
              <Typography variant='h3' sx={{ fontWeight:'bold' }}>Category</Typography>
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
        label="Enter item name"
        variant="outlined"
        value={newName}
        onChange={handleChange}
      />
      <Grid item xs={12}>
      {editName ? (
        <>
          <Button variant="contained" color="primary" onClick={handleUpdate} sx={{marginRight:2}}>
            Update
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setEditName(null)}
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
        {category.map((item:any, index) => (
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
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="outlined"
                  color="error"
                  sx={{marginRight:2}}
                >
                  delete
                </Button>
                <Button variant="outlined" color="success"  onClick={() => handleEdit(item)}>
                 edit
                </Button>
              </Box>
          </Paper>
        ))}
      </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryMenu;
