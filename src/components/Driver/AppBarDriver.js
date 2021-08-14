import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import SubjectIcon from '@material-ui/icons/Subject';

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
export default function AppBarDriver(){
  const classes = useStyles();
  return (
 
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>


    <GridContainer style={{width: '1200px',marginTop:'15px'}}>
    <GridItem xs={12} sm={12} md={3} style={{width:"auto"}}>
       <a href="/driverdashboard" style={{color:'white'}}>
        <Typography variant="h6" noWrap style={{marginLeft:"10px"}}>
            Driver Dashboard
          </Typography>
        </a>
       </GridItem>
      <GridItem xs={12} sm={12} md={3} style={{width:"auto"}}>
      <Button href="/getassignment" variant="contained" color="secondary" style={{color: 'white',marginLeft:"10px"}}>
            <SubjectIcon style={{color: 'white',marginRight:'10px'}} />
            Get Assignments
          </Button>
          <div class="resposive-line"><br></br></div>
      </GridItem>
      <GridItem xs={12} sm={6} md={3} style={{width:"auto"}}>

      <Button href="/checkout" variant="contained" color="secondary" style={{color: 'white',marginLeft:"10px" }}>
            Check In History
          </Button>
          <div class="resposive-line"><br></br></div>
      </GridItem>
      
      <GridItem xs={12} sm={6} md={3} style={{width:"auto"}}>

<Button href="/editmydriver" variant="contained" color="secondary" style={{color: 'white',marginLeft:"10px" }}>
<PersonOutlineIcon style={{color: 'white',marginRight:'10px'}} />
      Edit Information
    </Button>
</GridItem>
    </GridContainer>


        </Toolbar>
      </AppBar>
      </div>
  )
}
    
  