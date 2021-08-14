import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 

class AddFuel extends Component{
    constructor(props) {
        super(props);
        this.state ={
            vregno:'',
            vregnos:[],
            vehicledetails:[],
            totalfuellitre:'',
            priceperlitre:'',
            fuelrechargingdate:'',
            fuelrecharginglocation:'',
            fuelrechargedby:''
        }
        this.getVehicleDetailsByID = this.getVehicleDetailsByID.bind(this)
    }

async saveVehicleFueling(vehiclefuelingdetails){

    return fetch('https://fmts.herokuapp.com/api/vehiclefueling', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiclefuelingdetails)
    })
        .then(data => data.json())
}


    async getVehicleRegNo(){
        // let vregnos =[]
        try {
            const vehicleResponse = await fetch("https://fmts.herokuapp.com/api/getvehicleregnos", { method: 'GET'});
            const vehicleregnos = await vehicleResponse.json();
            // console.log(vehicleregnos)
            this.setState({vregnos : vehicleregnos})

        } catch (err) {
            console.error(err);
        }
    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()

        const min = 1
        const max = 40000
        let fuelid = 0
        fuelid= Math.ceil((min + (Math.random() * (max - min))))
        // alert(fuelid)


        const token = await this.saveVehicleFueling({

            vregno: this.state.vregno,
            fuelid:fuelid,
            totalfuellitre:parseInt(this.state.totalfuellitre),
            priceperlitre:parseFloat(this.state.priceperlitre),
            fuelrechargingdate:this.state.fuelrechargingdate,
            fuelrecharginglocation: this.state.fuelrecharginglocation,
            fuelrechargedby: this.state.fuelrechargedby,


        })

        console.log(token)
        alert("Details are saved")


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


    componentDidMount() {
        this.getVehicleRegNo()
    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <h2> Vehicle Fueling  </h2>

                <div>
                    <button value="Get Vehicle Details" onClick={this.getVehicleDetailsByID}>Get Vehicle Details</button>
                </div>
                <br/>

                <form onSubmit={this.handleSubmit.bind(this)}>

                    <label>
                        <p>Vehicle Registration No:</p>
                        <select class="text_input"  onChange={e => this.setState({vregno: e.target.value}) } aria-required={true} required   >
                            <option value="select vehicle reg no" >(Select Registration No)</option>
                            {this.state.vregnos.map((vregno) =>
                                <option value={vregno.vregno} >{vregno.vregno}</option>)}

                        </select>

                    </label>
                    <br/>

                    <label>
                        <p>Total Fuel In Litre </p>
                        <input  type="number" class="text_input" aria-required={true} required  onChange={event => this.setState({totalfuellitre: event.target.value})} />
                    </label>

                    <label>
                        <p>Price Per Litre </p>
                        <input  type="number" class="text_input" step={0.01} aria-required={true} required  onChange={event => this.setState({priceperlitre: event.target.value})} />
                    </label>

                    <label>
                        <p>Fuel Recharging Date</p>
                        <input type="date" class="text_input" aria-required={true} required onChange={event => this.setState({fuelrechargingdate: event.target.value})} />
                    </label>

                    <label>
                        <p>Fuel Recharging Location</p>
                        <input  type="text" class="text_input" aria-required={true} required onChange={event => this.setState({fuelrecharginglocation: event.target.value})} />
                    </label>

                    <label>
                        <p>Fuel Recharged By</p>
                        <input  type="text" class="text_input" aria-required={true} required onChange={event => this.setState({fuelrechargedby: event.target.value})} />
                    </label>



                    <div>
                        <br/>
                    </div>

                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>

                <div>
                    <h2>Vehicle Details</h2>
                    <table>
                        <tr>

                            <th>Vehicle Reg No </th>
                            <th>Vechicle Make</th>
                            <th>Vechicle Model</th>
                            <th>Vechicle Chessis No</th>
                            <th>Vechicle Engine No</th>
                            <th>Vechicle Type </th>

                        </tr>
                        {this.state.vehicledetails.map((vdetails)  =>
                            <tr>
                                <td> {vdetails.vregno}</td>
                                <td> {vdetails.vmake}</td>
                                <td> {vdetails.vmodel}</td>
                                <td> {vdetails.vchessisno}</td>
                                <td> {vdetails.vengineno}</td>
                                <td> {vdetails.vtype}</td>

                            </tr>



                        )}
                    </table>

                </div>
            </div> :
                <div></div>
        )
    }
}
export default AddFuel;