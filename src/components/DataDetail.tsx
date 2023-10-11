import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  TableRow,
  TableCell,
  TableBody,
  TableHead

} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SelectMenu from './select/SetectMenu'; 
import axios from 'axios';

const Detail=()=> {
  const { staffId } = useParams();
  const [detail, setDetail] = useState([]);
  const [editDetail, setEditDetail] = useState(null); 
  const [increment, setIncrement] = useState(1);

  const [kasir, setKasir] = useState(staffId);
  const [harga, setHarga] = useState('');
  const [barang, setBarang] = useState('');
  const [selectMenu, setSelectMenu] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
  };
  
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/checkout/${staffId}`);
        setDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchDetail();
  }, [staffId]);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/checkout', {
        id_kasir: kasir,
        id_menu: selectMenu,
        total_barang: barang,
        total_harga: harga,
      });

      setKasir(staffId);
      setSelectMenu('');
      setBarang('');
      setHarga('');
      setDetail((prevDetail) => [...prevDetail, response.data.data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id:any) => {
    try {
      await axios.delete(`http://localhost:8080/api/checkout/${id}`);
      setDetail((prevItem) => prevItem.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error delete', error);
    }
  };

  const handleEdit = (item:any) => {
    setEditDetail(item);
    setBarang(item.total_barang);
    setSelectMenu(item.id_menu); 
    setHarga(item.total_harga); 
    handleOpen();
  };
  
  const handleUpdate = async () => {
    try {
      const updatedItem = await axios.put(
        `http://localhost:8080/api/checkout/${editDetail.id}`,
        {
          id_kasir: kasir,
          id_menu: selectMenu,
          total_barang: barang,
          total_harga: harga,
        }
      );
  
      setEditDetail(null);
      setKasir(staffId);
      setSelectMenu('');
      setBarang('');
      setHarga('');
      setDetail((prevItem) =>
        prevItem.map((item) =>
          item.id === updatedItem.data.data.id ? updatedItem.data.data : item
        )
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (name === 'kasir') {
      setKasir(value);
    } else if (name === 'selectMenu') {
      setSelectMenu(value);
    } else if (name === 'barang') {
      setBarang(value);
    } else if (name === 'harga') {
      setHarga(value);
    }
  };

  const handleMenuChange = (e:any) => {
    setSelectMenu(e.target.value);
    console.log("tes", e.target.value);
  };

  return (
    <Box>
       <Box>
        <Button sx={{marginBottom:2}} variant="contained" color="primary" onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </Button>
      </Box>
      <Grid container spacing={3}>  
      <Grid item md={12}>
          <Paper sx={{width:'100%',textAlign:'center', padding:'50px', margin:'auto', borderRadius:'15px', background:'#209F84', color:'white'}}> 
              <Typography variant='h3' sx={{ fontWeight:'bold' }}>Detail data {staffId}</Typography>
          </Paper>
      </Grid>
      <Grid item md={12}>
      <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }} >
        <Box sx={{ width: '100%' }}>
          
        </Box>
        <Box sx={{ flexShrink: 1,  }}>
          <Button onClick={handleOpen} color='primary'><AddCircleOutlineIcon  style={{ fontSize: '3rem' }}/></Button>
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
          <Paper sx={{ borderRadius:'15px', width:'20rem', padding:'20px'}} >
            <Grid
              container
              spacing={3}
              direction="column"
              sx={{ justifyItems: 'center', alignItems: 'center' }}
            >
              <Grid item xs={12}>
                <TextField
                  label="id kasir"
                  variant="outlined"
                  name="kasir"
                  value={kasir}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectMenu name="selectMenu" selectMenu={selectMenu} onMenuChange={handleMenuChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="barang"
                  variant="outlined"
                  name="barang"
                  value={barang}
                  onChange={handleChange}
                />
              </Grid >
              <Grid item xs={12}>
              {editDetail ? ( 
                <>
                  <Button variant="contained" color="primary" onClick={handleUpdate} sx={{marginRight:2}}>
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setEditDetail(null);
                      setBarang('');
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
              <TableCell align="right">Id Menu</TableCell>
              <TableCell align="right">total barang</TableCell>
              <TableCell align="right">total harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  
          {detail.length === 0 ? (
            <li>No transactions found for this staff.</li>
          ) : (
            detail.map((item:any, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                   <TableCell align="right"> {increment + index}</TableCell>
                   <TableCell align="right"> {item.id_menu}</TableCell>
                   <TableCell align="right"> {item.total_barang}</TableCell>
                   <TableCell align="right">{item.total_harga}</TableCell>
                   <TableCell align="right">

                  <Button onClick={() => handleDelete(item.id)} color="error" style={{ fontSize: '3rem' }}><DeleteIcon /></Button>
                  <Button onClick={() => handleEdit(item)}  color="success" style={{ fontSize: '3rem' }}><EditNoteIcon /></Button>
                  </TableCell>

              </TableRow>
            ))
          )}
           </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
    </Box>
  );
}

export default Detail;
