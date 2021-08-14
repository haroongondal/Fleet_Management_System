import React, {Component} from "react";

export default class SignOut extends Component{
    constructor(props) {
        super(props);
        this.state= {
            loggedInStatus: "NOT_LOGGED_IN",
            signoutstate : this.props.location
        }

    }

    handleSuccessfulAuth(data){

        if(!data['data'][0]['username'].includes("admin") && !data['data'][0]['username'].includes("driver")){
            try {
                // alert(data['data'][0]['username']);
                this.setState({loggedInStatus:"LOGGED_IN"})
                this.setState({user:data})
                this.setState({customerid: this.state.user['data'][0]['customerID']})
                localStorage.setItem("customerid",this.state.customerid)
            }
            catch (e){
                console.log(e)
            }
        }
        else
        {
            alert("Login Details incorrect")
        }

    }

    render() {

        if(this.props.location.state.username === "admin"){
            // alert(this.props.location.state.username)
            console.log(this.props.location.state.username)
           localStorage.removeItem("adminid")
            localStorage.removeItem("adminusername")
            window.location.assign("/")
        }
        else if (this.props.location.state.username === "customer"){
            // alert(this.props.location.state.username)
            console.log(this.props.location.state.username)
            localStorage.removeItem("customerid")
            localStorage.removeItem("customerusername")
            window.location.assign("/")

        }
        else if (this.props.location.state.username === "driver"){
            // alert(this.props.location.state.username)
            console.log(this.props.location.state.username)
            localStorage.removeItem("driverid")
            localStorage.removeItem("driverusername")
            window.location.assign("/")

        }
        return(
            <div>
            </div>
        )
    }


}