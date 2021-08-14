import React, {Component} from "react";
import Drawer from "../Drawer/Drawer";
 


class ViewBooking extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookingdetails:[]
        }
    }

    async getAllBooking(){
        try {
            const bookingdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallbookings", { method: 'GET'});
            const bookingdetails = await bookingdetailsResponse.json();
            console.log(bookingdetails)
            // return vehicledetails
            this.setState({bookingdetails : bookingdetails})

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getAllBooking()
    }


    render() {
        return(
            localStorage.getItem("adminid") ?
            <div class="login-wrapper">
                <Drawer />
                 
                <h2>View All Booking</h2>
                <table>
                    <tr>
                        <th>Customer ID </th>
                        <th>Vehicle Registration No</th>
                        <th>Booking ID</th>
                        <th>Date of Requirement</th>
                        <th>Date of Return</th>
                        <th>Pickup Point</th>
                        <th>Destination</th>
                        <th>Booking Date</th>
                        <th>Booking Status</th>

                    </tr>
                    {this.state.bookingdetails.map((bdetails)  =>
                        <tr>
                            <td> {bdetails.customerID}</td>
                            <td> {bdetails.vregno}</td>
                            <td> {bdetails.bookingID}</td>
                            <td> {bdetails.dateofrequirement}</td>
                            <td> {bdetails.dateofreturn}</td>
                            <td> {bdetails.pickuppoint}</td>
                            <td> {bdetails.destination}</td>
                            <td> {bdetails.bookingdate}</td>
                            <td> {bdetails.status}</td>



                        </tr>



                    )}
                </table>

            </div> :
                <div>Admin not Logged in</div>
        )
    }
}

export default ViewBooking;