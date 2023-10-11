import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard'
import Staff from './components/Staff'
import StaffDetail from './components/StaffDetail'
import SideNavbar from './components/SideNavbar'
import Meja from './components/Meja'
import Menu from './components/Menu';
import Roles from './components/Roles'
import DataDetail from './components/DataDetail'
import Transaksi from './components/Transaksi';
import TransaksiDetail from './components/TransaksiDetail';
import CategoryMenu from './components/CategoryMenu';
import BugReport from './components/BugReport';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', 
    },
    background: {
      default: '#F2F7F1', 
      paper: '#ffffff',   
    },
  },
});

function App() {
  
  return (
    <BrowserRouter>
    <SideNavbar />
    <ThemeProvider theme={theme}>
    <CssBaseline /> 
    <Routes> 
      <Route path="/" element={ <Dashboard/>}   />
      <Route path="/staff/" element={<Staff />}/>
      <Route path="/staff/:id" element={<StaffDetail />}/>
      <Route path="/staff/:id/checkout/:staffId" element={<DataDetail/>} />
      <Route path="/staff/:id/transaksi/:staffId" element={<Transaksi/>} />
      <Route path="/transaksi/:staffId/details/:detailsId" element={<TransaksiDetail/>} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/meja/" element={<Meja />}/>
      <Route path="/menu/" element={<Menu />}/>
      <Route path="/category" element={<CategoryMenu />} />
      <Route path='/report' element={<BugReport />} />

    </Routes>
    </ThemeProvider>
   
    </BrowserRouter>
  );
}

export default App;
