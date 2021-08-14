import React, { useState } from 'react';




async function saveCustomer(customerdetails) {
    return fetch('https://fmts.herokuapp.com/api/addcustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerdetails)
    })
        .then(data => data.json())
}

export default function AddCustomer(){

    // let [customerID, setCustomerID] = useState()
    let customerID=0
    const [customerfname, setFirstName] = useState()
    const [customerlname, setLastName] = useState()
    const [customertype, setCustomerType] = useState()
    const [customeraddress, setCustomerAddress] = useState()
    const [customernoofpoints, setCustomerNoOfPoints] = useState()
    const [customerphoneno, setCustomerPhoneNo] = useState()
    const min = 1;
    const max = 20000;

    const handleSubmit = async  e => {

        e.preventDefault()
        e.target.reset();
        //Random CustomerID
        customerID = Math.ceil((min + (Math.random() * (max - min))))
        console.log(customerID)
        const token = await saveCustomer({
            customerID,customerfname,customerlname,customertype,customeraddress,customernoofpoints,customerphoneno
        })

        console.log(token)


    }

    return(
        <div className="login-wrapper">
            <h1>Customer Details</h1>
            <form onSubmit={handleSubmit}>
                {/*<label>*/}
                {/*    <p>Customer ID:</p>*/}
                {/*    /!*<input type="text" class="text_input" onChange={e => setCustomerID(e.target.value)} />*!/*/}
                {/*    <input type="text" class="text_input" value={Math.ceil((min + (Math.random() * (max - min))))}  onChange={e => setCustomerID(e.target.value)} />*/}
                {/*</label>*/}
                <label>
                    <p>First Name</p>
                    <input type="text" class="text_input" onChange={e => setFirstName(e.target.value)} />
                </label>
                <label>
                    <p>LastName</p>
                    <input type="text" class="text_input" onChange={e => setLastName(e.target.value)} />
                </label>
                <label>
                    <p>Customer Type</p>
                    <input type="text" class="text_input" onChange={e => setCustomerType(e.target.value)} />
                </label>

                <label>
                    <p>No of Points : </p>
                    <input type="text" class="text_input" onChange={e => setCustomerNoOfPoints(e.target.value)} />
                </label>

                <label>
                    <p>Phone No:</p>
                    <input type="text" class="text_input" onChange={e => setCustomerPhoneNo(e.target.value)} />
                </label>

                <label>
                    <p>Address : </p>
                    <input type="text" class="text_input" onChange={e => setCustomerAddress(e.target.value)} />
                </label>


                <div>
                    <br/>
                </div>

                <div>
                    <button type="submit">Save</button>
                </div>
            </form>

        </div>
    )
}