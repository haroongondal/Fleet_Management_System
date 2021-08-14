import React, { useState } from 'react';
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer"; 
 





async function saveDriver(driverdetails) {
    return fetch('https://fmts.herokuapp.com/api/adddriver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(driverdetails)
    })
        .then(data => data.json())
}

export default function AddDriver(){

    // const [driverID, setDriverID] = useState()
    let driverID=0
    const [driverfname, setFirstName] = useState()
    const [driverlname, setLastName] = useState()
    const [drivercnic, setDriverCNIC] = useState()
    const [driverphoneno, setDriverPhoneNo] = useState()
    const min = 1;
    const max = 20000;

    const handleSubmit = async  e => {

        e.preventDefault()
        e.target.reset();
        //Random DriverID
        driverID = Math.ceil((min + (Math.random() * (max - min))))

        const token = await saveDriver({
            driverID,driverfname,driverlname,drivercnic,driverphoneno
        })

        console.log(token)
        alert("Details are saved")


    }

    if(!localStorage.getItem("adminid")){
        return(<Auth/>)
    }
    // if(localStorage.getItem("adminid")){
    //     <Drawer />
    // }

    return(

         localStorage.getItem("adminid") ?
            <div  class="login-wrapper">
                <Drawer />
                 
                <h1>Driver Details</h1>
                <form onSubmit={handleSubmit}>

                    <label>
                        <p>First Name</p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => setFirstName(e.target.value)} />
                    </label>
                    <label>
                        <p>LastName</p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => setLastName(e.target.value)} />
                    </label>
                    <label>
                        <p>Driver CNIC</p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => setDriverCNIC(e.target.value)} />
                    </label>

                    <label>
                        <p>Phone No:</p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => setDriverPhoneNo(e.target.value)} />
                    </label>
                    <div>
                        <br/>
                    </div>

                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>

            </div> : //Else condition



            (<div> Admin not logged in</div>)




    )
}