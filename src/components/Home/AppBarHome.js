import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLoginPage, faSignOutAlt, faUser,faBook, faMap} from "@fortawesome/free-solid-svg-icons";
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
export default function AppBarCustomer(){
  const classes = useStyles();
  return (
 
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <Button href="/" variant="contained" color="primary" style={{color: 'white',marginLeft:'10px'}}>
            <FontAwesomeIcon icon={faBook} style={{color: 'white',marginRight:'10px'}} />
           Home
          </Button>
        </Toolbar>
      </AppBar>
      </div>
  )
}
    
  