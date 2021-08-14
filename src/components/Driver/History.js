import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from '../Drawer/Drawer'
class CheckOut extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookingcheckoutdetails:[]
        }
    }


    async getAllBookingCheckOut(){
        const bookingcheckoutresponse = await fetch("https://fmts.herokuapp.com/api/getallbookingcheckin",{method : 'GET'})
        const bookingcheckoutdetails = await bookingcheckoutresponse.json()
        console.log(bookingcheckoutdetails)
        this.setState({bookingcheckoutdetails: bookingcheckoutdetails})

    }

    componentDidMount() {
        this.getAllBookingCheckOut()
    }

    render() {
        
        if(!(localStorage.getItem("adminid"))){
            return(<Auth/>)
        }
        return(
            
            localStorage.getItem("driverid") || localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                <h2>Check In/Out History</h2>
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
            </div> :
                <div></div>
        )
    }
}

export default CheckOut;