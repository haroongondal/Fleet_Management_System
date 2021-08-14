import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import {NavLink} from 'react-router-dom';
// import Signout from '../SignOut/SignOut';
// import DarkModeToggle from './DarkModeToggle';



export default class Header extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="Header">

                <Navbar />
                {/*<h1 id="siteTitle"><NavLink to={'/'}><span>V</span><span>i</span><span>s</span><span>u</span><span>a</span><span>l</span> <span>Shop</span></NavLink></h1>*/}
                {/*<Signout />*/}
            </div>
        )
    }


}

