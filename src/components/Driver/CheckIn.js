import React, {Component} from "react";
import Auth from '../Home/Auth';
import axios from 'axios';
import Pusher from 'pusher-js';
import AppBar from './AppBarDriver'

class CheckIn extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookingcheckindetails:[],
            driverassignments:[],
            current_user: ''
        }
    }

    async getAllAssignments(){
        const driverID = localStorage.getItem("driverid")
        const driverassignmentresponse = await fetch("https://fmts.herokuapp.com/api/getallassignments?driverID=" + driverID,{method: 'GET'});
        const driverassignmentdetails = await driverassignmentresponse.json();
        console.log(driverassignmentdetails)
        this.setState({driverassignments:driverassignmentdetails})

    }
    async getAllBookingCheckIn(){
        const driverID = localStorage.getItem("driverid")
        const bookingcheckinresponse = await fetch("https://fmts.herokuapp.com/api/getallbookingcheckin?driverID=" + driverID,{method : 'GET'})
        const bookingcheckindetails = await bookingcheckinresponse.json()
        console.log(bookingcheckindetails)
        this.setState({bookingcheckindetails: bookingcheckindetails})

    }

    componentDidMount() {
        this.getAllBookingCheckIn()
        this.getAllAssignments()
        let pusher = new Pusher('4ed9a1a82fd33a9ba57e', {
            authEndpoint: "https://tracking-mern.herokuapp.com/pusher/auth",
            cluster: "ap1"
          });
  
          this.presenceChannel = pusher.subscribe('presence-channel');
          this.presenceChannel.bind('pusher:subscription_succeeded', members => {
            this.setState({
              current_user: localStorage.getItem("driverusername")
            });
            this.getLocation();

          });
    }

    getLocation = () => {
        if ("geolocation" in navigator) {
          // get the longitude & latitude then update the map center as the new user location
          navigator.geolocation.watchPosition(position => {
            let location = { lat: position.coords.latitude, lng: position.coords.longitude };
    
            axios.post("https://tracking-mern.herokuapp.com/update-location", {
              username: this.state.current_user,
              location: location
            }).then(res => {
              if (res.status === 200) {
                console.log("new location updated successfully");
              }
            });
          })
        } else {
          alert("Sorry, geolocation is not available on your device. You need that to use this app");
        }
      }
      saveBooking =async (bookingdetails) => {
        
        return fetch('https://fmts.herokuapp.com/api/addbooking?bookingID=yes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingdetails)
        })
            .then(data => data.json(),alert('You Checked Out of Your Journey'))
           
            ,window.location.replace('/checkout')
           
    }
      saveCustomer =async (ids) => {
        return fetch('https://fmts.herokuapp.com/api/assigndriver?bookingID=yes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            
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
      async checkOut(){
        const bookingcheckoutresponse = await fetch("https://fmts.herokuapp.com/api/bookingcheckin?bookingid=" + localStorage.getItem('bid') + "&driverid=" + localStorage.getItem('did')+ "&date="+localStorage.getItem('date'),{method: 'POST'})
        let bookingID = localStorage.getItem('bid');
        let driverid = localStorage.getItem('did');
        let vregno =localStorage.getItem('vregno');
        const token = await this.saveCustomer({
          bookingID,driverid
      })
      const dataa = await this.saveVehicle(
        {vregno: vregno,vreservationstatus: 'Not Reserved',vtype: this.state.vtype}
    )
      const data = await this.saveBooking({
            bookingID
            })

    }

    render() {
        if(!(localStorage.getItem("driverid"))){
            return(<Auth/>)
        }
        return(
          
            localStorage.getItem("driverid") ?
                <div>
                  <AppBar />
                <h1 class="h1">You Checked in just now</h1>
                <button 
                   onClick={() => this.checkOut()}>Check Out</button>
                   
            </div> :
                <div>
                      
   
                </div>
              
        )
        
    }
}


export default CheckIn;
