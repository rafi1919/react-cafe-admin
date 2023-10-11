import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import axios from 'axios';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

interface itemData {
    id: number;
    name: string;
    username: string;
    password: string;
    role: string;
  }

  
const StaffDetail=()=>{
  const { id } = useParams(); 
  const [staff, setStaff] = useState<itemData | null>(null);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/api/kasir/${id}`) 
        .then((response) => {
          setStaff(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching staff details:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }, [id]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Paper sx={{width:'100%',textAlign:'center', padding:'50px', margin:'auto', borderRadius:'15px', background:'#209F84', color:'white'}}> 
              <Typography variant='h3' sx={{ fontWeight:'bold' }}>wellcome {staff.name}</Typography>
          </Paper>
        </Grid>
        <Grid item md={6}>
        <Link to={`/staff/${staff.id}/transaksi/${staff.id}`}  style={{ textDecoration: 'none' }}>
          <Paper sx={{width:'100%',textAlign:'center', padding:'50px', margin:'auto', borderRadius:'15px', color:'#209F84'}}> 
          <ReceiptLongIcon className="custom-icon" />
            <Typography>
                transaksi
            </Typography> 
          </Paper>          
        </Link>           
        </Grid>
        <Grid item md={6}>              
        <Link to={`/staff/${staff.id}/checkout/${staff.id}`}  style={{ textDecoration: 'none' }}> 
          <Paper sx={{width:'100%',textAlign:'center', padding:'50px', margin:'auto', borderRadius:'15px', color:'#209F84'}}> 
            <ShoppingCartCheckoutIcon className="custom-icon"/>
            <Typography>
                checkout
            </Typography>
          </Paper>                
        </Link>
        </Grid>



      </Grid>
         
  
    </Box>
  );
}

export default StaffDetail;
