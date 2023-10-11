import React, { useState, useEffect } from 'react';
import { InputLabel, Box, Select, FormControl, MenuItem } from '@mui/material'; 
import axios from 'axios';

function SelectRoles(props: any) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:8080/api/role')
        .then((response) => {
          setRoles(response.data.data);
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
        <InputLabel id="Roles">Roles</InputLabel>
        <Select name="roles" value={props.selectedRole} onChange={props.onRoleChange} labelId="demo-simple-select-standard-label" >
        {roles.map((item: any, index:any) => (
          <MenuItem key={index} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  );
}

export default SelectRoles;
