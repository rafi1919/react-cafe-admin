import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  TableHead,
} from '@mui/material';
import axios from 'axios';
import SelectMeja from './select/SelectMeja';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Transaksi=()=> {
  const { staffId } = useParams();
  const [transaksi, setTransaksi] = useState([]);
  const [editTransaksi, setEditTransaksi] = useState(null);

  const [kasir, setKasir] = useState(staffId);
  const [pelanggan, setPelanggan] = useState('');
  const [status, setStatus] = useState('');
  const [pembayaran, setPembayaran] = useState('');

  const [selectMeja, setSelectMeja] = useState('');

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
    const fetchTransaksi = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/transaksi`);
        const filteredTransaksi = response.data.data.filter(
          (item: any) => item.id_kasir === parseInt(staffId)
        );
        setTransaksi(filteredTransaksi);
      } catch (error) {
        console.error('Error fetching Transaksi:', error);
      }
    };

    fetchTransaksi();
  }, [staffId]);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/transaksi', {
        id_kasir: kasir,
        id_meja: selectMeja,
        status: status,
        nama_pelanggan: pelanggan,
        metode_pembayaran: pembayaran,
      });

      setKasir(staffId);
      setSelectMeja('');
      setStatus('');
      setPelanggan('');
      setPembayaran('');
      setTransaksi((prevItem) => [...prevItem, response.data.data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id:any) => {
    try {
      await axios.delete(`http://localhost:8080/api/transaksi/${id}`);
      setTransaksi((prevItem) => prevItem.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error delete', error);
    }
  };

  const handleEdit = (item:any) => {
    setEditTransaksi(item);
    setStatus(item.status);
    setSelectMeja(item.id_meja);
    setPembayaran(item.metode_pembayaran);
    setPelanggan(item.nama_pelanggan);
    handleOpen();
  };

  const handleUpdate = async () => {
    try {
      const updatedItem = await axios.put(
        `http://localhost:8080/api/transaksi/${editTransaksi.id}`,
        {
          id_kasir: kasir,
          id_meja: selectMeja,
          status: status,
          metode_pembayaran: pembayaran,
          nama_pelanggan: pelanggan,
        }
      );

      setEditTransaksi(null);
      setKasir(staffId);
      setSelectMeja('');
      setStatus('');
      setPelanggan('');
      setPembayaran('');
      setTransaksi((prevItem) =>
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
    } else if (name === 'selectMeja') {
      setSelectMeja(value);
    } else if (name === 'status') {
      setStatus(value);
    } else if (name === 'pelanggan') {
      setPelanggan(value);
    } else if (name === 'pembayaran') {
      setPembayaran(value);
    }
  };

  const handleMejaChange = (e:any) => {
    setSelectMeja(e.target.value);
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
              Transaksi data {staffId}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <div style={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <Box sx={{ width: '100%' }}></Box>
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
                    <SelectMeja
                      name="selectMeja"
                      selectMeja={selectMeja}
                      onMejaChange={handleMejaChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="pelanggan"
                      variant="outlined"
                      name="pelanggan"
                      value={pelanggan}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="status"
                      variant="outlined"
                      name="status"
                      value={status}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="metode pembayaran"
                      variant="outlined"
                      name="pembayaran"
                      value={pembayaran}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {editTransaksi ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUpdate}
                          sx={{ marginRight: 2 }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setEditTransaksi(null);
                            setPelanggan('');
                            setPembayaran('');
                            setStatus('');
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
                  <TableCell align="right">Id Meja</TableCell>
                  <TableCell align="right">Nama pelanggan</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Pembayaran</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transaksi.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>No transactions found for this staff.</TableCell>
                  </TableRow>
                ) : (
                  transaksi.map((item:any, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{index + 1}</TableCell>
                      <TableCell align="right">{item.id_meja}</TableCell>
                      <TableCell align="right">{item.nama_pelanggan}</TableCell>
                      <TableCell align="right">{item.status}</TableCell>
                      <TableCell align="right">{item.metode_pembayaran}</TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleDelete(item.id)} color="error" style={{ fontSize: '3rem' }}>
                          <DeleteIcon />
                        </Button>
                        <Link to={`/transaksi/${staffId}/details/${item.id}`}>
                          <Button variant="contained" color="success">
                            Detail
                          </Button>
                        </Link>
                        <Button onClick={() => handleEdit(item)} color="success" style={{ fontSize: '3rem' }}>
                          <EditNoteIcon />
                        </Button>
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

export default Transaksi;
