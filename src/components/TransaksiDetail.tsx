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
import SelectMenu from './select/SetectMenu'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const TransaksiDetail=()=> {
  const { detailsId } = useParams();
  const [details, setDetail] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/details/`);
        setDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchDetail();
  }, [detailsId]);

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
              <Typography variant='h3' sx={{ fontWeight:'bold' }}>Detail data {detailsId}</Typography>
        </Paper>
      </Grid>

    <Grid item md={12}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Id Menu</TableCell>
              <TableCell align="right">harga</TableCell>
              <TableCell align="right">total barang</TableCell>
              <TableCell align="right">total harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  
          {details.length === 0 ? (
            <li>No detailss found for this staff.</li>
          ) : (
            details.map((item:any, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                   <TableCell align="right"> { index +1}</TableCell>
                   <TableCell align="right"> {item.id_menu}</TableCell>
                   <TableCell align="right"> {item.menu}</TableCell>
                   <TableCell align="right"> {item.harga}</TableCell>
                   <TableCell align="right"> {item.total_barang}</TableCell>
                   <TableCell align="right">{item.total_harga}</TableCell>
                   <TableCell align="right">

                  <Button color="error" style={{ fontSize: '3rem' }}><DeleteIcon /></Button>
                  {/* <Button  color="success" style={{ fontSize: '3rem' }}><EditNoteIcon /></Button> */}
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

export default TransaksiDetail;
