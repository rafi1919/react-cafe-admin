import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { 
  Box,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TableBarIcon from '@mui/icons-material/TableBar';
import BugReportIcon from '@mui/icons-material/BugReport';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer(isAuthenticated:any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', color:'#ffffff'}}>

      <CssBaseline />
      {isAuthenticated ? (
      <Drawer variant="permanent" open={open} 
       PaperProps={{
        sx: {
          width: 240,
          background:'#209F84',
          borderRadius:'0 15px 15px 0'
        }
      }}>  
 
        <DrawerHeader > 
          <IconButton onClick={handleToggleDrawer} sx={{ color:'#ffffff' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
    
        <Divider />
        <List sx={{ color:'#ffffff' }}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link to="/staff" style={{textDecoration:'none', color:'white'}}>
              <ListItemButton >  
              <PeopleIcon />
                <ListItemText sx={{ opacity: open ? 1 : 0 }} >
                    Staff
                </ListItemText>
              </ListItemButton>   
              </Link>  
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link to="/menu" style={{textDecoration:'none', color:'white'}}>
              <ListItemButton>  
              <RestaurantMenuIcon />
                <ListItemText sx={{ opacity: open ? 1 : 0 }} >
                    Menu
                </ListItemText>
              </ListItemButton>   
              </Link>  
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
            <Link to="/meja"  style={{textDecoration:'none', color:'white'}}>
              <ListItemButton>  
              <TableBarIcon />
                <ListItemText sx={{ opacity: open ? 1 : 0 }} >
                    Meja
                </ListItemText>
              </ListItemButton>     
              </Link>
            </ListItem>  
            <ListItem disablePadding sx={{ display: 'block' }}>
            <Link to="#"  style={{textDecoration:'none', color:'white'}}>
              <ListItemButton>  
              <BugReportIcon />
                <ListItemText sx={{ opacity: open ? 1 : 0 }} >
                    Bug Report
                </ListItemText>
              </ListItemButton>     
              </Link>
            </ListItem>  
        </List>
      </Drawer>
              ): (<Box></Box>)}
    </Box>
  );
}
