import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css';

import AppBarLoginPage from "../Home/AppBarHome";

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            loginError: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginUser = this.loginUser.bind(this)

    }

    async loginUser(credentials){
        return fetch('https://fmts.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    async handleSubmit(event){

        event.preventDefault();

        const tokenreturn = await this.loginUser({
            username:this.state.username,
            password:this.state.password
        });

        console.log(tokenreturn)
        this.props.handleSuccessfulAuth(tokenreturn)

    }

    render() {
        return(
            <div className="login-wrapper">
                <AppBarLoginPage />
                <h1>Please Log In {this.state.loginError}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" class="text_input" onChange={e => this.setState({username: e.target.value})} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" class="text_input" onChange={e => this.setState({password: e.target.value})} />
                    </label>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>

            </div>
        )
    }


}

