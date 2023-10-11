import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Modal,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import axios from 'axios';
import SelectCategory from './select/SelectCategory';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [newMenu, setNewMenu] = useState('');
  const [editMenu, setEditMenu] = React.useState(null);

  const [harga, setHarga] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menu');
      setMenu(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/menu', {
        name: newMenu,
        harga: harga,
        description: desc,
        category: selectedCategory,
      });

      setNewMenu('');
      setHarga('');
      setDesc('');
      setSelectedCategory('');
      setMenu((prevItems) => [...prevItems, response.data.data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:8080/api/menu/${id}`).then(() => {
        setMenu((prevItems) => prevItems.filter((item) => item.id !== id));
      });
    } catch (error) {
      console.log('error delete', error);
    }
  };

  const handleEdit = (item:any) => {
    setEditMenu(item);
    setNewMenu(item.name);
    setHarga(item.harga);
    setDesc(item.description);
    setSelectedCategory(item.category);
    handleOpen();
  };

  const handleUpdate = async () => {
    try {
      const updatedItem = await axios.put(`http://localhost:8080/api/menu/${editMenu.id}`,
      {
        id: editMenu,
        name: newMenu,
        harga: harga,
        description: desc,
        category: selectedCategory,
      }
      );

      setEditMenu(null);
      setSelectedCategory('')
      setDesc('');
      setHarga('');
      setMenu((prevItem) =>
        prevItem.map((item) =>
          item.id === updatedItem.data.data.id ? updatedItem.data.data : item
        )
      );
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (name === 'newMenu') {
      setNewMenu(value);
    } else if (name === 'harga') {
      setHarga(value);
    } else if (name === 'desc') {
      setDesc(value);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid item md={12}>
        <Paper
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: '50px',
            margin: 'auto',
            borderRadius: '15px',
            background: '#209F84',
            color: 'white',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Menu
          </Typography>
        </Paper>
      </Grid>
      <div style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Box sx={{ width: '100%' }}>
            <Button variant="outlined" color="success">
              <Link to="/category">Add Category</Link>
            </Button>
          </Box>
          <Box sx={{ flexShrink: 1 }}>
            <Button onClick={handleOpen} color="primary">
              <AddCircleOutlineIcon style={{ fontSize: '3rem' }} />
            </Button>
          </Box>
        </Box>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Paper sx={{ borderRadius: '15px', width: '20rem', padding: '20px' }}>
            <Grid container spacing={3} direction="column" sx={{ justifyItems: 'center', alignItems: 'center' }}>
              <Grid item xs={12}>
                <TextField
                  label="Enter menu name"
                  variant="outlined"
                  name="newMenu"
                  value={newMenu}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter harga"
                  variant="outlined"
                  name="harga"
                  value={harga}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter description"
                  variant="outlined"
                  name="desc"
                  value={desc}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectCategory selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
              </Grid>
              <Grid item xs={12}>
                {editMenu ? (
                  <>
                    <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ marginRight: 2 }}>
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setEditMenu(null);
                        setNewMenu('');
                        setHarga('');
                        setDesc('');
                        setSelectedCategory('');
                        handleClose();
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
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Nama Menu</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Deskripsi</TableCell>
              <TableCell align="right">Harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((item:any, index) => (
              <TableRow key={item.id}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.category}</TableCell>
                <TableCell align="right">{item.description}</TableCell>
                <TableCell align="right">{item.harga}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDelete(item.id)} color="error" style={{ fontSize: '3rem' }}>
                    <DeleteIcon />
                  </Button>
                  <Button onClick={() => handleEdit(item)} color="success" style={{ fontSize: '3rem' }}>
                    <EditNoteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Menu;
