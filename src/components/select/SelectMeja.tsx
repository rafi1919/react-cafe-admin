import React, { useState, useEffect } from 'react';
import {Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

function selectMeja(props:any) {
  const [meja, setMeja] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:8080/api/meja')
        .then((response) => {
          setMeja(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="Meja">Meja</InputLabel>
        <Select name="meja" value={props.selectMeja} onChange={props.onMejaChange}>
        {meja.map((item: any) => (
            <MenuItem key={item.id} value={item.id}>
                {item.nomor_meja}
            </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default selectMeja;
