import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 

class AddPartsPurchase extends  Component{
    constructor(props) {
        super(props);
        this.state ={
            vendorID:'',
            vendorIDs:[],
            vendorDetails:[],
            partID:'',
            partname:'',
            partcost:'',
            purchasedate:'',
            warrantystartdate:'',
            warrantyenddate:'',
            purchasedby:''


        }
        this.getVendorDetailsByID = this.getVendorDetailsByID.bind(this);
    }

    async getVendorIDs(){

        try {
            const vendoridResponse = await fetch("https://fmts.herokuapp.com/api/getallvendorid", { method: 'GET'});
            const vendorids = await vendoridResponse.json();
            console.log(vendorids)
            this.setState({vendorIDs : vendorids})
            console.log(this.state.vendorIDs.map((vid) => vid.vendorID))

        } catch (err) {
            console.error(err);
        }

    }
    async getVendorDetailsByID(){
        // const bookingid = {bookingid: this.state.bookingid}
        // alert(bookingid.bookingid)
        // console.log(this.state.vendorID)
        try{
            const vendorresponse =  await fetch("https://fmts.herokuapp.com/api/getvendorbyid?vendorid=" + this.state.vendorID , {
                method: 'GET'})
            const vendorDetail = await vendorresponse.json()
            console.log(vendorDetail)
            // this.setState({vendorDetails: vendorDetail})
            this.setState({vendorDetails:vendorDetail})


        }
        catch (error){
            console.log(error)
        }
    }
    async savePartPurchase(partpurchaseDetails){

        return fetch('https://fmts.herokuapp.com/api/partpurchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partpurchaseDetails)
        })
            .then(data => data.json())

    }
    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()
        const min = 1
        const max = 30000
        let partid = 0
        partid= Math.ceil((min + (Math.random() * (max - min))))
        // alert(partid)

        // this.setState({partID: partid})
        // console.log(this.state.partID)

        const token = await this.savePartPurchase({

            vendorID: this.state.vendorID,
            partid:partid,
            partname:this.state.partname,
            partcost:this.state.partcost,
            purchasedate:this.state.purchasedate,
            warrantystartdate: this.state.warrantystartdate,
            warrantyenddate: this.state.warrantyenddate,
            purchasedby: this.state.purchasedby

        })

        console.log(token)
        alert("Details are saved")

    }

    componentDidMount() {
        this.getVendorIDs()
    }


    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(
            localStorage.getItem("adminid") ?
                <div class="login-wrapper">
                    <Drawer />
                     

                <h2>Parts Purchasing</h2>
                <div>
                    <button value="Get Vendor Details" onClick={this.getVendorDetailsByID}>Get Vendor Details</button>
                </div>
                <br/>
                <form onSubmit={this.handleSubmit.bind(this)}>

                    <label>
                        <p>Vendor ID</p>
                        <select class="text_input"  onChange={event => this.setState({vendorID: event.target.value})} aria-required={true} required  >
                            {/*<select class="text_input"  onChange="alert('hello');"    >*/}
                            <option value="select vendor ID" >(Select Vendor ID)</option>

                            {this.state.vendorIDs.map((vendorid) =>
                                <option value={vendorid.vendorID} >{vendorid.vendorID}</option>)}

                        </select>

                    </label>
                    <br/>

                    <lable> <p> Part Name  </p>
                        <input type="text" class="text_input" aria-required={true} required  onChange={e => this.setState({partname: e.target.value})} />
                    </lable>
                    <lable> <p> Part Cost </p>
                        <input type="text" class="text_input" aria-required={true} required  onChange={e => this.setState({partcost: e.target.value})} />
                    </lable>
                    <lable> <p> Purchase Date </p>
                        <input type="date" class="text_input" aria-required={true} required  onChange={e => this.setState({purchasedate: e.target.value})} />
                    </lable>
                    <lable> <p> Warranty Start Date </p>
                         <input type="date" class="text_input" aria-required={true} required  onChange={e => this.setState({warrantystartdate: e.target.value})} />
                    </lable>
                    <lable> <p> Warranty End Date </p>
                         <input type="date" class="text_input" aria-required={true} required  onChange={e => this.setState({warrantyenddate: e.target.value})} />
                    </lable>

                    <lable> <p> Purchased By  </p>
                        <input type="text" class="text_input" aria-required={true} required  onChange={e => this.setState({purchasedby: e.target.value})} />
                    </lable>
                    <br/>
                    <br/>
                    <div>
                        <button type="submit">Save</button>
                    </div>


                </form>
                <div>
                    <br/>

                    <br/>

                </div>

                {/*<div>*/}
                {/*    <button value="Get Vendor Details" onClick={this.getVendorDetailsByID}>Get Vendor Details</button>*/}
                {/*</div>*/}
                {/*<br/>*/}


                <div>
                    <h2>Vendor Details</h2>
                    <table>
                        <tr>

                            <th>Vendor ID </th>
                            <th>Vendor Name</th>
                            <th>Vendor Email</th>
                            <th>Vendor Phone No</th>
                            <th>Vendor Contact Person</th>

                        </tr>
                        {this.state.vendorDetails.map((vdetails)  =>
                            <tr>
                                <td> {vdetails.vendorID}</td>
                                <td> {vdetails.vendorName}</td>
                                <td> {vdetails.vendorEmail}</td>
                                <td> {vdetails.vendorPhoneNo}</td>
                                <td> {vdetails.vendorContactPerson}</td>

                            </tr>



                        )}
                    </table>

                </div>
            </div> :
                <div></div>

        )
    }
}

export default AddPartsPurchase;