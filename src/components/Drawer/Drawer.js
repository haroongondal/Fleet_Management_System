import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import BusinessIcon from '@material-ui/icons/Business';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import TimelineIcon from '@material-ui/icons/Timeline';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import RemoveIcon from '@material-ui/icons/Remove';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import AddIcon from '@material-ui/icons/Add';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import EditIcon from '@material-ui/icons/Edit';
import StoreIcon from '@material-ui/icons/Store';
import SettingsIcon from '@material-ui/icons/Settings';
import SubjectIcon from '@material-ui/icons/Subject';
import SignOutNavBar from "../SignOut/SignOutNavBar";
import SignOutNavBarBig from "../SignOut/SignOutNavbarBig";


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default function PersistentDrawerLeft() {


  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
 
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <a href="/dashboard" style={{color:"white"}}>Admin Dashboard</a>
          </Typography>
          {/* <Button color="inherit">fsafasdf</Button> */}
          <SignOutNavBar />

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

        <ListItem style={{background:"grey",height:"75px"}} button key={'Vehicle Management'} >
              <ListItemIcon style={{color:"black"}}><LocalTaxiIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a style={{color:"black",fontSize:"20px"}}>Vehicle Management</a>
            </ListItem>
            
            <ListItem button key={'Vehicle Management'} >
              <ListItemIcon><AddIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a  href="/addvehicle"><ListItemText primary={'Add Vehicle'} /></a>
            </ListItem>

            <ListItem button key={'Vehicle Management'} >
              <ListItemIcon><AddIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/addvehiclereservation"><ListItemText primary={'Add Vehicle Reservation Status'} /></a>
            </ListItem>

            <ListItem button key={'Vehicle Management'} >
              <ListItemIcon><SubjectIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/getallvehicle"><ListItemText primary={' View All Vehicle'} /></a>
            </ListItem>

            <ListItem button key={'Vehicle Management'} >
              <ListItemIcon><LocalGasStationIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/vehiclefueling"><ListItemText primary={'Fueling'} /></a>
            </ListItem>

            <ListItem button key={'Vehicle Management'} >
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/vehiclemaintenance"><ListItemText primary={'Vehicle Maintainance'} /></a>
            </ListItem>
            
            <ListItem button key={'Driver Management'}>
            <ListItemIcon><ViewHeadlineIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/maintenancerecord"><ListItemText primary={'Maintenance History'} /> </a>
            </ListItem>
          
        <Divider />
        
        <ListItem style={{background:"grey",height:"75px"}} button key={'Vendor Management'} >
              <ListItemIcon style={{color:"black"}}><BusinessIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a style={{color:"black",fontSize:"20px"}}>Vendor Management</a>
            </ListItem>

            <ListItem button key={'Vendor Management'}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <a href="/addvendor"><ListItemText primary={'Add Vendor'} /></a>
            </ListItem>

            <ListItem button key={'Vendor Management'}>
              <ListItemIcon><SubjectIcon /></ListItemIcon>
              <a href="/getallvendors"><ListItemText primary={'View Vendors'} /></a>
            </ListItem>

            <ListItem button key={'Vendor Management'}>
              <ListItemIcon><StoreIcon /></ListItemIcon>
              <a href="/partspurchase"><ListItemText primary={'Purchase a Part'} /></a>
            </ListItem>
          
        <Divider />
        
        <ListItem style={{background:"grey",height:"75px"}} button key={'Customer Management'} >
              <ListItemIcon style={{color:"black"}}><PersonOutlineIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a style={{color:"black",fontSize:"20px"}}>Customer Management</a>
            </ListItem>
            <ListItem button key={'Customer Management'}>
              <ListItemIcon><EditIcon /></ListItemIcon>
              <a href="/editcustomer"><ListItemText primary={'Edit a customer'} /></a>
            </ListItem>
            <ListItem button key={'Customer Management'}>
              <ListItemIcon><SubjectIcon /></ListItemIcon>
              <a href="/getallcustomers"><ListItemText primary={'View All Customers'} /></a>
            </ListItem>

          
        <Divider />
        
        <ListItem style={{background:"grey",height:"75px"}} button key={'Driver Management'} >
              <ListItemIcon style={{color:"black"}}><RecentActorsIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a style={{color:"black",fontSize:"20px"}}>Driver Management</a>
            </ListItem>
            <ListItem button key={'Driver Management'}>
            <ListItemIcon><EditIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/editdriver"><ListItemText primary={'Edit Driver'} /> </a>
            </ListItem>

            <ListItem button key={'Driver Management'}>
            <ListItemIcon><SubjectIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/getalldriver"><ListItemText primary={'View Drivers'} /> </a>
            </ListItem>
            
            <ListItem button key={'Driver Management'}>
            <ListItemIcon><RemoveIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/assigndriver"><ListItemText primary={'Assign Driver a Booking'} /> </a>
            </ListItem>

            <ListItem button key={'Driver Management'}>
            <ListItemIcon><ViewHeadlineIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/History"><ListItemText primary={'Check In/Out History'} /> </a>
            </ListItem>

            <ListItem button key={'Driver Management'}>
            <ListItemIcon><SubjectIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/assignments"><ListItemText primary={'View All Assignments'} /> </a>
            </ListItem>

        <Divider />
        
        <ListItem button key={'Booking History'} >
              <ListItemIcon><DevicesOtherIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <ListItemText primary={'Others'} />
            </ListItem>
        <Divider />

        <ListItem button key={'Booking History'} >
              <ListItemIcon><BookmarkBorderIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/viewbooking"> <ListItemText primary={'Booking Management'} /></a>
            </ListItem>
        <Divider />

        <ListItem button key={'Analytics'}>
              <ListItemIcon><TimelineIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/dashboard"> <ListItemText primary={'Analytics'} /></a>
            </ListItem>

        <Divider />

        <ListItem button key={'Fuel Management'} >
              <ListItemIcon><LocalGasStationIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/addfuelbudget"> <ListItemText primary={'Fuel Management'} /></a>
            </ListItem>

        <Divider />

                
        <ListItem button key={'navbar'}>
        <ListItemIcon><NotListedLocationIcon /></ListItemIcon>
              {/* <ListItemText primary={'Test'} /> */}
              <a href="/showmap"> <ListItemText primary={'View Map'} /></a>
            </ListItem>
        <Divider />
        
        <ListItem button key={'navbar'}>

              <SignOutNavBarBig />
            </ListItem>
        <Divider />
        
        </List>
      </Drawer>

    </div>
  );
}
