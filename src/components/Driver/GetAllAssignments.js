import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";

class GetAssignments extends Component{
    constructor(props) {
        super(props);
        this.state ={
            driverassignments:[],
            current_user: ''
        }
    }

    async getAllAssignments(){
        const driverassignmentresponse = await fetch("https://fmts.herokuapp.com/api/getallassignments",{method: 'GET'});
        const driverassignmentdetails = await driverassignmentresponse.json();
        console.log('response running');
        console.log(driverassignmentdetails)
        this.setState({driverassignments:driverassignmentdetails})

    }

    componentDidMount() {
        this.getAllAssignments()
    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                <h2>See Assignments</h2>
                <>
                                
                                <table>
                                    
                                <tr>
                                    <th>Driver ID </th>
                                    <th>Booking ID</th>
                                    <th>Assignment Date</th>
                                    <th>Pickup location</th>
                                    <th>Drop location</th>
                                    <th>Status</th>
            
                                </tr>
                        {this.state.driverassignments.map((dassigndetails)  => {
                        
                            return(

                                <tr>
                                <td > {dassigndetails.driverID}</td>
                                <td > {dassigndetails.bookingID}</td>
                                <td > {dassigndetails.assignmentdate}</td>
                                <td > {dassigndetails.pickupLocation}</td>
                                <td > {dassigndetails.dropLocation}</td>
                                <td > {dassigndetails.status}</td>
                            </tr>

                            )
  
                    }
            )
            }
                          </table>
            </>  
                <Drawer />
            </div> :
                <div></div>
        )
    }
}

export default GetAssignments;