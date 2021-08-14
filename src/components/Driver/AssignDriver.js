import React from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 


class AssignDriver extends React.Component{

    constructor(prop) {
        super(prop);
        this.state ={
            driverid: '',
            bookingids: [],
            bookingid:'',
            assignmentdate:'',
            driverids:[],
            bookingdetails:[],
            driverdetails:[],
            pickupLocation:''
        }
        this.getBookingAndDriverDetailsByID = this.getBookingAndDriverDetailsByID.bind(this)
    }

    async saveDriverAssignment(driverAssignDetails) {
        return fetch('https://fmts.herokuapp.com/api/assigndriver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverAssignDetails)
        })
            .then(data => data.json())
           
    }

    async handleSubmit(e){
        e.preventDefault()
        
        await this.getBookingAndDriverDetailsByID()
        e.target.reset()
        let driverName=''
        let destination=''
        let location=''
        let vregno=''
        this.state.bookingdetails.map(value =>{
            destination = value.destination;
            location = value.pickuppoint;
            vregno = value.vregno;
            // this.setState({pickupLocation:value['pickuppoint']})
            console.log('pickup point: '+location)
        })
        this.state.driverids.map(value =>{
            if(value.driverID == this.state.driverid){
                driverName = value.driverfname
            }
        })

        const data = await this.saveDriverAssignment(

            {driverid: this.state.driverid,
                driverName: driverName,
                vregno: vregno,
                bookingid: this.state.bookingid,
                pickupLocation: location,
                dropLocation: destination,
                assignmentdate: new Date(),
                },

        )
        console.log(data)
        alert("Details are saved")
        this.setState({result:"Data Saved successfully"})

    }

    async getBookingIDs(){
        // let vregnos =[]
        try {
            const bookingResponse = await fetch("https://fmts.herokuapp.com/api/getbookings", { method: 'GET'});
            const bookingids = await bookingResponse.json();
            // console.log(bookingids)
            this.setState({bookingids : bookingids})

        } catch (err) {
            console.error(err);
        }
    }

    async getDriverIDs(){
        // let vregnos =[]
        try {
            const driverResponse = await fetch("https://fmts.herokuapp.com/api/getdriverids", { method: 'GET'});
            const driverids = await driverResponse.json();
            // console.log(driverids)
            this.setState({driverids : driverids})

        } catch (err) {
            console.error(err);
        }
    }
    async getBookingAndDriverDetailsByID(){

        try{
            const bookingsresponse =  await fetch("https://fmts.herokuapp.com/api/getbookingbyid?bookingid=" + this.state.bookingid, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({bookingid: this.state.bookingid})

            })
            const bookingdetails = await bookingsresponse.json()

            this.setState({bookingdetails: bookingdetails})

        }
        catch (error){
            console.log(error)
        }
        // console.log(this.state.driverid)
        try {
            const driverdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getalldrivers?driverid=" + this.state.driverid, { method: 'GET'});
            const driverdetails = await driverdetailsResponse.json();

            this.setState({driverdetails : driverdetails})

        } catch (err) {
            console.error(err);
        }

}


    componentDidMount() {
        this.getBookingIDs()
        this.getDriverIDs()
    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return (
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <h2>Assign Driver</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
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
                            <option value={driverid.driverID} >{driverid.driverfname}</option>)}

                    </select>

                </label>

                <div>
                    <br/>
                </div>

                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
                <div>
                    <br/>

                    <br/>

                </div>

                <div>
                    <button value="Get Booking Details" onClick={this.getBookingAndDriverDetailsByID}>Get Booking & Driver Details</button>
                </div>
                <br/>

                {/*<div>*/}
                {/*    <button value="Get Driver Details" onClick={this.getDriverDetailsByID}>Get Driver Details</button>*/}
                {/*</div>*/}

                <div>
                    <h2>Booking Details</h2>
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

export default AssignDriver;