import React, {Component} from "react";
import Drawer from "../Drawer/Drawer";
 
import Auth from '../Home/Auth';

export default class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            customerID: '',
            customerFirstName: '',
            customerLastName: '',
            customerNoOfPoints:'',
            customerAddress: '',
            customerPhoneNo: '',
            customerids: [],
            customerdetails:[]

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.EditCustomerDetails = this.EditCustomerDetails.bind(this);
        this.getCustomerIDs = this.getCustomerIDs.bind(this);
        this.getCustomerDetailsByID = this.getCustomerDetailsByID.bind(this);
    }

    async getCustomerDetailsByID(){

        try{
            const customersresponse =  await fetch("https://fmts.herokuapp.com/api/getcustomerbyid?customerID=" + this.state.customerID, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({customerID: this.state.customerID})
                // body: bookingid
            })
            const customerdetails = await customersresponse.json()
            // console.log(bookingdetails)
            this.setState({customerdetails: customerdetails})

            //To save data into state variables

            this.setState({customerFirstName: this.state.customerdetails.map((cdetails)  => cdetails.userfirstname)})
            this.setState({customerLastName: this.state.customerdetails.map((cdetails)  => cdetails.userlastname)})
            this.setState({customerNoOfPoints: this.state.customerdetails.map((cdetails)  => cdetails.usernoofpoints)})
            this.setState({customerAddress: this.state.customerdetails.map((cdetails)  => cdetails.useraddress)})
            this.setState({customerPhoneNo: this.state.customerdetails.map((cdetails)  => cdetails.userphoneno)})

        }
        catch (error){
            console.log(error)
        }



    }

    async EditCustomerDetails (customerDetails){

        return await fetch("https://fmts.herokuapp.com/api/register?customerID=" + this.state.customerID,{
            method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerDetails)
        })
            .then(data => data.json())





    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()

        const token = this.EditCustomerDetails({
            customerID: this.state.customerID,
            customerFirstName: this.state.customerFirstName,
            customerLastName: this.state.customerLastName,
            customerNoOfPoints: this.state.customerNoOfPoints,
            customerAddress: this.state.customerAddress,
            customerPhoneNo: this.state.customerPhoneNo
        })

        console.log(token)
        if(token){
            alert("Customer Details Edited Successfully!!")
        }
        else{
            alert("Something went wrong. Details are not saved.")
        }



    }

    async getCustomerIDs(){
        // let vregnos =[]
        try {
            const customerResponse = await fetch("https://fmts.herokuapp.com/api/getcustomerids", { method: 'GET'});
            const customerids = await customerResponse.json();
            this.setState({customerids : customerids})

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {

        this.getCustomerIDs()
    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(

            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                    <div>
                        <button value="Get Customer Details" onClick={this.getCustomerDetailsByID}>Get Customer Details</button>
                    </div>
                    <br/>

                <h1>Update Customer Details</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Customer ID:</p>
                        <select class="text_input"  onChange={e => this.setState({customerID: e.target.value}) } aria-required={true} required >
                            <option value="select Customer id" >(Select Driver ID)</option>
                            {this.state.customerids.map((customerid) =>
                                <option value={customerid.customerID} >{customerid.customerID}</option>)}

                        </select>

                    </label>
                    <label>
                        <p>First Name</p>
                        <input value={this.state.customerFirstName}
                               type="text" aria-required={true}
                               required onChange={e => this.setState({customerFirstName: e.target.value})} />
                    </label>
                    <label>
                        <p>LastName</p>
                        <input value={this.state.customerLastName}
                            type="text" aria-required={true} required onChange={e => this.setState({customerLastName: e.target.value})} />
                    </label>


                    <label>
                        <p>No of Points : </p>
                        <input value={this.state.customerNoOfPoints}
                            type="number" aria-required={true} required onChange={e => this.setState({customerNoOfPoints: e.target.value})} />
                    </label>

                    <label>
                        <p>Phone No:</p>
                        <input value={this.state.customerPhoneNo}
                            type="text" aria-required={true} required onChange={e => this.setState({customerPhoneNo: e.target.value})} />
                    </label>

                    <label>
                        <p>Address : </p>
                        <input value={this.state.customerAddress}
                            type="text" aria-required={true} required onChange={e => this.setState({customerAddress: e.target.value})} />
                    </label>


                    <div>
                        <br/>
                    </div>

                    <div>
                        <button type="submit">Update</button>
                    </div>
                </form>



                </div>:
                    <div>

                    </div>
        )
    }

}