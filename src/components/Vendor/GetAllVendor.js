import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 


class ViewVendor extends Component{
    constructor(props) {
        super(props);
        this.state={
            vendordetails:[]
        }
    }

    async getAllVendor(){
        try {
            const vendordetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallvendors", { method: 'GET'});
            const vendordetails = await vendordetailsResponse.json();
            console.log(vendordetails)
            // return vehicledetails
            this.setState({vendordetails : vendordetails})

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getAllVendor()
    }


    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div>
                    <Drawer />
                     
                <h2>View All Vendor</h2>
                <table>
                    <tr>
                        <th>Vendor ID </th>
                        <th>Vendor Name</th>
                        <th>Vendor Email</th>
                        <th>Vendor Phone No</th>
                        <th>Vendor Contact Person</th>


                    </tr>
                    {this.state.vendordetails.map((vdetails)  =>
                        <tr>
                            <td> {vdetails.vendorID}</td>
                            <td> {vdetails.vendorName}</td>
                            <td> {vdetails.vendorEmail}</td>
                            <td> {vdetails.vendorPhoneNo}</td>
                            <td> {vdetails.vendorContactPerson}</td>

                        </tr>



                    )}
                </table>

            </div> :
                <div></div>
        )
    }
}

export default ViewVendor;