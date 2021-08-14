import React from "react";
import {useState,useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// core components
import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardBody from "../Card/CardBody.js";

import 'react-toastify/dist/ReactToastify.css';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import SettingsIcon from '@material-ui/icons/Settings';
import SubjectIcon from '@material-ui/icons/Subject';
import Model from '../Model/Model'
import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {
    dailySalesChart,partsChart
  } from "./charts.js";
  
const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  var classes = useStyles();
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var services=0;
  var    totaldriverassignment= 0;
  const[totalvehicle,setTotalVehicle]=useState(0);
  const[totalbooking,setTotalBooking]=useState(0);
  const[totaldriver,setTotalDriver]=useState(0);
  const[totaldriverassign,setTotalDriverAssign]=useState(0);
  const[totalcustomer,setTotalCustomer]=useState(0);
  const[totalservices,setTotalServices]=useState(0);
  const[carsid,setCarId]=useState([]);

  var serviceDate =[];

  useEffect(() => {
    async function getTotalVehicle(){
      const totalvechicleresponse = await fetch("https://fmts.herokuapp.com/api/gettotalvehicle", {method:'GET'});
      const totalvehicledetails = await totalvechicleresponse.json();
     let totalvechiles= totalvehicledetails.map((totvechicle) => totvechicle.totalvehicle);
     setTotalVehicle(totalvechiles);
    }
    getTotalVehicle();
    getTotalCustomers();
    getTotalBooking();
    getTotalDriverAssignment();
    getTotalDrivers();
    getServiceDate();
     
  }, [])

    const getTotalBooking= async () => {
        let totalbookings =0;
        const totalbookingresponse = await fetch("https://fmts.herokuapp.com/api/getbookings", {method: 'GET'});
        const totalbookingdetails = await totalbookingresponse.json();
        totalbookingdetails.map(() => totalbookings=totalbookings+1,console.log('map running: ' +totalbookings));
        setTotalBooking(totalbookings);

    }

    const getTotalDriverAssignment= async () => {

        const totaldriverassignresponse = await fetch("https://fmts.herokuapp.com/api/gettotaldriverassign", {method: 'GET'});
        const totaldriverassigndetails = await totaldriverassignresponse.json();
         totaldriverassignment= totaldriverassigndetails.map((totaldriveassign) => totaldriveassign.totaldriverassign);
         setTotalDriverAssign(totaldriverassignment);
    }

    const getTotalDrivers= async () => {
        const totaldriverresponse = await fetch("https://fmts.herokuapp.com/api/gettotaldriver", {method: 'GET'});
        const totaldriverdetails = await totaldriverresponse.json();
        let totaldrivers= totaldriverdetails.map((totaldriver) => totaldriver.totaldriver);
        setTotalDriver(totaldrivers);
    }

    const getTotalCustomers= async () => {

      const customerdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallcustomers", { method: 'GET'});
      const customerdetails = await customerdetailsResponse.json();
      console.log(customerdetails)
      let count=0;
      customerdetails.map((value=>{
          if(!(value['username'].includes('driver')) && !(value['username'].includes('admin'))){
              count=count+1;
          }
      }))
      setTotalCustomer(count);
    }

    function dateDiffInDays(b, a) {
      // Discard the time and time-zone information.
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;

      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    const getServiceDate= async () => {

      const serviceresponse = await fetch("https://fmts.herokuapp.com/api/getservices", {method: 'GET'});
      const servicesdetails = await serviceresponse.json();
      serviceDate=servicesdetails;
      
      serviceDate.map((value) => { 
      const a = new Date(date);
   const b = new Date(value['partreplacementdate']);
   var difference = dateDiffInDays(a, b);
      if(difference >= 30){
        if(!(value['_id'] in carsid))
        {setCarId(carsid.push(value['_id']));
        }
        carsid.map((values) => {
        })
        services=services+1;
        setTotalServices(services);
      }
    })
  }
  var fuel=(<></>);
  if(props.fuelCrossed== true){
     fuel =(
      
    <GridItem xs={12} sm={6} md={3}>    
    <Card>
    <CardHeader color="danger" stats icon>
      
        <CardIcon color="danger">
          <LocalGasStationIcon />
        </CardIcon>
        <h3 className={classes.cardTitle}>Fuel Crossed the Budget</h3>
      </CardHeader>
    </Card>
  </GridItem>
    
    ) 
  }

  var warranty=(<></>);
  if(props.warrantyDate == true){
    warranty =(
      
    <GridItem xs={12} sm={6} md={3}>
    <Card>
    <CardHeader color="danger" stats icon>
      
        <CardIcon color="danger">
          <LocalTaxiIcon />
        </CardIcon>
        <p className={classes.cardCategory} style={{color:'red'}}>Warranty Near To Expire</p>
        <h3 className={classes.cardTitle}>{localStorage.getItem('warrantyCount')}</h3>
      </CardHeader>
    </Card>
    </GridItem>
   
    ) 
  }   

const body =(
  
        
<>
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color="warning" stats icon>
          <CardIcon color="warning">
            <Icon><LocalTaxiIcon /></Icon>
          </CardIcon>
          <p className={classes.cardCategory}>Total Vehicles</p>
          <h3 className={classes.cardTitle}>
          {/* {localStorage.getItem('totalvechile')} */}
          {totalvehicle}
          </h3>
        </CardHeader>

      </Card>
    </GridItem>
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color="success">
            <BookmarkBorderIcon />
          </CardIcon>
          <p className={classes.cardCategory}>Total Pending Bookings</p>
          <h3 className={classes.cardTitle} style={{color:'red'}}>{totalbooking}</h3>
        </CardHeader>

      </Card>
    </GridItem>
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color="danger" stats icon>
          <CardIcon color="danger">
            <Icon><RecentActorsIcon /></Icon>
          </CardIcon>
          <p className={classes.cardCategory}>Total Drivers</p>
          <h3 className={classes.cardTitle}>{totaldriver}</h3>
        </CardHeader>

      </Card>
    </GridItem>
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color="info" stats icon>
          <CardIcon color="info">
            <SubjectIcon />
          </CardIcon>
          <p className={classes.cardCategory}>Total Assignments</p>
          <h3 className={classes.cardTitle}>{totaldriverassign}</h3>
        </CardHeader>

      </Card>
    </GridItem>
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color="info" stats icon>
          <CardIcon color="info">
            <PersonOutlineIcon />
          </CardIcon>
          <p className={classes.cardCategory}>Total Customers</p>
          <h3 className={classes.cardTitle}>{totalcustomer}</h3>
        </CardHeader>

      </Card>
    </GridItem>

    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color="warning" stats icon>
          <CardIcon color="warning">
            <Icon><SettingsIcon /></Icon>
          </CardIcon>
         
          <Model cars={carsid}/>
          <p className={classes.cardCategory}>Cars Need Maintainance</p>
          <h3 className={classes.cardTitle} style={{color:'red'}}>{totalservices}</h3>
         
        </CardHeader>

      </Card>
    </GridItem>

  
  
</>
          

);
    return (
      <div>
      <GridContainer>
      {body}
      {fuel}
      {warranty}
      </GridContainer>
      <GridContainer>
        <GridItem xs={6} sm={6} md={6}>
        <Card chart>
        <CardHeader color="success">
        <h4 className={classes.cardTitle}>Fuel Cost Overview</h4>
          <p className={classes.cardCategory}></p>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>
        </GridItem>

        <GridItem xs={6} sm={6} md={6}>
        <Card chart>
        <CardHeader color="warning">
        <h4 className={classes.cardTitle}>Parts Purchase Cost Overview</h4>
          <p className={classes.cardCategory}></p>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
        <ChartistGraph
            className="ct-chart"
            data={props.data}
            type="Line"
            options={dailySalesChart.options}
            listener={dailySalesChart.animation}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        <ChartistGraph
            className="ct-chart"
            data={props.bar}
            type="Bar"
            options={partsChart.options}
            listener={partsChart.animation}
          />
        </GridItem>
      </GridContainer>
      </div>
      
    )
  } 
 

