import React, {Component} from "react";
import Auth from '../Home/Auth';
import AppBar from "../Driver/AppBarDriver";

class CheckOut extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookingcheckoutdetails:[]
        }
    }


    async getAllBookingCheckOut(){
        const driverID = localStorage.getItem("driverid")
        const bookingcheckoutresponse = await fetch("https://fmts.herokuapp.com/api/getallbookingcheckin?driverID=" + driverID,{method : 'GET'})
        const bookingcheckoutdetails = await bookingcheckoutresponse.json()
        console.log(bookingcheckoutdetails)
        this.setState({bookingcheckoutdetails: bookingcheckoutdetails})

    }

    componentDidMount() {
        this.getAllBookingCheckOut()
    }

    render() {
        
        if(!(localStorage.getItem("driverid"))){
            return(<Auth/>)
        }
        return(
            
             localStorage.getItem("driverid")  ?
                <div>
                <h2 class="h2">Check In/Out History</h2>
                <table>
                    <tr>
                        <th>Driver ID </th>
                        <th>Booking ID</th>
                        <th>Booking Check In Date</th>
                        <th>Booking Check Out Date</th>


                    </tr>
                    {this.state.bookingcheckoutdetails.map((bcheckoutdetails)  =>
                        <tr>
                            <td> {bcheckoutdetails.driverID}</td>
                            <td> {bcheckoutdetails.bookingID}</td>
                            <td> {bcheckoutdetails.checkindate}</td>
                            <td> {bcheckoutdetails.checkoutdate}</td>

                        </tr>

                    )}
                </table>
                <AppBar />
            </div> :
                <div></div>
        )
    }
}

export default CheckOut;