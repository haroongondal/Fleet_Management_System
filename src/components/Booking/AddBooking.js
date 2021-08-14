import React from "react";
import Login from "../Login/Login";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser,faBook} from "@fortawesome/free-solid-svg-icons"; 
import { withRouter } from 'react-router';
import AppBarCustomer from '../Customer/AppBarCustomer';
// import ReactSession from 'react-client-session';

 


class AddBooking extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookingid: '',
            vtype:'',
            vregno: '',
            vregnums: [],
            customerID: '',
            dateofrequirement: '',
            dateofreturn: '',
            destination: '',
            pickuppoint: '',
            bookingdate: '',
            vregnos: [],
            result: '',
            min: 1,
            max: 20000,
            loggedInStatus: "NOT_LOGGED_IN",
            user: [],
            availabele:false
        }
        // ReactSession.setStoreType("localStorage");
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signOut = this.signOut.bind(this);
        this.refreshDashboard = this.refreshDashboard.bind(this);
        this.getVehicleRegNum=this.getVehicleRegNum.bind(this);
    }

    async handleSuccessfulAuth(data){


        try {
            if(!data['data'][0]['username'].includes("admin") && !data['data'][0]['username'].includes("driver")){
                try {
                    // alert(data['data'][0]['username']);
                    await this.setState({loggedInStatus:"LOGGED_IN"})
                    await this.setState({user:data})
                    await this.setState({customerid: this.state.user['data'][0]['customerID']})
                    await  localStorage.setItem("customerid",this.state.customerid)
                    await localStorage.setItem("customerusername",this.state.user['data'][0]['userfirstname'] + ", " + this.state.user['data'][0]['userlastname'])
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
        catch (e) {
            alert("Login Details incorrect")
        }


    }

    async saveBooking(bookingdetails) {
        return fetch('https://fmts.herokuapp.com/api/addbooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingdetails)
        })
            .then(data => data.json())
    }
    refreshDashboard() {
        window.location.reload(true);

    }
    async signOut(){


        this.props.history.push("/signout",
            {username: "customer",
                customerid: localStorage.getItem("customerid"),
                customerusername: localStorage.getItem("customerusername")}
        )



    }
    async handleSubmit(e){
        e.preventDefault()
        if(this.state.vregnums[0] == 0){
            alert('please select vehicle');
            return;
        }
        e.preventDefault()
        e.target.reset()
        //Random BookingID
        const min = 1
        const max = 20000
        let bookingid =0
        bookingid = await Math.ceil((min + (Math.random() * (max - min))))
        let rand = Math.round((Math.random()*(this.state.vregnums.length-1)));
        console.log('random: '+rand)
        let vregnos = this.state.vregnums[rand]
        const data = await this.saveBooking(
            {vregno: vregnos,
                bookingid: bookingid,
                customerID: this.state.customerID,
                dateofrequirement:this.state.dateofrequirement,
                dateofreturn: this.state.dateofreturn,
                destination: this.state.destination,
                pickuppoint: this.state.pickuppoint,
                bookingdate: new Date()}
        )
        const dataa = await this.saveVehicle(
            {vregno: vregnos,vreservationstatus: 'Reserved',vtype: this.state.vtype}
        )
        console.log(data)
        alert("Details are saved")
        this.setState({result:"Data Saved successfully"})
        if(data){
            this.setState({result:"Data Saved successfully"})
        }
    }

    async saveVehicle(vehiclereservationdetails) {
        return fetch('https://fmts.herokuapp.com/api/addvehiclereservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehiclereservationdetails)
        })
            .then(data => data.json())
    }
    async getVehicleRegNum(e){
        // let vregnos =[]
        let vtype= e.target.value;
        this.state.vregnos=[0];
        let count=0
        this.setState({vtype: e.target.value})
        try {
            const vehicleResponse = await fetch("https://fmts.herokuapp.com/api/getallvehicles", { method: 'GET'});
            const vehicleregnos = await vehicleResponse.json();
            console.log('vehicleregnos')
           vehicleregnos.map((value)=>{
                if(value['vtype']==vtype){
                  this.state.vregnos[count]=value['vregno'];
                  count=count+1;
                }

        })
            console.log('vregnum running: '+this.state.vregnos)
            this.getVehicleRegNo()
            } catch (err) {
                console.error(err);
                console.log('vregnum error: '+this.state.vregnos)
            }
            // this.setState({vtype: e.target.value})

    }
    async getVehicleRegNo(){
        this.setState({availabele:false})
        let count =0 ;
        this.state.vregnums=[0];
        let vregnoss =this.state.vregnos;
        // console.log('vregnosss: '+vregnoss[2])
        try {
            const vehicleResponse = await fetch("https://fmts.herokuapp.com/api/getavailablevehicleregnos", { method: 'GET'});
            const vehicleregnos = await vehicleResponse.json();
            console.log('vehicleregnos')
           vehicleregnos.map((value)=>{
               for(let i=0;i<vregnoss.length;i++){
                if((value['vregno'] == vregnoss[i])){
                    this.state.vregnums[count]=value['vregno'];
                    this.setState({availabele:true})
                    console.log('if running '+this.state.availabele)
                    // this.setState({vregnums[count]:value['vregno']})
                    count=count+1;   
                }
               }

            })
            console.log('vregnos running: '+this.state.vregnums+" available: "+this.state.availabele)
        } catch (err) {
            console.error(err);
            console.log('vregnos error: '+this.state.vregnums)
        }
    }
    async getVehicleDetailsByID(){
        // let vregnos =[]
        try {
            const vehicledetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallvehicles?vregno=" + this.state.vregno, { method: 'GET'});
            const vehicledetails = await vehicledetailsResponse.json();
            console.log(vehicledetails)
            // return vehicledetails
            this.setState({vehicledetails : vehicledetails})

        } catch (err) {
            console.error(err);
        }
    }
    async componentDidMount() {
        await this.setState({customerID: localStorage.getItem("customerid")})
       
        
    }



    render() {


        if(this.state.loggedInStatus === "NOT_LOGGED_IN" &&  !localStorage.getItem("customerid")){
            return <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        }


        // if(localStorage.getItem("customerid")){
            return (
                localStorage.getItem("customerid")?

                <div class="login-wrapper">
                    

                    <AppBarCustomer    />

                    <h2>Add Booking Details</h2>
                    <br/>
                    <div class="container containerc">
                        <ul>
                            <li>
                                {/*</span>*/}
                                <FontAwesomeIcon
                                    icon={faUser}
                                    inverse
                                    size="2x"
                                    style={{marginRight:'10px',color:'white'}}
                                />
                                    <span style={{fontSize:'20px',color:'white'}}>{localStorage.getItem("customerusername")}</span>
  

                                    <span className="tooltiptext" >

                                    <button class="logbtn"  href ="#" onClick={this.signOut} style={{marginLeft:'10px'}}>
                                        <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            inverse
                                            size="2x"
                                        />
                                    </button>
                                    <span style={{fontSize:'20px',color:'white'}}>Logout</span>  </span>


                            </li>
                        </ul>

                     </div>
                    <form onSubmit={this.handleSubmit}>


                        <label>
                            <p>Select Vehicle Type:</p>

                            <select class="text_input" onChange={e => this.getVehicleRegNum(e)} aria-required={true} required >
                                <option value="select">(Select Vehicle Type)</option>
                                <option value='car'>Car</option>
                                <option value='vagan'>Vagan</option>
                                <option value='bus'>Bus</option>
                            </select>

                        </label>
                        {this.state.vtype != "select" ? <span> {this.state.availabele == false ? <p style={{color:'red'}}>* Selected Vehicle Type not Available Please Select Another One</p> : <span></span>}</span> : <span></span>}
                   
                        <label>
                            <p>Date of Requirement:</p>
                            <input type="date" class="text_input" aria-required={true} required onChange={e => this.setState({dateofrequirement: e.target.value})} />
                        </label>

                        <label>
                            <p>Date of Return:</p>
                            <input type="date" class="text_input" aria-required={true} required onChange={e => this.setState({dateofreturn: e.target.value})} />
                        </label>

                        <label>
                            <p>Destination:</p>
                            <input type="text" class="text_input" aria-required={true} required onChange={e => this.setState({destination: e.target.value})} />
                        </label>

                        <label>
                            <p>Pickup Point:</p>
                            <input type="text" class="text_input" aria-required={true} required onChange={e => this.setState({pickuppoint: e.target.value})} />
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

                </div>
                    :
                    <div>
                        {this.refreshDashboard()}
                    </div>
            )
        // }



    }


}

export default withRouter(AddBooking);