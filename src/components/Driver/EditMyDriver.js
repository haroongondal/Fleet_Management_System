import React, {Component} from "react";
import Auth from '../Home/Auth';
import AppBar from "../Driver/AppBarDriver";

export default class EditDriver extends Component {
    constructor(props) {
        super(props);
        this.state ={
            driverCNIC:'',
            driverPhoneNo: '',
            driverids: [],
            driverdetails:[],
            status:''

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.EditDriverDetails = this.EditDriverDetails.bind(this);
    }

    async EditDriverDetails (driverDetails){
        let driverID=localStorage.getItem("driverid");
        console.log('driver id: '+ driverID)
        return await fetch("https://fmts.herokuapp.com/api/adddriver?driverID=" + driverID,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverDetails)
        })
            .then(data => data.json())

    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()
        console.log('status: '+this.state.status)
        const token = this.EditDriverDetails({
            driverCNIC: this.state.driverCNIC,
            driverPhoneNo: this.state.driverPhoneNo,
            status: this.state.status
        })

        console.log(token)
        if(token){
            alert("driver Details Edited Successfully!!")
        }
        else{
            alert("Something went wrong. Details are not saved.")
        }

    }

    render() {
        if(!localStorage.getItem("driverid")){
            return(<Auth/>)
        }
        return(

            localStorage.getItem("driverid") ?
                <div >
                    <AppBar />

                    <br/>

                    <h1 class="h1">Update Driver Details</h1>
                    <form onSubmit={this.handleSubmit}>

                        <label>
                            <p>Driver CNIC : </p>
                            <input class="text_input" value={this.state.driverCNIC}
                                   type="number" aria-required={true} required onChange={e => this.setState({driverCNIC: e.target.value})} />
                        </label>

                        <label>
                            <p>Driver Phone No:</p>
                            <input class="text_input" value={this.state.driverPhoneNo}
                                   type="text" aria-required={true} required onChange={e => this.setState({driverPhoneNo: e.target.value})} />
                        </label>

                        <label>
                            <p>Driver Status:</p>
                            <select class="text_input" onChange={e => this.setState({status: e.target.value})} required area-required="true">
                                <option>Select Status</option>
                                <option value="Active" >Active</option>
                                <option value="On Leave">On Leave</option>
                                
                            </select>
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