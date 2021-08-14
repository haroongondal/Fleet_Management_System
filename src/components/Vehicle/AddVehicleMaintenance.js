import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 

class AddVehicleMaintenance extends Component{

    constructor(props) {
        super(props);
        this.state ={
            vregno:'',
            vregnos:[],
            partid:'',
            partids:[],
            partreplacementdate:'',
            partreplacementlocation:'',
            vehicledetails:[],
            partdetails:[]
        }
        this.getVehicleAndPartDetailsByID = this.getVehicleAndPartDetailsByID.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
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
 async getPartIDs(){
     try {
         const PartIDResponse = await fetch("https://fmts.herokuapp.com/api/getallparts?partID=YES", { method: 'GET'});
         const partIDs = await PartIDResponse.json();
         // console.log(vehicleregnos)
         this.setState({partids : partIDs})

     } catch (err) {
         console.error(err);
     }

 }
    async getVehicleAndPartDetailsByID(){
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

        try {
            const partdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallparts?partID=" + this.state.partid, { method: 'GET'});
            const partdetails = await partdetailsResponse.json();
            console.log(partdetails)
            // return vehicledetails
            this.setState({partdetails : partdetails})

        } catch (err) {
            console.error(err);
        }
    }

    async saveVehicleMaintenance(vehiclemaintenancedetails){
        return fetch('https://fmts.herokuapp.com/api/addvehiclemaintenance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehiclemaintenancedetails)
        })
            .then(data => data.json())
    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()

        const min = 1
        const max = 60000
        let vehiclemaintenanceid = 0
        vehiclemaintenanceid= Math.ceil((min + (Math.random() * (max - min))))
        // alert(vehiclemaintenanceid)


        const token = await this.saveVehicleMaintenance({

            vregno: this.state.vregno,
            vehiclemaintenanceid:vehiclemaintenanceid,
            partid:this.state.partid,
            partreplacementdate:this.state.partreplacementdate,
            partreplacementlocation:this.state.partreplacementlocation



        })

        console.log(token)
        alert("Details are saved")
    }

    componentDidMount() {
        this.getVehicleRegNo()
        this.getPartIDs()
    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <h2> Vehicle Maintenance  </h2>

                <div>
                    <button value="Get Vehicle and Part Details" onClick={this.getVehicleAndPartDetailsByID}>Get Vehicle and Part Details</button>
                </div>
                <br/>

                <form onSubmit={this.handleSubmit.bind(this)}>

                    <label>
                        <p>Vehicle Registration No:</p>
                        <select class="text_input"  onChange={e => this.setState({vregno: e.target.value}) }  >
                            <option value="select vehicle reg no" >(Select Registration No)</option>
                            {this.state.vregnos.map((vregno) =>
                                <option value={vregno.vregno} >{vregno.vregno}</option>)}

                        </select>

                    </label>
                    <br/>

                    <label>
                        <p>Part ID</p>
                        <select class="text_input"  onChange={e => this.setState({partid: e.target.value}) }  >
                            <option value="select part id" >(Select Part ID )</option>
                            {this.state.partids.map((partid) =>
                                <option value={partid.partID} >{partid.partID}</option>)}

                        </select>

                    </label>
                    <br/>

                    <label>
                        <p>Part Replacement Date </p>
                        <input type="date" class="text_input" onChange={event => this.setState({partreplacementdate: event.target.value})} />
                    </label>

                    <label>
                        <p>Part Replacement Location </p>
                        <input  type="text" class="text_input" onChange={event => this.setState({partreplacementlocation: event.target.value})} />
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

                <div>
                    <h2>Part Details</h2>
                    <table>
                        <tr>

                            <th>Vendor ID </th>
                            <th>Part ID</th>
                            <th>Part Name</th>
                            <th>Part Cost</th>
                            <th>Part Purchase Date</th>
                            <th>Part Warranty Start Date</th>
                            <th>Part Warranty End Date</th>
                            <th>Part Purchased By</th>


                        </tr>
                        {this.state.partdetails.map((pdetails)  =>
                            <tr>
                                <td> {pdetails.vendorID}</td>
                                <td> {pdetails.partID}</td>
                                <td> {pdetails.partname}</td>
                                <td> {pdetails.partcost}</td>
                                <td> {pdetails.purchasedate}</td>
                                <td> {pdetails.warrantystartdate}</td>
                                <td> {pdetails.warrantyenddate}</td>
                                <td> {pdetails.purchasedby}</td>

                            </tr>



                        )}
                    </table>

                </div>

            </div> :
                <div></div>
        )
    }

}
export default AddVehicleMaintenance;