import React, { useState, useEffect } from 'react';
import { Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material'; 
import axios from 'axios';

function selectMenu(props: any) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:8080/api/menu')
        .then((response) => {
          setCategory(response.data.data);
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
      <InputLabel id="Menu">Menu</InputLabel>
      <Select name="menu" value={props.selectMenu} onChange={props.onMenuChange}>
      {category.map((item: any, index: any) => (
        <MenuItem key={index} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
    </FormControl>

    </Box>
  );
}

export default selectMenu;
