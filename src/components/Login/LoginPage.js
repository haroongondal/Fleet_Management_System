import React, {Component} from "react";

export default class LoginPage extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div class="login-wrapper">
                <h2> Select Login Option </h2>
                    <ul>
                        <li>
                            <a href ="/dashboard" > Admin Login </a>
                        </li>
                        <li>
                            <a href ="/driverdashboard" > Driver Login </a>
                        </li>
                        <li>
                            <a href ="/addbooking" > Customer Login </a>
                        </li>
                    </ul>


            </div>
        )
    }

}