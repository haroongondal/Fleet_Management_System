import React from 'react';
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 

class AddVehicleReservation extends React.Component{

    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);

        this.state ={
            vregno: '',
            vregnos: [],
            vreservationstatus: 'Not Reserved',
            vtype: '',
            result:'',
            vehicledetails:[]

        }
        // this.getVehicleTypeByRegNo = this.getVehicleTypeByRegNo.bind(this)
        this.getVehicleDetailsByID = this.getVehicleDetailsByID.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset();
        let vehicletype =''

        await this.getVehicleDetailsByID();
        this.state.vehicledetails.map((value) => vehicletype = value['vtype'])

        const data = await this.saveVehicle(
            {vregno: this.state.vregno,vreservationstatus: this.state.vreservationstatus,vtype: vehicletype}
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


    async getVehicleDetailsByID(){
        // let vregnos =[]
        try {
            const vehicledetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallvehicles?vregno=" + this.state.vregno, { method: 'GET'});
            const vehicledetails = await vehicledetailsResponse.json();
            console.log(vehicledetails)
            // return vehicledetails
            this.setState({vehicledetails : vehicledetails})
            console.log(this.state.vehicledetails)

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getVehicleRegNo()
    }


// displayResult(){
//         return
//             <div>
//                 <p>{this.state.result}</p>
//             </div>
// }

    displayVehicleRegNo(vregnos){
        //console.log(vregnos[0])
        if(!vregnos.length) return  null;

        return vregnos.map((vregno) => (
            <div>

                    <option value={vregno.vregno} >{vregno.vregno}</option>


            </div>

        ))


    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }

            return(
                localStorage.getItem("adminid") ?
                    <div className="login-wrapper">
                        <Drawer />
                         
            <h1>Vehicle Reservation Details</h1>
            <div>
                <button value="Get Vehicle Details" onClick={this.getVehicleDetailsByID}>Get Vehicle Details</button>
            </div>
            <br/>
            <form onSubmit={this.handleSubmit.bind(this)}>


                <label>
                    <p>Vehicle Registration No:</p>
                    <select class="text_input"  onChange={e => this.setState({vregno: e.target.value}) } aria-required={true} required  >
                        <option value="select vehicle reg no" >(Select Registration No)</option>
                        {this.state.vregnos.map((vregno) =>
                            <option value={vregno.vregno} >{vregno.vregno}</option>)}

                    </select>

                </label>
            <br/>
                <label>
                    <p>Vehicle Reservation Status:</p>
                    <select class="text_input" onChange={e => this.setState({vreservationstatus: e.target.value})} aria-required={true} required >
                        <option value="Select Reservation Status">(Select Reservation Status)</option>
                        <option value="Not Reserved">Not Reserved</option>
                        <option value="Reserved">Reserved</option>
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

export default AddVehicleReservation