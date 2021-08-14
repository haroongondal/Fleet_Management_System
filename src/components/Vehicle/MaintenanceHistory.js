import React, {Component} from 'react'
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 



class GetAllVehicle extends Component{
    constructor(props) {
        super(props);
        this.state={
            maintenancedetails :[]
        }

    }

    async getmaintenancedetails(){
        // let vregnos =[]
        try {
            const maintenancedetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallmaintenance", { method: 'GET'});
            console.log('maintenancedetail 1')
            const maintenancedetails = await maintenancedetailsResponse.json();
            console.log('maintenancedetailse 2')
            // return maintenancedetails
            this.setState({maintenancedetails : maintenancedetails})

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getmaintenancedetails()
    }


    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <h2>Maintenance History of Vehicles</h2>
                <table>
                    <tr>
                        <th>Vehicle Registraton Number </th>
                        <th>Part ID</th>
                        <th>Part Replacement Date</th>
                        <th>Part Replacement Location</th>
                       
                    </tr>
                    {this.state.maintenancedetails.map((vdetails)  =>
                        <tr>
                            <td> {vdetails.vregno}</td>
                            <td> {vdetails.partid}</td>
                            <td> {vdetails.partreplacementdate}</td>
                            <td> {vdetails.partreplacementlocation}</td>
                            


                        </tr>



                    )}
                </table>
            </div> :
                <div></div>
        )
    }
}

export default GetAllVehicle;

