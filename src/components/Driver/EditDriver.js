import React, {Component} from "react";
import Drawer from "../Drawer/Drawer";
 
import Auth from '../Home/Auth';

export default class EditDriver extends Component {
    constructor(props) {
        super(props);
        this.state ={
            driverID: '',
            driverCNIC:'',
            driverPhoneNo: '',
            driverids: [],
            driverdetails:[]

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.EditDriverDetails = this.EditDriverDetails.bind(this);
        this.getDriverIDs = this.getDriverIDs.bind(this);
        this.getDriverDetailsByID = this.getDriverDetailsByID.bind(this);
    }

    async getDriverDetailsByID(){



        try {
            const driverdetailsResponse = await fetch("https://fmts.herokuapp.com/api/getalldrivers?driverid=" + this.state.driverID, { method: 'GET'});
            const driverdetails = await driverdetailsResponse.json();
            console.log(driverdetails)
            // return vehicledetails
            this.setState({driverdetails : driverdetails})

            //To save data into state variables

            this.setState({driverCNIC: this.state.driverdetails.map((ddetails)  => ddetails.driverCNIC)})
            this.setState({driverPhoneNo: this.state.driverdetails.map((ddetails)  => ddetails.driverPhoneNo)})

        } catch (err) {
            console.error(err);
        }



    }

    async EditDriverDetails (driverDetails){

        return await fetch("https://fmts.herokuapp.com/api/adddriver?driverID=" + this.state.driverID,{
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

        const token = this.EditDriverDetails({
            driverID: this.state.driverID,
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

    async getDriverIDs(){
        // let vregnos =[]
        try {
            const driverResponse = await fetch("http://localhost:5000/api/getdriverids?driver=yes", { method: 'GET'});
            const driverids = await driverResponse.json();
            this.setState({driverids : driverids})

        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {

        this.getDriverIDs()
    }

    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }
        return(

            localStorage.getItem("adminid") ?
                <div  class="login-wrapper">
                    <Drawer />
                     
                    <div>
                        <button value="Get Driver Details" onClick={this.getDriverDetailsByID}>Get Driver Details</button>
                    </div>
                    <br/>

                    <h1>Update Driver Details</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <p>Driver ID:</p>
                            <select class="text_input"  onChange={e => this.setState({driverID: e.target.value}) } aria-required={true} required >
                                <option value="select Driver id" >(Select Driver ID)</option>
                                {this.state.driverids.map((driverid) =>
                                    <option value={driverid.driverID} >{driverid.driverID}</option>)}

                            </select>

                        </label>

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
                            <select class="text_input" onChange={e => this.setState({status: e.target.value})}>
                                <option >Select</option>
                                <option value="Active" >Active</option>
                                <option value="Not-Active">Not-Active</option>
                                
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