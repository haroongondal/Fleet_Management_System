import React, {Component} from "react";
import Login from "../Login/Login"; 
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import AppBarDriver from "../Driver/AppBarDriver";

import ReactNotifications from 'react-browser-notifications';

 

class DriverDashboard extends Component{
    constructor(props) {
        super(props);
        this.showNotifications = this.showNotifications.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state ={
            loggedInStatus:"NOT_LOGGED_IN",
            user: {},
            driverassignments:[]
        }
        this.timeout = null;
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.signOut = this.signOut.bind(this);


    }
    componentDidMount(){
        this.getAllAssignments();
        
    }
    showNotifications() {

        if(this.n.supported()) this.n.show();
      }
    
      handleClick(event) {

        this.n.close(event.target.tag);
      }
      async getAllAssignments(){
        const driverID = localStorage.getItem("driverid")
        const driverassignmentresponse = await fetch("https://fmts.herokuapp.com/api/getallassignments?driverID=" + driverID,{method: 'GET'});
        const driverassignmentdetails = await driverassignmentresponse.json();
        console.log(driverassignmentdetails)
        this.setState({driverassignments:driverassignmentdetails})

    }
    async handleSuccessfulAuth(data){


        // if(data.length > 0){

        try{
            if(data['data'][0]['username'].includes("driver")){
                try{
                    // alert(data['data'][0]['username']);
                    await this.setState({loggedInStatus:"LOGGED_IN"})
                    await this.setState({user:data})
                    // this.setState({customerid: this.state.user['data'][0]['customerID']})
                    await localStorage.setItem("driverid",this.state.user['data'][0]['customerID'])
                    await localStorage.setItem("driverusername",this.state.user['data'][0]['userfirstname'] + ", " + this.state.user['data'][0]['userlastname'])
                    // console.log(this.state.user['data'][0])
                    window.location.replace('/driverdashboard');
                }
                catch (e) {
                    console.log(e)
                }
            }
            else{
                alert("Login details incorrect")
            }
        }
        catch (e) {
            alert("Login details incorrect")
        }



    }

    async signOut(){

        this.props.history.push("/signout",
            {username: "driver",
                driverid: localStorage.getItem("driverid"),
                driverusername: localStorage.getItem("driverusername")}
        )



    }
    render() {

        if(this.state.loggedInStatus === "NOT_LOGGED_IN" && !localStorage.getItem("driverid") ){
            return <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        }

        return(

            <div>
    { this.state.driverassignments.map((value) => {
        console.log('notification: '+value)
                                return (
                                    <>
                                    {this.showNotifications()}
    
                                    </>
                                )
                        })
                        }
        <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Driver!" // Required
          body="You have assignments kindly visit portal"
          icon="icon.png"
          tag="abcdef"
          timeout="2000"
          onClick={event => this.handleClick(event)}
        />
        
            
        
                  <div class="container">

                        <ul>
                            <li>

                                <FontAwesomeIcon
                                    icon={faUser}
                                    inverse
                                    size="2x"
                                    style={{marginRight:'10px'}}
                                />

                                <span style={{fontSize:'20px',color:'white'}}>{localStorage.getItem("driverusername")}</span>


                                    <span className="tooltiptext" >

                                    <button class="logbtn"  href ="#" onClick={this.signOut} style={{marginLeft:'10px'}}>
                                        {/*    <button onClick={<SignOut adimusername={this.props.user}/>}>*/}
                                        <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            inverse
                                            size="2x"
                                        />
                                        {/*</button>*/}
                                    </button>
                                    <span style={{fontSize:'20px',color:'white'}}>Logout</span>  </span>


                            </li>
                        </ul>

                 </div>
                <AppBarDriver />

                <div class="banner_main" >
         <div class="row">
         <div class="column">
         <div class="text-bg text-d">
                     <h1>Fleet Management</h1> <h1>And Tracking</h1>
                     <span>Under Your Own Board</span>
                     <p>Probably the smart Software to capture, track and control your fleet's maintenance and airworthiness in real time. </p>
         </div>
         </div>
         <div class="column">
         <div class="text-img">
                     <figure><img src="./images/img.png" /></figure>
                  </div>
         </div>
</div> 
      </div>
            </div>   
            )
    }
}

export default DriverDashboard;