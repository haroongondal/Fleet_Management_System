import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 


class AddVendor extends Component{
    constructor(props) {
        super(props);
        this.state ={
            vendorID : '',
            vendorName: '',
            vendorEmail:'',
            vendorPhoneNo: '',
            vendorContactPerson:'',
            min: 1,
            max: 20000
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async saveVendorDetails(vendorDetails){
        const vendorDetailsResponse = await fetch("https://fmts.herokuapp.com/api/addvendor",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(vendorDetails)
            })
            .then(data => data.json())

    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()

        this.state.vendorID = Math.ceil((this.state.min + (Math.random() * (this.state.max - this.state.min))))

        const data = await  this.saveVendorDetails(
            {vendorID: this.state.vendorID,
                vendorName: this.state.vendorName,
                vendorEmail: this.state.vendorEmail,
                vendorPhoneNo:this.state.vendorPhoneNo,
                vendorContactPerson: this.state.vendorContactPerson}

        )
        console.log(data)
        alert("Details are saved")

    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     
                <br></br>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                <h2> Add Vendor Details</h2>
                    <label>
                        <p> Vendor Name</p>
                    <input type='text' class="text_input" class="text_input" aria-required={true} required onChange={e => this.setState({vendorName: e.target.value})} ></input>
                    </label>
                    <label> <p>Vendor Email</p>
                    <input type='email' class="text_input" aria-required={true} required onChange={e => this.setState({vendorEmail: e.target.value})}></input>
                    </label>
                    <label>
                        <p>Vendor Phone No</p>
                    <input type='tel' class="text_input" minLength="11" maxLength="14" aria-required={true} required onChange={e => this.setState({vendorPhoneNo: e.target.value})}></input>
                    </label>
                    <label>
                        <p>Vendor Contact Person</p>
                    <input type='text' class="text_input" aria-required={true} required onChange={e => this.setState({vendorContactPerson: e.target.value})}></input>
                    </label>
                <br/>
                    <br/>
                    <label>
                        <button type="submit" value="Submit">Save</button>
                    </label>




                </form>



            </div> :
                <div></div>
        )
    }
}

export default AddVendor;