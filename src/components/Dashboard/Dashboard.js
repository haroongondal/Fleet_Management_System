import React from 'react';
import Login from "../Login/Login";
import { withRouter } from 'react-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Drawer from "../Drawer/Drawer";
import {
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
} from '@fortawesome/free-solid-svg-icons'
import DashboardAnalytics from "./DashboardAnalytics";

library.add(
    fab,
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
)

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            loggedInStatus:"NOT_LOGGED_IN",
            user: {},
            color: "yellow",
            dropdownOpen: true,
            top: 10,
            signOut: false
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.signOut = this.signOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.refreshDashboard = this.refreshDashboard.bind(this);
        
    }

    refreshDashboard() {
        window.location.reload(true);

    }


    async handleClick(event) {  // switch the value of the showModal state
        alert("Sign out was clicked")
        await this.setState({
            signOut: !this.state.signOut
        });
        alert(this.state.signOut)
    }
    async signOut(){


        this.props.history.push("/signout",
            {username: "admin",
            adminid: localStorage.getItem("adminid"),
            adminusername: localStorage.getItem("adminusername")}
        )



    }


    changeParagraphColor(){
        this.setState({backgroundcolor: "yellow"})
    }

   async handleSuccessfulAuth(data){



       try{
           if(data['data'][0]['username'].includes("admin")){
               try{
                   await  this.setState({loggedInStatus:"LOGGED_IN"})
                   await this.setState({user:data})
                   await localStorage.setItem("adminid",this.state.user['data'][0]['customerID'])
                   await localStorage.setItem("adminusername",this.state.user['data'][0]['userfirstname'] + ", " + this.state.user['data'][0]['userlastname'])
               }
               catch (e) {
                   console.log(e)
               }
           }
           else{
               alert("Login details incorrect")
           }
       }
       catch (e){
           alert("Login details incorrect")
       }


    }
    render() {

        if(this.state.loggedInStatus === "NOT_LOGGED_IN" && !localStorage.getItem("adminid")){
            return <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        }

            return(
                localStorage.getItem("adminid") ?
                <div>

                     <div class="mainTitle"> Dashboard Analytics  </div>
                    
                    <DashboardAnalytics />
                    
                    <Drawer />


                </div> :

                    <div>

                        {this.refreshDashboard()}

                    </div>



                    )


        }





    // }
}

export default withRouter(Dashboard);