import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { faBook} from "@fortawesome/free-solid-svg-icons"; 
import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }}));
export default function AppBarCustomer(props){
  const classes = useStyles();

  return (
 
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>

          <Typography variant="h6" noWrap>
           <a href="/addbooking" style={{color:"white"}}>Customer Dashboard</a>
          </Typography>
          <GridContainer>
            <GridItem>
            <Button href="/getdriverdetails" variant="contained" color="secondary" style={{color: 'white',marginLeft:'10px'}}>
            <FontAwesomeIcon icon={faBook} style={{color: 'white',marginRight:'10px'}} />
            Booking Details
          </Button>
            </GridItem>
            
          </GridContainer>

        </Toolbar>
      </AppBar>
      </div>
  )
}
    
  