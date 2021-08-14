import React, { Component} from "react";

import "./App.css";

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../src/components/Login/Login'
import Dashboard from '../src/components/Dashboard/Dashboard';
import Register from "../src/components/Register/Register";
// import ManageVehicle from "../src/components/AddVehicle/AddVehicle"
import AddVehicle from "./components/Vehicle/AddVehicle";
import AddDriver from "./components/Driver/AddDriver";
import AddCustomer from "./components/Customer/AddCustomer";
import AddVehicleReservation from "./components/Vehicle/AddVehicleReservation";
import AddBooking from "./components/Booking/AddBooking";
import AssignDriver from "./components/Driver/AssignDriver"
import GetAllVehicle from "./components/Vehicle/GetAllVehicle"
import GetAllDriver from "./components/Driver/GetAllDriver"
import ViewBooking from "./components/Booking/ViewBooking"
import DriverDashboard from "./components/Dashboard/DriverDashboard";
import GetAssignments from "./components/Driver/GetAssignments";
import CheckIn from "./components/Driver/CheckIn"
import CheckOut from "./components/Driver/CheckOut"
import AddVendor from "./components/Vendor/AddVendor"

import GetAllVendor from "./components/Vendor/GetAllVendor";
import DashboardAnalytics from "./components/Dashboard/DashboardAnalytics"
import AddPartsPurchase from "./components/Vendor/AddPartsPurchase"
import VehicleFueling from "./components/Vehicle/AddFuel"
import VehicleMaintenance from "./components/Vehicle/AddVehicleMaintenance";

import AddFuelBudget from "./components/Budget/AddFuelBudget";
import GetAllCustomer from "./components/Customer/GetAllCustomer";
import SignOut from "./components/SignOut/SignOut";
import LoginPage from "./components/Login/LoginPage";
import EditCustomer from "./components/Customer/EditCustomer";
import EditDriver from "./components/Driver/EditDriver";
import EditMyDriver from "./components/Driver/EditMyDriver";
import GetDriverDetailsForBooking from "./components/Customer/GetDriverDetailsForBooking";
import Updatebudget from "./components/Budget/UpdateBudget"
import MaintenanceRecord from "./components/Vehicle/MaintenanceHistory"
import AdminMap from "./components/Map/AdminMap"
import CustomerMap from "./components/Map/CustomerMap"
import Home from "./components/Home/Home"
import History from "./components/Driver/History"
import GetAllAssignments from './components/Driver/GetAllAssignments'
import Feedback from './components/Customer/Feedback'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

      }

    handleSuccessfulAuth(data){
    //   alert(data['token'])
        // console.log(data)

        if(data['token'] === "admin"){
            // alert(data['token'])


            window.location.replace("/dashboard")


        //
        }
        else if(data['token'] === "driver"){
            // this.setState({loggedInStatus : "LOGGED_IN"})
            // alert(data['token'])
            window.location.replace("/driverdashboard")

        }
        else{
            // this.setState({loggedInStatus : "LOGGED_IN"})
            window.location.replace("/addbooking")

        }


    }

    render() {

      return (
          <div >
              

              <BrowserRouter>

                  <Switch>

                      <Route exact path = "/addfuelbudget">
                          <AddFuelBudget />
                      </Route>
                    <Route exact path = "/updatebudget">
                          <Updatebudget />
                      </Route>

                      <Route path = "/customermap">
                          <CustomerMap />
                      </Route>
                      {/* <Route path = "/feedback/:driverID">
                          <Feedback />
                      </Route> */}
                      <Route exact path="/feedback/:driverID/:driverRating/:count" component={Feedback} />
                      <Route exact
                             path="/dashboard"
                             render = {props => (
                                 <Dashboard { ... props} loggedInStatus={this.state.loggedInStatus} />
                             )} />

                      <Route path="/dashboardanalytics" >
                          <DashboardAnalytics />
                      </Route>
                      <Route exact
                             path="/register"
                             render = {props => (
                                 <Register { ... props}  handleSuccessfulAuth={this.handleSuccessfulAuth} />
                             )} />


                      <Route path = "/login" >
                          <Login />
                      </Route>

                      <Route path = "/loginpage" >
                          <LoginPage />
                      </Route>




                      <Route path="/addvehicle" >
                          <AddVehicle />
                      </Route>
                      <Route path={"/getallvehicle"}>
                          <GetAllVehicle />
                      </Route>
                      <Route path="/addvehiclereservation" >
                          <AddVehicleReservation />
                      </Route>
                      <Route path ="/vehiclefueling" >
                          <VehicleFueling />
                      </Route>
                      <Route path ="/vehiclemaintenance">
                          <VehicleMaintenance />
                      </Route>
                     <Route path ="/maintenancerecord">
                          <MaintenanceRecord />
                      </Route>
                      <Route path="/adddriver" >
                          <AddDriver />
                      </Route>

                      <Route path ="/editdriver" >
                          <EditDriver />
                      </Route>

                      <Route path ="/editmydriver" >
                          <EditMyDriver />
                      </Route>
                      <Route path="/getassignment" >
                          <GetAssignments />
                      </Route>
                      <Route path="/checkin" >
                          <CheckIn />
                      </Route>
                      <Route path="/checkout" >
                          <CheckOut />
                      </Route>
                      <Route exact
                             path="/driverdashboard"
                             render = {props => (
                                 <DriverDashboard { ... props} loggedInStatus={this.state.loggedInStatus} />
                             )} />




                      <Route path="/assigndriver" >
                          <AssignDriver />
                      </Route>
                      <Route path="/assignments" >
                          <GetAllAssignments />
                      </Route>
                      <Route path={"/getalldriver"}>
                          <GetAllDriver />
                      </Route>
                      <Route path={"/History"}>
                          <History />
                      </Route>
                      <Route path="/addcustomer" >
                          <AddCustomer />
                      </Route>

                      <Route path ="/editcustomer" >
                          <EditCustomer />
                      </Route>

                      <Route path ="/getallcustomers" >
                          <GetAllCustomer />
                      </Route>
                      <Route path="/addvendor">
                          <AddVendor />
                      </Route>
                      <Route path="/getallvendors">
                          <GetAllVendor />
                      </Route>
                      <Route path ="/partspurchase">
                          <AddPartsPurchase />
                      </Route>

                      <Route path="/addbooking" >
                          <AddBooking />
                      </Route>
                      <Route path ="/getdriverdetails">
                          <GetDriverDetailsForBooking />
                      </Route>
                      <Route path="/viewbooking" >
                          <ViewBooking />
                      </Route>
                      <Route path="/showmap" >
                          <AdminMap />
                      </Route>
                      <Route path ="/signout" component={SignOut} />
                        <Home />





                  </Switch>

              </BrowserRouter>



          </div>

    );
  }
}

export default App;
