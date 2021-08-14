import React, { useState } from 'react';
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 




async function saveVehicle(vehicledetails) {
    return fetch('https://fmts.herokuapp.com/api/addvehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicledetails)
    })
        .then(data => data.json())

}

export default function AddVehicle(){

    const [vregisterno, setVehicleRegisterNo] = useState()
    const [vmake, setVehicleMake] = useState()
    const [vmodel, setVehicleModel] = useState()
    const [vchessisno, setVehicleChessisNo] = useState()
    const [vengineno, setVehicleEngineNo] = useState()
    const [vtype,setVehicleType] = useState()

    const handleSubmit = async  e => {

        e.preventDefault()
        e.target.reset();

        const token = await saveVehicle({
            vregisterno,vmake,vmodel,vchessisno,vengineno,vtype
        })

        console.log(token)
        alert("Details are saved")


    }

    if(!localStorage.getItem("adminid")){
        return(<Auth/>)
    }

    return(
         localStorage.getItem("adminid") ?
            <div  class="login-wrapper">
                <Drawer />
                 
            <h1>Vehicle Details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Vehicle Registration No:</p>
                    <input type="text" class="text_input" aria-required={true} required onChange={e => setVehicleRegisterNo(e.target.value)} />
                </label>
                <label>
                    <p>Vehicle Type:</p>
                    <select class="text_input" onChange={e => setVehicleType(e.target.value)} aria-required={true} required>
                        <option >Select Type of Vehicle</option>
                        <option value="car">Car</option>
                        <option value="vagan">Vagan</option>
                        <option value="bus">Bus</option>
                    </select>

                </label>
                <label>
                    <p>Vehicle Make</p>
                    <input type="text" class="text_input" aria-required={true} required onChange={e => setVehicleMake(e.target.value)} />
                </label>
                <label>
                    <p>Vehicle Model</p>
                    <input type="text" class="text_input" aria-required={true} required onChange={e => setVehicleModel(e.target.value)} />
                </label>
                <label>
                    <p>Vehicle Chessis No</p>
                    <input type="text" class="text_input" aria-required={true} required onChange={e => setVehicleChessisNo(e.target.value)} />
                </label>

                <label>
                    <p>Vehicle Engine No</p>
                    <input type="text" class="text_input" aria-required={true} required onChange={e => setVehicleEngineNo(e.target.value)} />
                </label>
                <div>
                    <br/>
                </div>

                <div>
                    <button type="submit">Save</button>
                </div>
            </form>

        </div> :
            <div></div>
    )
}