import React, {Component} from "react";
import Auth from '../Home/Auth';
import {faMap} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Button from "@material-ui/core/Button";
import AppBarCustomer from '../Customer/AppBarCustomer';
import {Redirect} from 'react-router-dom'
export default class GetDriverDetailsForBooking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bookingid: '',
            bookingids : [],
            driverids: [],
            customerID:'',
            did:'',
            dr:'',
            dc:'',
            feedback:false,
            driverdetails: [],
            bookingdetails:[],
            driverID: '',
            username: ''
        }
        this.getBookingIDsForCustomer =this.getBookingIDsForCustomer.bind(this);
        this.getBookingAndDriverDetailsByID = this.getBookingAndDriverDetailsByID.bind(this);
        this.setFeedback = this.setFeedback.bind(this);
    }


    async getDriverIDForBooking(){
        try{

            const driverassignmentresponse = await fetch("https://fmts.herokuapp.com/api/getallassignments?bookingID=" + this.state.bookingid,{method: 'GET'});
            const driverassignmentdetails = await driverassignmentresponse.json();
            // console.log(driverassignmentdetails)
            await this.setState({driverids: driverassignmentdetails})
//              //To save data into state variables
            await this.setState({driverID: this.state.driverids.map((assigndetails)  => assigndetails.driverID)})


        }
        catch (error){
            console.log(error)
        }
    }

    async getBookingAndDriverDetailsByID(){

        try{
            const bookingsresponse =  await fetch("https://fmts.herokuapp.com/api/getbookingbyid?customerID=" + this.state.customerID, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({bookingid: this.state.bookingid})
                // body: bookingid
            })
            const bookingdetails = await bookingsresponse.json()
            // console.log(bookingdetails)
            this.setState({bookingdetails: bookingdetails})

        }
        catch (error){
            console.log(error)
        }

        //To get driverid for a bookingid in the driver assignment schema.
        await this.getDriverIDForBooking()
        //Once we got the driver if then get driver details.
        console.log(this.state.driverid)
        if(this.state.driverid){
            try {
                const driverdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getalldrivers?driverid=" + this.state.driverid, { method: 'GET'});
                const driverdetails = await driverdetailsResponse.json();
                console.log(driverdetails)
                // return vehicledetails
                this.setState({driverdetails : driverdetails})
                this.state.driverdetails.map((ddetails)  =>

                {this.setState({username: ddetails.driverfname + ", " + ddetails.driverlname})
                this.setState({did: ddetails.driverID})
                this.setState({dr: ddetails.driverRating['$numberDecimal']})
                this.setState({dc: ddetails.count})}
                
                )
                
                const username=this.state.username
                await localStorage.setItem('username',username)
                console.log( localStorage.getItem('username'))
            } catch (err) {
                console.error(err);
            }
        }



    }

    async getBookingIDsForCustomer(){
        // let vregnos =[]
        try {
            const bookingResponse = await fetch("https://fmts.herokuapp.com/api/getbookings?customerID=" + this.state.customerID, { method: 'GET'});
            const bookingids = await bookingResponse.json();
            // console.log(bookingids)
            this.setState({bookingids : bookingids})

        } catch (err) {
            console.error(err);
        }
    }


    async componentDidMount() {
        await this.setState({customerID: localStorage.getItem("customerid")})
        this.getBookingIDsForCustomer()
        
       // this.getDriverIDs()
    }
    setFeedback= ()=>{
        this.setState({feedback:true})
    }

    render() {
        if(!localStorage.getItem("customerid")){
            return(<Auth/>)
        }
        let length=this.state.driverdetails.length
        return (
            localStorage.getItem("customerid") ?
                <div class="login-wrapper">
                    {/*<Drawer />*/}
                    {/* */}
                    <AppBarCustomer />
                    <h2>Get Driver Details for Booking</h2>
                    <div>
                        <button value="Get Booking Details" onClick={this.getBookingAndDriverDetailsByID}>Get Booking & Driver Details</button>
                    </div>
                    <br/>
                    {/*<form onSubmit={this.handleSubmit.bind(this)}>*/}
                        <label>
                            <p>Booking ID:</p>
                            {/*<select class="text_input"  onChange={e => this.setState({bookingid: e.target.value})} onSelect={this.getBookingDetailsByID()} >*/}
                            <select class="text_input"  onChange={e => this.setState({bookingid: e.target.value})} aria-required={true} required  >
                                <option value="select booking id" >(Select Booking ID)</option>
                                {this.state.bookingids.map((bookingid) =>
                                    <option value={bookingid.bookingID} >{bookingid.bookingID}</option>)}

                            </select>

                        </label>


                        <label>
                            <p>Driver Name:</p>
                    <select class="text_input"  onChange={e => this.setState({driverid: e.target.value}) } aria-required={true} required >
                        <option value="select driver" >(Select Driver)</option>
                        {this.state.driverids.map((driverid) =>
                            <option value={driverid.driverID} >{driverid.driverName}</option>)}

                    </select>


                        </label>

                        <div>
                            <br/>
                        </div>

                    <div>
                        <br/>

                        <br/>

                    </div>

                    <br/>

                    <div>
                            {(length > 0) 
                                ?   <span>
                                    {console.log('length running')}                              
                                <Button href="/customermap" style={{marginBottom:'20px',marginRight:'20px'}} variant="contained" color="primary">
                                <FontAwesomeIcon icon={faMap} style={{color: 'white',marginRight:'5px'}} />

                                Show Map 
                                </Button>
                                <Button onClick={this.setFeedback} style={{marginBottom:'20px'}} variant="contained" color="primary">
                                <BookmarkBorderIcon style={{color: 'white',marginRight:'5px'}} />Give Feedback </Button>
                                
                            </span> 
                            :   <span>{console.log('length not running')}</span>
                             } 
                        <h2>Booking Details</h2>
                            {(this.state.feedback == true) ? <span><Redirect 
        to={`/feedback/${this.state.did}/${this.state.dr}/${this.state.dc}`} /></span> : <span></span>}
        {console.log('driver id: '+this.state.did)}
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



                                </tr>



                            )}
                        </table>

                    </div>

                    <div>
                        <h2>Driver Details</h2>
                        <table>
                            <tr>
                                <th>Driver ID </th>
                                <th>Driver FirstName</th>
                                <th>Driver LastName</th>
                                <th>Driver Phone No</th>

                            </tr>
                            {this.state.driverdetails.map((ddetails)  =>
                                <tr>
                                    <td> {ddetails.driverID}</td>
                                    <td> {ddetails.driverfname}</td>
                                    <td> {ddetails.driverlname}</td>
                                    <td> {ddetails.driverPhoneNo}</td>
                                    
                                    
                                </tr>



                            )}
                        </table>

                    </div>





                </div> :
                <div></div>
        )
    }

}