import React, {Component} from 'react'
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 



class GetAllVehicle extends Component{
    constructor(props) {
        super(props);
        this.state={
            vehicledetails :[]
        }

    }

    async getVehicleDetails(){
        // let vregnos =[]
        try {
            const vehicledetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallvehicles", { method: 'GET'});
            const vehicledetails = await vehicledetailsResponse.json();
            console.log(vehicledetails)
            // return vehicledetails
            this.setState({vehicledetails : vehicledetails})

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getVehicleDetails()
    }


    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <h2>Get All Vehicles</h2>
                <table>
                    <tr>
                        <th>Registraton Number </th>
                        <th>Vehicle Company</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Chesis No</th>
                        <th>Vehicle Engine No</th>
                        <th>Vehicle Type</th>
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
                {/*<p>{this.state.vehicledetails.map(vdetails => vdetails.vregno)}</p>*/}
            </div> :
                <div></div>
        )
    }
}

export default GetAllVehicle;

