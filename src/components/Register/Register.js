import React, {Component,PropTypes} from 'react';
// import PropTypes from 'prop-types';
import '../Login/Login.css';
import AppBarLoginPage from "../Home/AppBarHome";


export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {

            username:'',
            password:'',
            customerfname:'',
            customerlname:'',
            customeraddress:'',
            customernoofpoints:'',
            customerphoneno:'',
            userRegisterationError: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this);

    }

    async registerUser(credentials) {
        return fetch('https://fmts.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    async registerDriver(driverdetails){
        return fetch('https://fmts.herokuapp.com/api/adddriver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverdetails)
        })
            .then(data => data.json())
    }


    async handleSubmit(event) {
        event.preventDefault()
    let customerID=0
    const min = 1;
    const max = 20000;

    customerID = Math.ceil((min + (Math.random() * (max - min))))

    // setCustomerID(Math.ceil((min + (Math.random() * (max - min)))))
    console.log(customerID)

        if(this.state.username.includes("driver")){
            const token = await this.registerDriver({
                driverID: customerID,
                driverfname: this.state.customerfname,
                driverlname : this.state.customerlname,
                driverphoneno: this.state.customerphoneno
            })
            console.log(token)
        }
        // else{
            const token = await this.registerUser({
                customerID: customerID,
                username: this.state.username,
                password: this.state.password,
                customerfname: this.state.customerfname,
                customerlname : this.state.customerlname,
                customeraddress: this.state.customeraddress,
                customernoofpoints: this.state.customernoofpoints,
                customerphoneno: this.state.customerphoneno
            });
            console.log(token)
            if(token){
                console.log(token)
                alert("User Details Saved Successfully!")

                this.props.handleSuccessfulAuth(token)

            }
            else{
                this.setState({userRegisterationError: "User could not register"})
            }
        

}

    render() {

        return (
            <div class="login-wrapper">
                <AppBarLoginPage />
                <h1>Please Register {this.state.userRegisterationError}</h1>
                <form onSubmit={this.handleSubmit} method="post">
                    <label>
                        <p>Username</p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => this.setState({username: e.target.value})} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" class="text_input" class="text_input" aria-required={true} required onChange={e => this.setState({password: e.target.value})} />
                    </label>

                    <label>
                        <p>First Name</p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => this.setState({customerfname: e.target.value})} />
                    </label>
                    <label>
                        <p>LastName</p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => this.setState({customerlname: e.target.value})} />
                    </label>
                    <label>
                        <p>Phone No:</p>
                        <input type='tel' class="text_input" minLength="11" maxLength="14" aria-required={true} required onChange={e => this.setState({customerphoneno: e.target.value})} />
                    </label>

                    <label>
                        <p>Address : </p>
                        <input type="text" class="text_input" aria-required={true} required onChange={e => this.setState({customeraddress: e.target.value})} />
                    </label>

                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>

        )
    }


}

