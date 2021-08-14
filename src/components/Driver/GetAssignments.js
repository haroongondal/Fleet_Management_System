import React, {Component} from "react";
import Auth from '../Home/Auth';
import AppBar from "../Driver/AppBarDriver";

class GetAssignments extends Component{
    constructor(props) {
        super(props);
        this.state ={
            driverassignments:[],
            current_user: ''
        }
        this.checkIn = this.checkIn.bind(this)
    }

    async getAllAssignments(){
        const driverID = localStorage.getItem("driverid")
        const driverassignmentresponse = await fetch("https://fmts.herokuapp.com/api/getallassignments?driverID=" + driverID,{method: 'GET'});
        const driverassignmentdetails = await driverassignmentresponse.json();
        console.log(driverassignmentdetails)
        this.setState({driverassignments:driverassignmentdetails})

    }

    async checkIn(driverid,bookingid,vregno){
        const date=new Date();
        localStorage.setItem('date',date)
        localStorage.setItem('bid',bookingid);
        localStorage.setItem('did',driverid);
        localStorage.setItem('vregno',vregno);
        window.location.replace('/checkin')
    }


    componentDidMount() {
        this.getAllAssignments()
    }

    render() {
        if(!localStorage.getItem("driverid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("driverid") ?
                <div>
                <h2 class="h2">See Assignments</h2>

                    {this.state.driverassignments.map((dassigndetails)  => {
                        
                        if(dassigndetails.status == 'not-finished'){
                            return(
                                <>
                                
                                <table>
                                    
                                <tr>
                                    <th>Driver ID </th>
                                    <th>Booking ID</th>
                                    <th>Vehicle Reg.no </th>
                                    <th>Assignment Date</th>
                                    <th>Pickup location</th>
                                    <th>Drop location</th>
                                    <th>Action</th>
            
                                </tr>
                                <tr>
                                <td > {dassigndetails.driverID}</td>
                                <td > {dassigndetails.bookingID}</td>
                                <td > {dassigndetails.vregno}</td>
                                <td key={dassigndetails.assignmentdate.toString()}> {dassigndetails.assignmentdate}</td>
                                <td > {dassigndetails.pickupLocation}</td>
                                <td > {dassigndetails.dropLocation}</td>
                                <td >
                                    <button key={dassigndetails.driverID} value={dassigndetails.driverID.toString()}
                                            onClick={() => this.checkIn(dassigndetails.driverID.toString(),dassigndetails.bookingID.toString(),dassigndetails.vregno.toString())}>
                                        Check In
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </>
                            )
  
                        }

                    }
                    )}
                
                <AppBar />
            </div> :
                <div></div>
        )
    }
}

export default GetAssignments;