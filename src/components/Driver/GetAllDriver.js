import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 


class GetAllDriver extends Component{
constructor(props) {
    super(props);
    this.state={
        driverdetails :[]
    }
}

async   getAllDriver(){
    try {
        const driverdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getalldrivers", { method: 'GET'});
        const driverdetails = await driverdetailsResponse.json();
        console.log(driverdetails)
        // return vehicledetails
        this.setState({driverdetails : driverdetails})

    } catch (err) {
        console.error(err);
    }

}


componentDidMount() {
    this.getAllDriver()
}

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <h2>Get All Drivers</h2>
                <table>
                    <tr>
                        <th>Driver ID </th>
                        <th>Driver FirstName</th>
                        <th>Driver LastName</th>
                        <th>Driver Phone No</th>
                        <th>Driver Rating</th>
                        <th>Driver Satus</th>
                    </tr>
                    {this.state.driverdetails.map((ddetails)  =>
                        <tr>
                            <td> {ddetails.driverID}</td>
                            <td> {ddetails.driverfname}</td>
                            <td> {ddetails.driverlname}</td>
                            <td> {ddetails.driverPhoneNo}</td>
                            <td> {ddetails['driverRating']['$numberDecimal']}</td>
                            <td> {ddetails.status}</td>



                        </tr>



                    )}
                </table>

            </div> :
                <div></div>
        )
    }
}

export default GetAllDriver;