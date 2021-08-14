import React, {Component} from "react";
import Drawer from "../Drawer/Drawer";
 

export default class GetAllCustomer extends Component{
    constructor(props) {
        super(props);

        this.state={
            customerdetails:[]
        }
        this.getAllCustomer = this.getAllCustomer.bind(this);

    }

    async getAllCustomer(){
        try {
            const customerdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getallcustomers", { method: 'GET'});
            const customerdetails = await customerdetailsResponse.json();
            console.log(customerdetails)
            // return vehicledetails
            // this.setState({customerdetails : customerdetails})
            customerdetails.map((value=>{
                if(!(value['username'].includes('driver')) && !(value['username'].includes('admin'))){
                    this.setState({customerdetails:this.state.customerdetails.concat(value)})
                }
            }))

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getAllCustomer()
    }

    render() {
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <h2>View All Users</h2>
                <table>
                    <tr>
                        <th>Customer ID </th>
                        <th>Customer Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone No</th>

                    </tr>
                    {this.state.customerdetails.map((cdetails)  =>
                        <tr>
                            <td> {cdetails.customerID}</td>
                            <td> {cdetails.username}</td>
                            <td> {cdetails.userfirstname}</td>
                            <td> {cdetails.userlastname}</td>
                            <td> {cdetails.useraddress}</td>
                            <td> {cdetails.userphoneno}</td>




                        </tr>



                    )}
                </table>

            </div> :
                <div> </div>

        )
    }


}